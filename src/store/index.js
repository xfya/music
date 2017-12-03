// 入口文件

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'
// 调试工具
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})


/**
 * 
 * 对 vuex 定义的时候
 * 
 * 
 * 1 、  先定义 state  原始数据是什么 
 * 2、   getters  是对数据的一些映射  可以是一个函数  是一个计算函数
 * 3、   定义 mutations  去 修改数据 在修改数据之前先定义 mutation-type  一些常量
 *       --- mutation 中 参数的意义
 *       函数名 就是我们在mutation-type 中定义的字符串常量
 *       第一个参数  state  就是   actions 里面的对象 
 *       第二个参数  是修改的一个对象  把这个对象修改到 state 中
 * 
 */