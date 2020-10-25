import Mock from 'mockjs'
import cartList from './cartlist.js'
const Random = Mock.Random

Mock.mock('/cart-list', 'post', {
	'code': 200,
	'message': 'success',
	'data': cartList
})