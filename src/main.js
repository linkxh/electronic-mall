import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
//
// Vue.use(ElementPlus, {size: 'small', zIndex: 3000})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')