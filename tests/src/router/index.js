import { createRouter, createWebHistory } from 'vue-router';
import TestSelection from '../components/TestSelection.vue';
import TimeTest from '../components/TimeTest.vue';
import StroopTest from '../components/StroopTest.vue';
import MemoryTest from '../components/MemoryTest.vue';

const routes = [
  {
    path: '/',
    name: 'TestSelection',
    component: TestSelection,
  },
  {
    path: '/time-test',
    name: 'TimeTest',
    component: TimeTest,
  },
  {
    path: '/stroop-test',
    name: 'StroopTest',
    component: StroopTest,
  },
  {
    path: '/memory-test',
    name: 'MemoryTest',
    component: MemoryTest,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
