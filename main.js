import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import store from '@/store';

const app = new Vue({
	store,
    ...App
})

// 引入请求封装，将app参数传递到配置中
require('@/config/request.js')(app)


app.$mount()
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

