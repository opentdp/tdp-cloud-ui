import request from '@/helper/request'

export const describeDomainList = () => {
    return request({
        method: 'get',
        url: '/dnspod/describeDomainList'
    })
}
