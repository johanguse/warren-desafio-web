import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';

import '@/styles/global/index.less';

Vue.config.productionTip = false;
Vue.use(VModal);

Vue.filter('capitalize', (value: string) => {
  if (!value) return '';
  value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter('formatAmount', (amount: number) => amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }) || '');
Vue.filter('formatDate', (date: Date) => new Date(date)?.toLocaleDateString('pt-Br', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }) || '');

new Vue({
  render: (h) => h(App),
}).$mount('#app');
