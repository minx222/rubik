import type { AppRouteRaw } from '@packages/router';

const routes: Array<AppRouteRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/RubikView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutView.vue'),
    meta: {
      title: '关于'
    }
  }
];

export { routes };
