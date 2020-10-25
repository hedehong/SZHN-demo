import Mock from 'mockjs'
const Random = Mock.Random

Mock.mock('/submit-order', 'post', {
	'code': 200,
	'message': 'success',
	'data': {
		'orderId': '@id'
	}
})