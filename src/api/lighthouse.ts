import request from '@/helper/request'

export const describeRegions = () => {
  return request({
    method: 'get',
    url: '/lighthouse/describeRegions'
  })
}

export const describeInstances = (region: string) => {
  return request({
    method: 'get',
    url: '/lighthouse/describeInstances/' + region
  })
}

export const describeInstancesTrafficPackages = (region: string) => {
  return request({
    method: 'get',
    url: '/lighthouse/describeInstancesTrafficPackages/' + region
  })
}
