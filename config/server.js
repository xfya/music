const express = require('express');
const request = require('superagent');
const timeout = require('connect-timeout');


const axios = require('axios')


var app = express()
    // console.log(app)
app.use('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
    //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //设置方法
    if (req.method == 'OPTIONS') {
        res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    } else {
        next();
    }
});



//  抓取qq音乐推荐歌单列表 后端代理 设置headers
var apiRoutes = express.Router()


apiRoutes.get('/getDiscList', function(req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(error => {
        console.log(error)
    })
})
apiRoutes.get('/lyric', function(req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        var ret = response.data
        if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch(error => {
        console.log(error)
    })
})

apiRoutes.get('/getSongList', function(req, res) {
        var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        }).then((response) => {
            var ret = response.data
                // 返回的是JSONP格式的话
            if (typeof ret === 'string') {
                var reg = /^\w+\(({.+})\)$/
                var matches = ret.match(reg)
                if (matches) {
                    ret = JSON.parse(matches[1])
                }
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.json(ret)
        }).catch((e) => {
            console.log(e)
        })

    })
    // app.use('/api', apiRoutes)
console.log(apiRoutes)

app.use('/api', apiRoutes)
app.listen(3002)