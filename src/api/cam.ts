import request from '@/helper/request'

export const getAccountSummary = () => {
  return request({
    method: 'get',
    url: '/cam/getAccountSummary'
  })
}
