use futures::TryStreamExt;
use jieba_rs::Jieba;
use once_cell::sync::Lazy;
use poem::IntoResponse;
use serde::{Deserialize, Serialize};
use sqlx::sqlite::SqlitePool;
use tokio::sync::OnceCell;

static JIEBA: Lazy<Jieba> = Lazy::new(Jieba::new);

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, sqlx::FromRow)]
pub struct Entry {
    pub entry: String,
    pub paraphrase: String,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, sqlx::FromRow)]
pub struct PhraseIndex {
    pub entry: String,
    pub targets: String,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct EntryList(Vec<Entry>);

impl EntryList {
    pub fn new(list: Vec<Entry>) -> Self {
        Self(list)
    }
}

impl IntoResponse for EntryList {
    fn into_response(self) -> poem::Response {
        let doc = serde_json::to_string(&self).unwrap();
        doc.into_response()
    }
}

pub fn cut_words(sentence: &str) -> Vec<&str> {
    JIEBA.cut_all(sentence)
}

pub struct DbLayer {
    pool: SqlitePool,
}

impl DbLayer {
    pub async fn new() -> Self {
        let pool = SqlitePool::connect(&std::env::var("DATABASE_URL").unwrap())
            .await
            .unwrap();

        Self { pool }
    }

    pub async fn query_phrases(&self, hanzi: &str) -> Vec<Entry> {
        let mut conn = self.pool.acquire().await.unwrap();
        let sql = "select entry, targets from phrase_index where entry = ?";
        let row = sqlx::query_as::<_, PhraseIndex>(sql)
            .bind(hanzi)
            .fetch_one(&mut conn)
            .await
            .unwrap();

        let targets: Vec<&str> = row.targets.split(',').collect();
        self.query_words(targets).await
    }

    pub async fn query_words(&self, keywords: Vec<&str>) -> Vec<Entry> {
        let placeholders: Vec<&str> = keywords.iter().map(|_| "?").collect();
        let placeholder_str = placeholders.join(",");

        let sql = format!("select entry, paraphrase from mdx where entry in ({placeholder_str})");
        let mut query = sqlx::query_as::<_, Entry>(&sql);

        for keyword in keywords.iter() {
            query = query.bind(keyword);
        }

        let mut conn = self.pool.acquire().await.unwrap();
        let mut rows = query.fetch(&mut conn);

        let mut result = vec![];
        while let Some(row) = rows.try_next().await.unwrap() {
            result.push(row);
        }

        result
    }
}

static DB: OnceCell<DbLayer> = OnceCell::const_new();

pub async fn database_service() -> &'static DbLayer {
    DB.get_or_init(DbLayer::new).await
}

#[cfg(test)]
mod tests {
    use super::*;
    use dotenvy::dotenv;

    #[test]
    fn test_cut_words() {
        let words = cut_words("我写的是中文");
        println!("{:?}", words);
    }

    #[tokio::test]
    async fn test_query_phrases() {
        dotenv().ok();

        let result = database_service().await.query_phrases("中").await;
        for word in result {
            println!("{:?}", word.entry);
        }
    }

    #[tokio::test]
    async fn test_query_words() {
        dotenv().ok();

        let result = database_service().await.query_words(vec!["中", "文"]).await;
        for word in result {
            println!("{:?}", word.entry);
        }
    }
}
