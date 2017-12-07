// 所有的状态文件
// 111111111

import { playMode } from 'common/js/config'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    // 推荐列表详情 Object
    disc: {},
    currentIndex: -1
}


export default state