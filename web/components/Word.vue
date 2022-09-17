<script setup>
import { ActionSheet, Button } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { speak, enableSpeak } from './api';

const props = defineProps({
  word: {
    type: Object,
    required: true,
  },
});

const actions = [
  { name: '组词', value: 'show_phrases', disabled: props.word.entry.length > 1 },
  { name: '朗读', value: 'speak', disabled: !enableSpeak() },
];
const canShowActions = ref(false);
const router = useRouter();

function doAction(key) {
  if (key.value === 'speak') {
    speak(props.word.entry);
  }

  if (key.value === 'show_phrases') {
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
    <div class="actions">
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
