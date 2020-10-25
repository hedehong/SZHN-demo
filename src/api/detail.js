import request from '@/utils/request'

export function getGoodsDetailById(data) {
  return request({
    url: '/goods-detail',
    method: 'post',
		data
  })
}

