import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/qwer'
    },
    {
      path:'/',
      component:()=> import('../components/common/Home.vue'),
      meta:{title:'qwqwq'},
      children:[
        {
          path:'/qwer',
          component:()=> import('../components/page/Fenlei.vue'),
          meta:{title:'分类'}
        },
        {
          path:'/table',
          component:()=> import('../components/page/Brand.vue'),
          meta:{title:'品牌'}
        },
        {
          path:'/tabs',
          component:()=> import('../components/page/Pro.vue'),
          meta:{title:'属性'}
        },
        {
          path:'/icon',
          component:()=> import('../components/page/Goods.vue'),
          meta:{title:'商品'}
        },
        {
          path:'/charts',
          component:()=> import('../components/page/GoodsShow.vue'),
          meta:{title:'商品'}
        }
      ]
    }
  ]
})
