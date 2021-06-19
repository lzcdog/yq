<template>
  <div id="app">
    <tabbar></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar/tabbar'
export default {
  name: 'App',
  components: {
    tabbar
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
  min-width: 320px;
  max-width: 750px;
  width: 750px;
  margin: 0 auto;
  height: 5500px;
}
</style>
