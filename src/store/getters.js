// 对 state  做一些映射
// 33333333333
// 从getters  中 取数据 到组件中
//   geeters 中 换可以当做计算属性来计算

export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex

export const currentSong = state => {
    return state.playList[state.currentIndex]
}