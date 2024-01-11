import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
