<template>
  <div id="app">
    <router-view></router-view>
    <head-bar/>
  </div>

</template>

<script>
import headBar from "@/components/content/mainTabbar/headBar";

export default {
  name: 'App',
  components: {
    headBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
