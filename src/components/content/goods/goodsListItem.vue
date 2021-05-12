<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-item-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collection">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }

    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 55px;
    position: relative;

    width: 19%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 10px;
  }

  .goods-item-info {
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-item-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 3px;
  }

  .goods-item-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-item-info .collection {
    position: relative;
    left: 10px;
  }

  .goods-item-info .collection::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/image/common/collect.svg") 0 0/14px 14px;
  }
</style>