import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/svg',
    name: 'SVG',
    component: () => import(/* webpackChunkName: "svg" */ '../views/SVG.vue'),
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: () =>
      import(/* webpackChunkName: "canvas" */ '../views/Canvas.vue'),
  },
  {
    path: '/3d',
    name: 'Three',
    component: () =>
      import(/* webpackChunkName: "three" */ '../views/Three.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
