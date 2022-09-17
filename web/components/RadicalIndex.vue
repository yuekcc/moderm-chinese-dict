<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

function loadRadicalDatabase() {
  return fetch('/public/assets/radicals.json').then(res => res.json());
}

const radicalDatabase = ref({});
const radicalBihuaList = computed(() => {
  return radicalDatabase.value.radicalBihuaList;
});
const selectedRadicals = ref([]);
const hanziList = ref([]);

onMounted(async () => {
  radicalDatabase.value = await loadRadicalDatabase();
});

function selectRadicals(bihua) {
  selectedRadicals.value = radicalDatabase.value.radicalsGroupedByBihua[bihua];
  hanziList.value = [];
}

function selectRadical(name) {
  hanziList.value = radicalDatabase.value.hanzisGroupedByRadical[name];
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
</script>
<template>
  <div style="padding: 20px">
    <h3>部首笔划：</h3>
    <div class="option-grid mb-20">
      <div v-for="bihua in radicalBihuaList" class="option-item" @click="selectRadicals(bihua)">
        <span>{{ bihua === 0 ? '*' : bihua }}</span>
      </div>
    </div>

    <div v-if="selectedRadicals.length > 0">
      <h3>选择部首：</h3>
      <div class="option-grid mb-20">
        <div v-for="radical in selectedRadicals" class="option-item" @click="selectRadical(radical)">
          <span>{{ radical }}</span>
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
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      background-color: var(--green);
      color: var(--white);
    }
  }
}
</style>
