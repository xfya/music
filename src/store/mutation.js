import * as types from './mutation-type'

const mutations = {
    // 第一个参数 是 state 获取当前状态树 state  
    // 第二个参数 是 传的参数
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    }
}
export default mutations