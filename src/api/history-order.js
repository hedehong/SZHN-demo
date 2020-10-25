import request from '@/utils/request'

export function getHistoryOrder(data) {
  return request({
    url: '/history-order',
    method: 'post',
		data
  })
}

