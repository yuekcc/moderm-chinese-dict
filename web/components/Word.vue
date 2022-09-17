<script setup>
import { ActionSheet, Button } from 'vant';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { speak, enableSpeak } from '../api';

const props = defineProps({
  word: {
    type: Object,
    required: true,
  },
});

const actions = [
  { name: '组词', value: 'show_phrases', disabled: props.word.entry.length > 1 },
  { name: '朗读', value: 'speak', disabled: !enableSpeak(), subname: !enableSpeak() ? '当前浏览器不支持' : '' },
];
const router = useRouter();
const canShowActions = ref(false);
const wordDetailsRef = ref(null);

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

function handleChildrenClick(e) {
  console.log(handleChildrenClick, e.target);

  // 点击了类似 〖东汉〗 的元素
  if (e.target.tagName === 'SPAN' && e.target.classList.contains('smb')) {
    const word = e.target.textContent.trim().replace(/^〖/g, '').replace(/〗$/g, '');
    if (word) {
      router.push({
        name: 'home',
        query: {
          word,
        },
      });
    }
  }
}

onMounted(() => {
  wordDetailsRef.value?.addEventListener('click', handleChildrenClick);
});
onBeforeUnmount(() => {
  wordDetailsRef.value?.removeEventListener('click', handleChildrenClick);
});
</script>

<template>
  <div class="word-block">
    <div :data-set-entry="word.entry" v-html="word.paraphrase" ref="wordDetailsRef"></div>
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

  .smb {
    cursor: pointer;

    &:hover {
      background-color: var(--green);
      color: var(--white);
    }
  }
}

.actions {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
