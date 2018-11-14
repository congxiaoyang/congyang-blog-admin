// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router'; // 路由
import axios from 'axios'; // axios
import qs from 'qs'; // 引入Qs，axios中含有的库，用于将参数转化为query参数
import iView from 'iview'; // 引入Vue
import mavonEditor from 'mavon-editor'; // 引入mavon-editor(markdown 编辑器)
import 'mavon-editor/dist/css/index.css';
import 'iview/dist/styles/iview.css';
import './assets/css/public.css';

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(mavonEditor);

// 设置iview中message 的全局配置
Vue.prototype.$Message.config({
  top: 20,
  duration: 3,
  closable: true
});

/**
 * 获取当前时间
 * 格式YYYY-MM-DD
 */
Vue.prototype.getNowFormatDate = function() {
  var date = new Date(),
    seperator1 = "-",
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    time = hours+":"+minutes+":"+seconds;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + " " +time;
  return currentdate;
};

Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
