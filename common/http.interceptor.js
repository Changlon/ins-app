// common/http.interceptor.js

// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://localhost:8201',
		loadingText: '努力加载中~',
		loadingTime: 800,
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
		// ......
	});
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = uni.getStorageSync('token');
		//发送token到后台
		if (token) {
			config.header.Authorization = 'Bearer ' + token.token;
		}

		return config;

	}
	Vue.prototype.$u.http.interceptor.response = (response) => {
		/**
		 * code为非200是抛错 可结合自己业务进行修改
		 */
		const res = response
		//console.log(res)
		if (res.code !== 200) {
			// Message({
			//   message: res.message,
			//   type: 'error',
			//   duration: 3 * 1000

			//})
			vm.$u.toast('出错了');

			// 401:未登录;
			if (res.code === 401) {
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.dispatch('FedLogOut').then(() => {
						location.reload() // 为了重新实例化vue-router对象 避免bug
					})
				})
			}
			return Promise.reject('error')
		} else {
			return response
		}
	}
}

export default {
	install
}
