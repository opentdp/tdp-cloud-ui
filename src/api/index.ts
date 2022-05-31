import request from '@/helper/request'

export const fetchData = (query) => {
  return request({
    url: './test',
    method: 'get',
    params: query,
  })
}
