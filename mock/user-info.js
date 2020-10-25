import Mock from 'mockjs'
const Random = Mock.Random

Mock.mock('/user-info', 'post', {
	'code': 200,
	'message': 'success',
	'data': {
		'username': 'admin',
		'password': '123456',
		'userImage': 'https://img.yzcdn.cn/vant/cat.jpeg'
	}
})