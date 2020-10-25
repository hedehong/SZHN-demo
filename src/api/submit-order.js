import request from '@/utils/request'

export function submitOrder(data) {
  return request({
    url: '/submit-order',
    method: 'post',
		data
  })
}

