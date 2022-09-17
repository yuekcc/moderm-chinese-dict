<script setup>
import { Search, showToast } from 'vant';
import Word from './Word.vue';
import { walkSentence, lookupWords } from './api';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';

const keyword = ref('');
const loadPhrases = ref(false);
const searchResult = ref([]);

const router = useRouter();

async function search() {
  const load = loadPhrases.value ? lookupWords : walkSentence;

  const results = await load(keyword.value);
  const filtered = results.flat(Infinity).map(it => {
    // TODO: 后台优化数据
    it.paraphrase = it.paraphrase.replace(`<link rel="stylesheet" type="text/css" href="现代汉语词典.css">`, '');
    return it;
  });

  searchResult.value = filtered;
}

function initSearch() {
  router.push({
    name: 'home',
    query: {
      word: keyword.value,
    },
  });
}

function resetSearch() {
  router.push({
    name: 'home',
    query: {
      word: '',
    },
  });
}

function gotoHanziIndex() {
  showToast('还在开发呢');
}

watch(
  () => router.currentRoute.value.query,
  val => {
    const _word = val?.word || '';
    const _loadPhrases = val?.loadPhrases || false;

    if (_word === '') {
      keyword.value = '';
      loadPhrases.value = false;
      searchResult.value = [];
      return;
    }

    keyword.value = _word;
    loadPhrases.value = _loadPhrases;
    search();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <h1 class="mb-40 center" :class="{ 'mt-100': searchResult.length === 0 }">
    汉语词典
  </h1>
  <div class="center mb-20" style="background: #4fc08d; margin-left: -20px; margin-right: -20px">
    <Search
      v-model="keyword"
      :clearable="true"
      @clear="resetSearch"
      @cancel="resetSearch"
      @search="initSearch"
      action-text="清空"
      background="#4fc08d"
      clear-trigger="always"
      placeholder="输入汉字/词组/成语/句子"
      shape="round"
    />
  </div>
  <div class="center mb-20">
    <a href="javascript:" @click="gotoHanziIndex">按拼音/部首/笔划查字</a>
  </div>
  <div v-for="word in searchResult" :key="word.id" class="word-block-container">
    <Word :word="word"></Word>
  </div>
  <!-- <n-back-top :right="50" /> -->
</template>
