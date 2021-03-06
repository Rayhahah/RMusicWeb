import request from '@/utils/request'

// const baseURL = "http://localhost:3000"
const baseURL = "http://rmusic.ccoolworld.com:3000"

export function fetchList(params) {
    return request({
        params,
        url: baseURL + '/swiper/list',
        method: 'get'
    })
}

export function del(params) {
    return request({
        params,
        url: baseURL + '/swiper/del',
        method: 'get'
    })
}