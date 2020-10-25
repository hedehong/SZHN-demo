import Mock from 'mockjs'
const Random = Mock.Random

import {
	page
} from './response-template.js'


Mock.mock('/home-list', 'post', (params) => {
	const dataList = []
	for (let i = 0; i < 26; i++) { // 可自定义生成的个数
	
		const template = {
			'originPrice': Random.integer(5000, 30000),
			'price': Random.float(0, 5000, 2, 2),
			'title': Random.cword(10, 20),
			'image': Random.image([20, 10], Random.color(), Random.name()),
			'desc': Random.cparagraph(2, 5),
			'id': Random.id()
		}
	
		dataList.push(template)
	
	}
	var info = JSON.parse(params.body)

	var [index, size, total] = [info.pageNo, info.pageSize, dataList.length]

	var len = total / size

	var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len

	var newDataList = dataList.slice(index * size, (index + 1) * size)

	return page(index, size, newDataList, total, totalPages)

})

