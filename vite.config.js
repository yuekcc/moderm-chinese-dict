import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vuePlugin()],
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:3000`,
      },
    },
  },
});
