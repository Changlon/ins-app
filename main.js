import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
import httpInterceptor from '@/common/http.interceptor.js'
import httpApi from '@/common/http.api.js'
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
// http接口API集中管理引入部分
Vue.use(httpApi, app)
app.$mount()
