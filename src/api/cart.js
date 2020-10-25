import request from '@/utils/request'

export function getCartById(data) {
  return request({
    url: '/cart-list',
    method: 'post',
		data
  })
}

