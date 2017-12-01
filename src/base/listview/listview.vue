<template>

    <scroll :data = data class='list-view'
         ref="listView"
         :listenScroll = 'listenScroll'
         :probeType = 'probeType'
         @scroll = 'scroll'
    >
        <ul>
            <li v-for="group in data" class="list-group" :key="group.key" ref="listGroup">
                <h2 class="list-group-title"> {{group.title}} </h2>
                <ul>
                    <li  class="list-group-item" v-for="item in group.items" :key="item.key">
                        <img v-lazy="item.avatar" alt="" class="avatar">
                        <span class="name"> {{item.name}} </span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut"
            @touchstart="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
        >

                <ul>
                    {{currentIndex}}
                    <li class="item" v-for="(item, index) in shortcutList" 
                    :data-index="index" 
                    :key="item.key"
                    :class="{'current' : currentIndex === index}"
                    >
                    {{item}}
                    </li>
                </ul>
        </div>


    </scroll>

 </template>

<script>
    import Scroll from 'base/scroll/scroll'
    
    import { getData } from 'common/js/dom'

    const ANCHOR_HEIGHT = 18
    const TITLE_HEIGHT = 30
    export default {
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        data() {
            return {
                scrollY: -1,
                currentIndex:0,

            }
        },
        computed:{
            shortcutList() {
                return this.data.map((group) => {
                return group.title.substr(0, 1)
                })
            },
            

        },
        created(){
            this.touch = {};
             this.listenScroll = true
             this.listHeight = []
              this.probeType = 3
        },
        methods:{
            onShortcutTouchStart(e){
               let   firstTouch = e.touches[0]
               this.touch.y1 = firstTouch.pageY

               let  anchorIndex = getData(e.target,'index')  
            //    console.log(anchorIndex)
              
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
          },
            onShortcutTouchMove(e){
                let   firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY

                let delta =( this.touch.y2- this.touch.y1)/ANCHOR_HEIGHT |0 ;
                //  |0 表示向下取整

                 let  anchorIndex = this.touch.anchorIndex - 0  + delta
                 this._scrollTo(anchorIndex)    


            },
            _scrollTo(anchorIndex){
                // scrollToElement   第二个参数的含义  是否需要一个缓动的时间
                  this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex],0)
            },
            scroll(pos){
                this.scrollY =pos.y
            },
            calcHeight(){
                 this.listHeight = []
                 const  list = this.$refs.listGroup
                 let  height = 0 ;
                 this.listHeight.push(height)

                 for (let i = 0 ; i < list.length;i++){
                     let  item = list[i];
                     height += item.clientHeight
                     this.listHeight.push(height)

                 }
            }
        },
        components:{
            Scroll
        },
         watch: {
            data() {
                setTimeout(() => {
                    this.calcHeight()
                    }, 20)
            },
            scrollY(newY) {
                const listHeight = this.listHeight
                // top
                if (newY > 0) {
                this.currentIndex = 0
                return
                }
                // middle
                for (let i = 0; i < listHeight.length - 1; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                // 向上滚动srcollY的值为负 所以加上负号
                if (-newY >= height1 && -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 + newY
                    // console.log(this.diff)
                    // console.log(this.currentIndex)
                    return
                }
                }
                // bottom

                this.currentIndex = listHeight.length - 2
            },
         }
    }
</script>


<style lang="stylus">
  @import "~common/stylus/variable"

  .list-view
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
