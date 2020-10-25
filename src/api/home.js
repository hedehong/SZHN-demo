import request from '@/utils/request'

export function getHomeList(data) {
  return request({
    url: '/home-list',
    method: 'post',
		data
  })
}

