import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 30000
})

service.interceptors.request.use(
  (config) => {
    config.headers['secretId'] = localStorage.getItem('vt_username')
    config.headers['secretKey'] = localStorage.getItem('vt_password')
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      Promise.reject()
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject()
  }
)

export default service
