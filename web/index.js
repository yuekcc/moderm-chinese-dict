import { createApp, h } from 'vue';
import { createRouter, createWebHashHistory, RouterView } from 'vue-router';
import { Toast, Dialog } from 'vant';

import App from './components/App.vue';
import About from './components/About.vue';

import 'vant/lib/index.css';
import './styles.less';

const routes = [{ name: 'home', path: '/', component: App }];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const Root = {
  render() {
    return [h(RouterView), h(About)];
  },
};

createApp(Root).use(Toast).use(Dialog).use(router).mount('#app');
