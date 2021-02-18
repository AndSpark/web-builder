import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$http = Axios.create({
	baseURL: process.env.VUE_APP_URL,
	timeout: 60000,
})

new Vue({
	vuetify,
	render: h => h(App),
}).$mount('#app')
