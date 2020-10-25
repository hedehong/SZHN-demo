import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const routes = [
	{
		path: '/',
		redirect: 'home',
		name: 'Index',
		component: () => import('../views/Layout.vue'),
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('../views/home.vue'),
			},
			{
				path: 'history-order',
				name: 'history-order',
				component: () => import('../views/history-order.vue'),
			},
			
			
		]
	},
	{
		path: '/detail',
		name: 'detail',
		component: () => import('../views/detail.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue'),
	},
	{
		path: '/mine',
		name: 'mine',
		component: () => import('../views/mine.vue'),
	},
	{
		path: '/cart',
		name: 'cart',
		component: () => import('../views/cart.vue'),
	},
	{
		path: '/comfire-order',
		name: 'comfire-order',
		component: () => import('../views/comfire-order.vue'),
	},
]


export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes
})