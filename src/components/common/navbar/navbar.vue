<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 30px;
    width: 100%;
    line-height: 24px;
    text-align: center;

    position: fixed;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>