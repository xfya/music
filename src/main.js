// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import store from './store'
import fastclick from 'fastclick'
fastclick.attach(document.body)
    // 图片懒加载实现
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {

    loading: require('./components/m-header/logo@2x.png'),

})




Vue.config.productionTip = false


import './common/stylus/index.styl'


Vue.filter('filters', function(value, start, end) {
    // 返回处理后的值
    return value.slice(start, end)
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})