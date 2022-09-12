mod service;

use dotenvy::dotenv;
use poem::{
    get, handler,
    listener::TcpListener,
    web::{Path, Query},
    Route, Server,
};
use serde::Deserialize;
use service::{cut_words, database_service, EntryList};

#[derive(Debug, Deserialize)]
struct InferSentenceQuery {
    pub sentence: String,
}

#[handler]
async fn infer_sentence(Query(query): Query<InferSentenceQuery>) -> EntryList {
    let words = cut_words(&query.sentence);
    let list = database_service().await.query_words(words).await;

    EntryList::new(list)
}

#[handler]
async fn list_words(Path(hanzi): Path<String>) -> EntryList {
    let list = database_service().await.query_phrases(&hanzi).await;

    EntryList::new(list)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

    let app = Route::new()
        .at("/api/infer", get(infer_sentence))
        .at("/api/hanzi/:entry/words", get(list_words));

    Server::new(TcpListener::bind("127.0.0.1:3000"))
        .run(app)
        .await
}
