<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator">
    </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div class="indicator-place">
          <div v-for="(item, index) in slideCount" class="indicator-item" :class="{active: index === currentIndex - 1}" :key="index"
               @click="goTo(index)"></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0,//元素个数
      totalWidth: 0,//swiper的宽度
      swiperStyle: {},//swiper的样式
      currentIndex: 1,//当前的index
      scrolling: false,//是否在滚动
    }
  },
  mounted() {
    setTimeout(() => {
      //操作DOM，在前后添加Slide
      this.handleDom();
      //开启定时器
      this.startTimer();
    },200)
  },
  methods: {
    //定时器操作
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval)
    },

    stopTimer() {
      window.clearInterval(this.playTimer);
    },

    //滚动的位置判断
    scrollContent(currentPos) {
      //设置正在滚动
      this.scrolling = true;

      //开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
      this.setTransform(currentPos);

      //判断滚动位置
      this.checkPosition();

      //滚动完成
      this.scrolling = false;
    },

    checkPosition() {
      window.setTimeout(() => {
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1){
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration)
    },

    //设置滚动位置
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

    //操作DOM,在DOM前后添加Slide
    handleDom() {
      //获取要操作的元素
      let swiperEl = document.querySelector('.swiper');
      let slidesEls = swiperEl.getElementsByClassName('slide');

      //保存个数
      this.slideCount = slidesEls.length;

      //如果大于1，前后分别加一个slide
      if (this.slideCount > 1){
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;

      }
      //让swiper显示第一个元素
      this.setTransform(-this.totalWidth);
    },

    //拖动事件处理
    touchStart(event) {
      //判断是否在滚动
      if (this.scrolling) return;

      //停止计时器
      this.stopTimer();

      //保存开始滚动的位置
      this.startX = event.touches[0].pageX;
    },

    touchMove(event) {
      //计算拖动距离
      this.currentX = event.touches[0].pageX;
      this.distance =this.currentX - this.startX;
      let currentPos = -this.currentIndex *this.totalWidth;
      let moveDis = this.distance + currentPos;

      //设置当前位置
      this.setTransform(moveDis);
    },

    touchEnd() {
      //获取移动距离
      let currentMove = Math.abs(this.distance);

      //判断移动距离是否足够翻页
      if (this.distance === 0) {
        return;
      }else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex--
      }else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex++
      }

      //移动到正确位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //移动完成后重新开始计时
      this.startTimer();
    },

    //点击跳转
    goTo(index) {
      this.stopTimer();
      this.currentIndex = index + 1;

      this.setTransform(-this.currentIndex * this.totalWidth);
      this.scrollContent(-this.currentIndex * this.totalWidth);

      this.startTimer();
    },

    //上一个，下一个控制器
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      //停止定时器
      this.stopTimer();

      //修改Index值，并修改位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //启动定时器
      this.startTimer();
    }
  }
}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    width: 100%;
    position: relative;

  }

  .swiper {
    display: flex;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 60px;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;

  }

  .indicator-place {
    display: flex;
    background-color: rgba(100, 100, 100, 0.3);
    border-radius: 15px;
  }

  .indicator-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #f6f6f6;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 3px 5px;
  }


  .indicator-item.active {
    background-color: rgba(212,62,46,1.0);
  }


</style>