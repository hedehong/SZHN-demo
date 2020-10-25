import Mock from 'mockjs'
import historyOrderList from './history-order-list.js'
const Random = Mock.Random

Mock.mock('/history-order', 'post', {
	'code': 200,
	'message': 'success',
	'data': historyOrderList
})