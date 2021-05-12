<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import goodsListItem from "@/components/content/goods/goodsListItem";

export default {
  name: "goodsList",
  components: {
    goodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    padding: 10px 40px 10px 40px;
  }
</style>