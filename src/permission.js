import router from './router'
import store from './store'
import { getToken } from './utils/auth.js'

const whiteList = ['/login', '/home', '/detail']
router.beforeEach((to, from, next) => {
	if (getToken()) {
		if (to.path === '/login') {
			next({
				path: '/'
			})
		} else {
			next()
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.fullPath}`)
		}
	}
})
