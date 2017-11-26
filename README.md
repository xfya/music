# vuemusic

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



###  @2x 和 @ 3x   

在iPhone 3GS中，1个点等于1个像素。也就是说，点跟像素可以直接互换。
在iPhone 4中，1个点等于2个像素。

iPhone 4和iPhone 3GS的屏幕尺寸实际上是一样的，都是3.5英寸。同样一个点，实际上看起来是一样的。只是iPhone 4在单位英寸上像素更多，看起来更细腻。

iphone 4  5  6是采用test_t@2x.png 这个图，iphone 6 plus就采用test_t@3x.png

// 封装的背景图片
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")


## encodeURIComponent()  


##  拼接路径代码

export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}



function param(data) {
    let url = '';
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : '';

        url += `&${k}=${encodeURIComponent(value)}`
    }

    return url ? url.substring(1) : ''
}  

