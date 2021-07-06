import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/scss/main.scss';

import VueMask from 'v-mask'
Vue.use(VueMask);

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import { VueMaskFilter } from 'v-mask'
Vue.filter('VMask', VueMaskFilter)

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import moment from 'moment';
Vue.prototype.moment = moment;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
