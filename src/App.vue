<template>
  <div id="app">
      <MHeader></MHeader>
      <tap></tap>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue'
import tap from 'components/tap/tap.vue'
export default {
  name: 'app',
  components:{
    MHeader,
    tap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;

}
</style>
