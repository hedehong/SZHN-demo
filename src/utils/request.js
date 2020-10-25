import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  timeout: 10000
})
service.interceptors.request.use(config => {
  return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(res => {
		console.log(res.data)
    return res.data.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
