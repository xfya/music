<template>
  <div id="app">
      <MHeader></MHeader>
      <tap></tap>
 
        <router-view></router-view>
        <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue'
import tap from 'components/tap/tap.vue'
import Player from 'components/player/player'
export default {
  name: 'app',
  components:{
    MHeader,
    tap,
    Player
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  color: #ffffff;

}
</style>
