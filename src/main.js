import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'lib-flexible'
import axios from 'axios'
//动画库
import animated from 'animate.css'
Vue.use(animated)
Vue.prototype.$bus = new Vue()
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api' 
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
