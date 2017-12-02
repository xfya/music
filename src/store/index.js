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