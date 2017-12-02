<template>

    <transition name="slide" >
        <music-list 
        :songs ="songs"
        :title= 'title'
        :bg-image="bgImage"
        ></music-list>
    </transition>

 </template>

<script>
    import {mapGetters}  from 'vuex'
    import { getSingerDetail } from 'api/singer'
    import { ERR_OK } from 'api/config'
    import { createSong } from '@/common/js/song'
    import MusicList  from 'components/music-list/music-list'
   export default {

        data() {
            return {

                songs:[]
            }
        },
        created(){
          
            this._getSingerDetail()
        },
        computed:{
            // gettters  最终映射的就是 computed
            ...mapGetters([
                'singer', // 对应store 中的 singer  
            ]),
            title(){
                return this.singer.name
            },
            bgImage(){
                 return this.singer.avatar
            }

        },
        methods:{
            
            _getSingerDetail(){
                if(!this.singer.id){
                    this.$router.push('/singer')
                }
                getSingerDetail(this.singer.id).then(res=>{
                         if (res.code === ERR_OK) {
                            this.songs = this._normalizeSongs(res.data.list)
                              console.log(this.songs)
                       }
                })
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((item, index) => {
                let { musicData } = item
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
                })
                return ret
            }
        },
        components:{
            MusicList
        }
    }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)


  .singer-detail{
      position fixed;
      z-index:100;
      top:0;
      right:0;
      left:0;
      bottom:0;
      background: $color-background;

    }  
</style>
