import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { setupRouter as _setup } from '@packages/router';

import { routes } from './routes';
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export const setupRouter = (app: App) => {
  const setup = _setup(router, 'admin');
  setup(app);
};
