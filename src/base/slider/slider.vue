<template>

    <div class='slider' ref="slider">
          <div class="slider-group" ref="sliderGroup">
            <slot></slot>
          </div>
    </div>

 </template>

<script>
import BScroll from 'better-scroll'
  import { addClass } from 'common/js/dom'

    export default {
      props:{
         loop: {
        type: Boolean,
        default: true
        },
        autoPlay: {
          type: Boolean,
          default: true
        },
        interval: {
          type: Number,
          default: 3000
        }

      },
        data() {
            return {


            }
        },
        mounted(){
          setTimeout(()=>{
            this._setSliderWidth()
            this._initSlider()

          })
        },
        methods:{
          _setSliderWidth(){
            this.children = this.$refs.sliderGroup.children;
            console.log( this.children)
       
              let width = 0
              let sliderWidth = this.$refs.slider.clientWidth;
              console.log(sliderWidth)
              for(let i = 0 ; i < this.children.length;i++) {
                let child = this.children[i];
                addClass(child,'slide-item');
                console.log(sliderWidth)
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
              }
              if(this.loop){
                width += 2*sliderWidth
              }

              this.$refs.sliderGroup.style.width = width + 'px'
        
        },
          _initSlider(){
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400
              })
          }
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
