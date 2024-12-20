import { createRouter, createWebHistory } from 'vue-router';
import TestSelection from '../components/TestSelection.vue';
import TimeTest from '../components/TimeTest.vue';
import StroopTest from '../components/StroopTest.vue';
import MemoryTest from '../components/MemoryTest.vue';
import ReactionTest from '../components/ReactionTest.vue';
import StroopTest2 from '../components/StroopTest2.vue';
import VigilanceTest from '../components/VigilanceTest.vue';

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
  {
    path: '/reaction-test',
    name: 'ReactionTest',
    component: ReactionTest,
  },
  {
    path: '/stroop-test2',
    name: 'StroopTest2',
    component: StroopTest2,
  },
  {
    path: '/vigilance-test',
    name: 'VigilanceTest',
    component: VigilanceTest,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
