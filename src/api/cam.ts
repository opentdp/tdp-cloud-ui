import request from '@/helper/request'

const getAccountSummary = () => {
  return request({
    method: 'get',
    url: '/cam/getAccountSummary'
  })
}

export default {
  getAccountSummary
}
