import request from '@/utils/request'

// const baseURL = "http://localhost:3000"
const baseURL = "http://47.252.86.216:3000"

export function fetchList(params) {
    return request({
        params,
        url: baseURL + '/blog/list',
        method: 'get'
    })
}

export function del(params) {
    return request({
        data: {...params },
        url: baseURL + '/blog/del',
        method: 'post'
    })
}