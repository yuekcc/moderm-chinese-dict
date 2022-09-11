<script>
import { ActionSheet, Button } from 'vant';

export default {
  components: {
    ActionSheet,
    Button,
  },
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actions: [{ name: '组词', value: 'get_all_words_with_this_entry' }],
      canShowActions: false,
    };
  },
  methods: {
    doAction(key) {
      console.log(key);

      if (key.value === 'get_all_words_with_this_entry') {
        this.$router.push({
          name: 'home',
          query: {
            word: this.word.entry,
            withins: true,
          },
        });
      }
    },
  },
};
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
