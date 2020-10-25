import Mock from 'mockjs'
const Random = Mock.Random

Mock.mock('/goods-detail', 'post', {
	'code': 200,
	'message': 'success',
	'data': {
		'id': '@id',
		'title': '@cword(10, 20)',
		'desc': '@cparagraph(2, 5)',
		'originPrice': '@integer(5000, 30000)',
		'price': '@integer(0, 5000)',
		'stock': '@integer(1, 10000)',
		'checked': false,
		'bannerList|4': [
			{
				'image': Random.image([20, 10], Random.color(), Random.name()),
				'id': '@id'
			}
		],
		'goodsInfoList|4': [
			{
				'image': Random.image([20, 10], Random.color(), Random.name()),
				'id': '@id'
			}
		]
	}
})