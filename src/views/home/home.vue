<template>
  <div id="home">
    <div class="components-list">
      <nav-bar class="home-bar">
        <div slot="center">购物街</div>
      </nav-bar>
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view class="feature-view"/>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </div>
    <back-top v-if="btnFlag" @click.native="backTop"/>

<!--    <ul>-->
<!--      <li>列表1</li>-->
<!--      <li>列表2</li>-->
<!--      <li>列表3</li>-->
<!--      <li>列表4</li>-->
<!--      <li>列表5</li>-->
<!--      <li>列表6</li>-->
<!--      <li>列表7</li>-->
<!--      <li>列表8</li>-->
<!--      <li>列表9</li>-->
<!--      <li>列表10</li>-->
<!--      <li>列表11</li>-->
<!--      <li>列表12</li>-->
<!--      <li>列表13</li>-->
<!--      <li>列表14</li>-->
<!--      <li>列表15</li>-->
<!--      <li>列表16</li>-->
<!--      <li>列表17</li>-->
<!--      <li>列表18</li>-->
<!--      <li>列表19</li>-->
<!--      <li>列表20</li>-->
<!--      <li>列表21</li>-->
<!--      <li>列表22</li>-->
<!--      <li>列表23</li>-->
<!--      <li>列表24</li>-->
<!--      <li>列表25</li>-->
<!--      <li>列表26</li>-->
<!--      <li>列表27</li>-->
<!--      <li>列表28</li>-->
<!--      <li>列表29</li>-->
<!--      <li>列表30</li>-->
<!--      <li>列表31</li>-->
<!--      <li>列表32</li>-->
<!--      <li>列表33</li>-->
<!--      <li>列表34</li>-->
<!--      <li>列表35</li>-->
<!--      <li>列表36</li>-->
<!--      <li>列表37</li>-->
<!--      <li>列表38</li>-->
<!--      <li>列表39</li>-->
<!--      <li>列表40</li>-->
<!--      <li>列表41</li>-->
<!--      <li>列表42</li>-->
<!--      <li>列表43</li>-->
<!--      <li>列表44</li>-->
<!--      <li>列表45</li>-->
<!--      <li>列表46</li>-->
<!--      <li>列表47</li>-->
<!--      <li>列表48</li>-->
<!--      <li>列表49</li>-->
<!--      <li>列表50</li>-->
<!--      <li>列表51</li>-->
<!--      <li>列表52</li>-->
<!--      <li>列表53</li>-->
<!--      <li>列表54</li>-->
<!--      <li>列表55</li>-->
<!--      <li>列表56</li>-->
<!--      <li>列表57</li>-->
<!--      <li>列表58</li>-->
<!--      <li>列表59</li>-->
<!--      <li>列表60</li>-->
<!--    </ul>-->
  </div>

</template>

<script>
import navBar from "@/components/common/navbar/navbar";
import tabControl from "@/components/content/tabControl/tabControl";
import goodsList from "@/components/content/goods/goodsList";
import backTop from "@/components/content/backtop/backTop";

import {getHomeMultidata, getHomeGoods} from "@/network/home";

import homeSwiper from "./childcomps/homeSwiper"
import recommendView from "@/views/home/childcomps/recommendView";
import featureView from "@/views/home/childcomps/featureView";




export default {
  name: "home",
  components: {
    navBar,
    tabControl,
    goodsList,
    backTop,
    homeSwiper,
    recommendView,
    featureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      btnFlag: false
    }
  },
  created() {
    //请求多个首页数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    window.addEventListener('scroll',this.scrollLoadMore,false)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
    window.removeEventListener('scroll', this.scrollLoadMore)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backTop () {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 15)
    },

    // 为了计算距离顶部的高度，当高度大于1000显示回顶部图标，小于1000则隐藏
    scrollToTop () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > 1000) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    },

    scrollLoadMore() {
      //变量滚动时距顶部距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if(scrollTop + windowHeight >= scrollHeight - 0.80111111111){
        //这里开始的你请求操作或者是显示数据
        this.getHomeGoods(this.currentType)
        console.log(this.goods[this.currentType].page);
      }
    },

    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
      })
    }
  }
}
</script>

<style scoped>
  #home {
    padding: 0 100px 0 100px;
    background-color: #eeeeee;
  }

  .components-list {
    background-color: #fff;
    border-radius: 20px;
  }

  .home-bar {
    background-color: var(--color-tint);
    color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    top: 30px;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 60px;
    z-index: 9;
  }
</style>