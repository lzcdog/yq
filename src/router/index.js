import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const ssyq = ()=> import ('../view/YQ/yq.vue')
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/ssyq',
      meta: {
        title: '实时疫情'
      }
    },
    {
      path: '/ssyq',
      component: ssyq,
      meta: {
        title: '实时疫情'
      }
    },
  ]
})
export default router