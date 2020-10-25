import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store'
import './permission.js'

Vue.config.productionTip = false
Vue.use(less)
Vue.use(Vant)

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
