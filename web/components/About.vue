<script setup>
import { showDialog } from 'vant';
let showMessage = () => {
  showDialog({
    message: '仅用于学习研究，禁止商用。请支持《现代汉词典》纸质版或官方 APP',
  });
};
</script>

<template>
  <footer class="center about">
    <a href="javascript:" @click="showMessage">使用说明</a>
  </footer>
</template>

<style lang="less">
.about {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 5px;
  font-size: 12px;
}
</style>
