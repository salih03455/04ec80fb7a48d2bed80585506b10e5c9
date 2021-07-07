import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PaymentCompleted from '../views/PaymentCompleted.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: 'payment-completed',
    name: 'PaymentCompleted',
    component: PaymentCompleted,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
