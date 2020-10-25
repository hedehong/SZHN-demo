import { setToken, removeToken } from '../../utils/auth.js'
import '../../../mock/user-info.js'
import {getUserInfo} from '../../api/user-info.js'

const user = {
	state: {
		userInfo: ''
	},

	mutations: {
		SET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo
		}
	},

	actions: {
		// 登录
		Login({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				commit('SET_USER_INFO', userInfo)
				setToken('userInfo', JSON.stringify(userInfo))
				resolve()
			}).catch(error => {
				reject(error)
			})
		},
		GetUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getUserInfo().then(res => {
					commit('SET_USER_INFO', res)
					setToken('userInfo', JSON.stringify(res))
					resolve(res)
				})
			}).catch(error => {
				reject(error)
			})
		},
		Logout() {
			removeToken('userInfo')
			removeToken('goodsList')
			removeToken('comfireOrderList')
		}
	}
}

export default user
