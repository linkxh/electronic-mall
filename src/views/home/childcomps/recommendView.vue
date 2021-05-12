<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommend-item" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "recommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;

    padding: 5px 0 10px;
    border-bottom: 5px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
</style>