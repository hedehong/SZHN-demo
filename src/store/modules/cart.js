import { getToken, setToken } from '../../utils/auth.js'
import cartList from '../../../mock/cartlist.js'
const user = {
	state: {
		cartList: cartList,
		comfireOrderList: getToken('comfireOrderList') === null ? [] : JSON.parse(getToken('comfireOrderList'))
	},

	mutations: {
		SET_CART_LIST: (state, cartList) => {
			state.cartList = cartList
		},
		SET_COMFIRE_ORDER_LIST: (state, list) => {
			state.comfireOrderList = list
		}
	},

	actions: {
		addToCart({ commit }, goods) {
			return new Promise((resolve, reject) => {
				goods.image = goods.bannerList[0].image
				let data = null
				if (cartList === null) {
					data = [goods]
				} else{
					data = cartList
					data.push(goods)
				}
				commit('SET_CART_LIST', data)
				setToken('goodsList', JSON.stringify(data))
				resolve()
			}).catch(error => {
				reject(error)
			})
		},
		comfireOrder({ commit }, list) {
			return new Promise((resolve, reject) => {
				console.log(list)
				setToken('comfireOrderList', JSON.stringify(list))
				commit('SET_COMFIRE_ORDER_LIST', list)
				resolve()
			}).catch(error => {
				reject(error)
			})
		}
	}
}

export default user
