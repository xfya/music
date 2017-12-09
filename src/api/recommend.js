import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'

import axios from 'axios'
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)

}


export function getDiscList() {
    const url = 'http://localhost:3002/api/getDiscList?g_tk=5381&notice=0&inCharset=utf8&outCharset=utf-8&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&categoryId=10000000&needNewCode=0&rnd=0.9071911352531421&format=json&jsonpCallback=tan1'
        // const url = "'http://localhost:3002/api/getDiscList"
    const data = Object.assign({}, {
            g_tk: 5381,
            notice: 0,
            inCharset: 'utf8',
            outCharset: 'utf-8',
            platform: 'yqq',
            hostUin: 0,
            sin: 0,
            ein: 29,
            sortId: 5,
            categoryId: 10000000,
            needNewCode: 0,
            rnd: Math.random(),
            format: 'json'
        })
        // axios.get(url).then(res => {
        //         console.log(res)
        //         return res.data.data.list
        //     })
        // return jsonp(url, data, options)
}



export function getSongList(disstid) {
    const url = 'http://localhost:3002/api/getSongList'

    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
    })
    return jsonp(url, data, options)

}