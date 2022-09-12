<script setup>
import { ActionSheet, Button } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  word: {
    type: Object,
    required: true,
  },
});

const actions = ref([{ name: '组词', value: 'get_all_words_with_this_entry' }]);
const canShowActions = ref(false);
const router = useRouter();

function doAction(key) {
  if (key.value === 'get_all_words_with_this_entry') {
    router.push({
      name: 'home',
      query: {
        word: props.word.entry,
        loadPhrases: true,
      },
    });
  }
}
</script>

<template>
  <div class="word-block">
    <div :data-set-entry="word.entry" v-html="word.paraphrase"></div>
    <ActionSheet
      v-model:show="canShowActions"
      :actions="actions"
      @select="doAction($event)"
      cancel-text="关闭"
      close-on-click-action
    ></ActionSheet>
    <div v-if="word.entry.length === 1" class="actions">
      <Button icon="ellipsis" text size="mini" @click="canShowActions = true" />
    </div>
  </div>
</template>

<style lang="less">
.word-block {
  position: relative;
}

.actions {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
