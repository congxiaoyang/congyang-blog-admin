import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main';
import Index from '@/view/index/Index';
import Info from '@/view/info/Info';
import BlogList from '@/view/blog/List';
import BlogWrite from '@/view/blog/Write';
import Login from '@/view/login/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main/',
      name: 'Main',
      component: Main,
      children:[
        {
          path: 'home',
          name: 'Index',
          component: Index
        },{
          path: 'info',
          name: 'Info',
          component: Info
        },
        {
          path: 'blog/list',
          name: 'BlogList',
          component: BlogList
        },{
          path: 'blog/write',
          name: 'BlogWrite',
          component: BlogWrite
        }
      ],
      redirect:'/main/home'
    },
    {
      path:'/',
      name:'Login',
      component: Login
    }
  ]
})
