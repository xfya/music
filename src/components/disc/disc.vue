<template>

  <transition name="slide">
       <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>

 </template>

<script>
 import {getSongList} from 'api/recommend'
import  {mapGetters}  from 'vuex'
import MusicList from 'components/music-list/music-list'
    export default {

        data() {
            return {
                songs:[]

            }
        },
        mounted(){
            console.log(this.disc)
        },
        computed:{
        title() {
            return this.disc.dissname
        },
         _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
        },
        components:{
            MusicList
        }
    }
</script>

<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
