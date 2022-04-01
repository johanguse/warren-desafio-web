import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';

import '@/styles/global/index.less';

Vue.config.productionTip = false;
Vue.use(VModal);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
