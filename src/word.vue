<script>
import { NPopselect, NButton, NIcon } from 'naive-ui';
import { OverflowMenuVertical } from '@vicons/carbon';

export default {
  components: {
    NPopselect,
    NButton,
    NIcon,
    OverflowMenuVertical,
  },
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actions: [{ label: '组词', value: 'get_all_words_with_this_entry' }],
    };
  },
  methods: {
    doAction(key) {
      console.log(key);

      if (key === 'get_all_words_with_this_entry') {
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
    <div class="actions">
      <n-popselect :options="actions" @update:value="doAction($event)">
        <n-button text>
          <template #icon>
            <n-icon>
              <OverflowMenuVertical />
            </n-icon>
          </template>
        </n-button>
      </n-popselect>
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
