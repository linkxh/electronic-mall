<template>
  <div class="back-top" @click="backClick">
    <div v-if="isActive"  @mouseover="mouseOver" class="back-top-normal">
      <img src="@/assets/image/common/top_normal.png" alt="">
    </div>
    <div v-else @mouseleave="mouseLeave" class="back-top-active">
      <img src="@/assets/image/common/top_active.png" alt="">
    </div>
  </div>
</template>

<script>


export default {
  name: "backTop",
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    backClick() {
      this.$emit('backTop')
    },
    mouseOver() {
      this.isActive = !this.isActive
    },
    mouseLeave() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 25px;
    bottom: 60px;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .back-top-normal {
    background-color: white;
    border-radius: 10px;
  }

  .back-top-active {
    background-color: var(--color-tint);
    border-radius: 10px;
  }
</style>