<script>
import { NInputGroup, NInput, NButton, NBackTop } from 'naive-ui';
import Word from './word.vue';
import { lookupWords } from './api';

export default {
  components: {
    NInputGroup,
    NInput,
    NButton,
    NBackTop,
    Word,
  },
  data() {
    return {
      keyword: null,
      withins: false,
      searchResult: [],
    };
  },
  watch: {
    '$route.query': {
      handler(newVal) {
        console.log('update $route.query', newVal);

        const word = newVal?.word || '';
        this.withins = newVal?.withins || '';
        if (word === '') {
          this.keyword = '';
          this.searchResult = [];
          return;
        }
        this.keyword = word;
        this.search();
      },
      immediate: true,
    },
  },
  methods: {
    initSearch() {
      this.$router.push({
        name: 'home',
        query: {
          word: this.keyword,
        },
      });

      // this.search();
    },
    resetSearch() {
      this.searchResult = [];
      this.$router.push({
        name: 'home',
        query: {
          word: '',
        },
      });
    },
    async search() {
      const results = await lookupWords(this.keyword, this.withins);
      const filtered = results.flat(Infinity).map(it => {
        // TODO: 后台优化数据
        it.paraphrase = it.paraphrase.replace(`<link rel="stylesheet" type="text/css" href="现代汉语词典.css">`, '');
        return it;
      });

      this.searchResult = Object.values(filtered);
    },
  },
};
</script>

<template>
  <h1 class="mb-20 center" :class="{ 'mt-100': searchResult.length === 0 }">
    现代汉语词典<sub class="prefix">自用版</sub>
  </h1>
  <div class="center mb-20">
    <n-input-group class="fill max-55">
      <n-input
        v-model:value="keyword"
        placeholder="输入汉字/词组/成语/句子"
        @keyup.enter="initSearch"
        @clear="resetSearch"
        clearable
      ></n-input>
      <n-button @click="initSearch">搜索</n-button>
    </n-input-group>
  </div>
  <div class="center mb-20">
    <a href="javascript:">按拼音/部首/笔划查字</a>
  </div>
  <div v-for="word in searchResult" :key="word.id" class="word-block-container">
    <Word :word="word"></Word>
  </div>
  <n-back-top :right="50" />
</template>
