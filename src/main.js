// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import qs from 'qs'; // 引入Qs，axios中含有的库，用于将参数转化为query参数
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/public.css';

Vue.config.productionTip = false;
Vue.use(iView);
Vue.prototype.$Message.config({
  top: 20,
  duration: 3,
  closable: true
});
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
