<template>
  <top-bar class="top-bar">
    <top-bar-item path="/home">
      <div slot="item-text">首页</div>
    </top-bar-item>
    <top-bar-item path="/category">
      <div slot="item-text">分类</div>
    </top-bar-item>
    <top-bar-item path="/cart">
      <div slot="item-text">购物车</div>
    </top-bar-item>
    <top-bar-item path="/profile">
      <div slot="item-text">我的</div>
    </top-bar-item>
  </top-bar>
</template>

<script>
import TopBarItem from "@/components/common/topbar/TopBarItem";
import TopBar from "@/components/common/topbar/TopBar";

export default {
  name: "headBar",
  components: {
    TopBar,
    TopBarItem
  }
}
</script>

<style scoped>
  .top-bar {
    box-shadow: 0 2px 1px rgba(100, 100 ,100, 1);
  }
</style>