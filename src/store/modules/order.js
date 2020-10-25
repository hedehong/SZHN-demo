import { submitOrder } from '../../api/submit-order.js'
import {setToken, getToken} from '../../utils/auth.js'
const user = {
	state: {
		successOrder: []
	},

	mutations: {
		SET_SUCCESS_ORDER: (state, successOrder) => {
			state.successOrder = successOrder
		}
	},

	actions: {
		SubmitOrder({ commit }, list) {
		  return new Promise((resolve, reject) => {
				submitOrder().then(res => {
					console.log(list)
					res.successOrder = list
					let data = getToken('successOrder') === null ? [res] : JSON.parse(getToken('successOrder'))
					
					data.push(res)
					
					
					
					setToken('successOrder', JSON.stringify(data))
					commit('SET_SUCCESS_ORDER', data)
					resolve( data)
				}).catch(err => {
					reject(err)
				})
		  }).catch(error => {
				reject(error)
			})
		},
	}
}

export default user
