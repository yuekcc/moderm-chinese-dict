import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vuePlugin()],
  server: {
    proxy: {
      '/api/search': {
        target: 'http://localhost:10086',
      },
      '/api': {
        target: `http://127.0.0.1:8090`,
      },
    },
  },
});
