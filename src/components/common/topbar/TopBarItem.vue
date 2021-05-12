<template>
  <div class="top-bar-item" @click="itemClick">
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>
<script>
export default {
  name: "TopBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'hotpink'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .top-bar-item {
    flex: 1;
    text-align: center;
    height: 29px;
    font-size: 14px;
    padding: 7px 0;
  }


</style>