let viewGird = [{
  path: '/demo',
  name: 'demo'
}    ,{
        path: '/NewsAppend',
        name: 'NewsAppend',
        component: () => import('@/views/News/NewsAppend.vue')
    }    ,{
        path: '/Sys_user_follow',
        name: 'Sys_user_follow',
        component: () => import('@/views/User/Sys_user_follow.vue')
    }    ,{
        path: '/UserSign',
        name: 'UserSign',
        component: () => import('@/views/System/UserSign.vue')
    }]
export default viewGird;
