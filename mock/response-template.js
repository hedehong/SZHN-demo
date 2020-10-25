export function page(index, size, data, total, totalPages) {
	return {

		'code': '200',

		'message': 'success',

		'data': {

			'pageNo': index,

			'pageSize': size,

			'data': data,

			'total': total,

			'totalPages': totalPages
		}
	}
}
