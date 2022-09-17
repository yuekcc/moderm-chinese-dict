<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

function loadPinyinDatabase() {
  return fetch(`/public/assets/pinyin.json`).then(res => res.json());
}

const database = ref({});
const pinyinLeaderList = computed(() => {
  return Array.from(new Set(Object.keys(database.value).map(it => it.slice(0, 1))));
});
const pinyinList = ref([]);
const hanziList = ref([]);

function selectedPinyinLeader(leader) {
  pinyinList.value = Object.keys(database.value).filter(it => it.startsWith(leader));
  hanziList.value = [];
}

function selectPinyin(pinyin) {
  hanziList.value = database.value[pinyin];
}

const router = useRouter();
function lookupHanzi(hanzi) {
  router.push({
    name: 'home',
    query: {
      word: hanzi,
    },
  });
}

onMounted(async () => {
  database.value = await loadPinyinDatabase();
});
</script>

<template>
  <div style="padding: 20px">
    <h3>选择拼音开头字母：</h3>
    <div class="option-grid mb-20">
      <div v-for="leader in pinyinLeaderList" class="option-item" @click="selectedPinyinLeader(leader)">
        <span>{{ leader }}</span>
      </div>
    </div>

    <div v-if="pinyinList.length > 0">
      <h3>选择拼音：</h3>
      <div class="option-grid mb-20">
        <div v-for="pinyin in pinyinList" class="option-item" @click="selectPinyin(pinyin)">
          <span>{{ pinyin }}</span>
        </div>
      </div>
    </div>

    <div v-if="hanziList.length > 0">
      <h3>选择汉字：</h3>
      <div class="option-grid mb-20">
        <div v-for="hanzi in hanziList" class="option-item" @click="lookupHanzi(hanzi)">
          <span>{{ hanzi }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.option-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  .option-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: var(--green);
      color: var(--white);
    }
  }
}
</style>
