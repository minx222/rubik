import { createApp } from 'vue';

import { setupStore } from '@packages/stores';

import '@/assets/styles/app.scss';
import '@/assets/styles/tailwindcss.scss';

import App from './App.vue';
import { setupRouter } from './router';

const app = createApp(App);

const setup = () => {
  setupRouter(app);
  setupStore(app);
  app.mount('#app');
};
setup();
