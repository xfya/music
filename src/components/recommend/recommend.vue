<template>
    <div class='recommend' ref="recommend">
        <scroll class="recommend-content" ref="scroll" :data='discList'>
            <div>
                <div v-if='recomends.length' class="slider-wrapper">
                    <slider>
                        <div class="aaa" v-for="(item,index) in recomends" :key="index">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" class="needsclick" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="item" :key="item.key" @click="selectItem(item)">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import Slider from 'base/slider/slider'
    import {
        getRecommend,
        getDiscList
    } from 'api/recommend.js'
    import {
        ERR_OK
    } from 'api/config'
    import axios from 'axios'
    import Loading from 'base/loading'
    import {
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                recomends: [],
                discList: []
            }
        },
        created() {
            this._getRecommend()
            this._getDiscList()
        },
        methods: {
            _getRecommend() {
                getRecommend().then(res => {
                    if (res.code == ERR_OK) {
                        //    console.log(res.data.slider) 
                        this.recomends = res.data.slider
                    }
                })
            },
            _getDiscList() {
                // console.log(2)
                //    this.discList =  getDiscList()
                // getDiscList().then(res => {
                // console.log(res) 
                // })
                axios.get('http://localhost:3002/api/getDiscList?g_tk=5381&notice=0&inCharset=utf8&outCharset=utf-8&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&categoryId=10000000&needNewCode=0&rnd=0.9071911352531421&format=json&jsonpCallback=tan1')
                    .then(res => {
                        this.discList = res.data.data.list
                    })
            },
            loadImage() {
                if (!this.checkedload) {
                    this.$refs.scroll.refresh()
                    this.checkedload = true
                }
            },
            selectItem(item) {
                this.$router.push({
                    path: `/recommend/${item.dissid}`
                })
                this.setDisc(item)
            },
            ...mapMutations({
                setDisc: 'SET_DISC'
            })
        },
        components: {
            Slider,
            Scroll,
            Loading
        }
    }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)










       
</style>
