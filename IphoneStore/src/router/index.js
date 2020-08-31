import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import ComHome from '@/views/ComHome'
import ComAdmin from '@/views/ComAdmin'
import ComProductDetail from '@/components/ComProductDetail'
import ComHomeDetail from '@/components/ComHomeDetail'
import ComCheckOut from '@/components/ComCheckOut'
import AdminTypeProduct from '@/components/AdminTypeProduct'
import AdminProduct from '@/components/AdminProduct'
import AdminOrder from '@/components/AdminOrder'
import AdminAccount from '@/components/AdminAccount'
import ComProductTypeLeft from '@/components/ComProductTypeLeft'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: ComHome,
      children:[
        {
          path: 'home',
          name: 'home',
          component: ComHomeDetail
        },
        {
          path: 'product-detail/:id',
          name: 'ComProductDetail',
          component: ComProductDetail
        },
        {
          path: 'product-type/:id',
          name: 'ComProductTypeLeft',
          component: ComProductTypeLeft
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: ComCheckOut
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ComAdmin,
      children:[
        {
          path: 'types',
          name: 'type',
          component: AdminTypeProduct
        },
        {
          path: 'products',
          name: 'products',
          component: AdminProduct
        },
        {
          path: 'accounts',
          name: 'accounts',
          component: AdminAccount
        },
        {
          path: 'orders',
          name: 'orders',
          component: AdminOrder
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
    
  ]
})
