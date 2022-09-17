import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/public/',
  plugins: [vuePlugin()],
  build: {
    manifest: false,
  },
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:10088`,
      },
    },
  },
});
