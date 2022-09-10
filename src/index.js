import { createApp, h } from 'vue';
import { createRouter, createWebHashHistory, RouterView } from 'vue-router';
import App from './app.vue';

import './styles.less';

const routes = [{ name: 'home', path: '/', component: App }];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const Root = {
  render() {
    return h(RouterView);
  },
};

createApp(Root).use(router).mount('#app');
