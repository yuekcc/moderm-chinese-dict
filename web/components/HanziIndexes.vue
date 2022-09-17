<script setup>
import { Tabs, Tab, NavBar } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RadicalIndexVue from './RadicalIndex.vue';
import PinyinIndexVue from './PinyinIndex.vue';

const currentTab = ref('radical');
const router = useRouter();
function onClickLeft() {
  history.back();
}
</script>

<template>
  <NavBar title="查字" left-text="返回" left-arrow @click-left="onClickLeft"></NavBar>
  <Tabs v-bind:active="currentTab">
    <Tab title="部首" name="radical">
      <RadicalIndexVue></RadicalIndexVue>
    </Tab>
    <Tab title="拼音" name="pinyin">
      <PinyinIndexVue></PinyinIndexVue>
    </Tab>
  </Tabs>
</template>
