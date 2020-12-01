let viewgird = [
  // news--being 
  {
    path: '/News/home',
    name: 'newsHome',
    component: () => import('@/views/News/index.vue')
  }, {
    path: '/News',
    name: 'News',
    component: () => import('@/views/News/News.vue')
  }, {
    path: '/NewsTag',
    name: 'NewsTag',
    component: () => import('@/views/News/NewsTag.vue')
  }, {
    path: '/NewsType',
    name: 'NewsType',
    component: () => import('@/views/News/NewsType.vue')
  },
  //news---end
  // movie--being 
  {
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/movie/movie.vue')
  },
  {
    path: '/movieType',
    name: 'movieType',
    component: () => import('@/views/movie/movieType.vue')
  }, {
    path: '/MovieWebsite',
    name: 'MovieWebsite',
    component: () => import('@/views/movie/MovieWebsite.vue')
  }, {
    path: '/MoviePlay',
    name: 'MoviePlay',
    component: () => import('@/views/movie/MoviePlay.vue')
  },
  //movie---end

  //website--being 
  {
    path: '/websiteConfig',
    name: 'websiteConfig',
    component: () => import('@/views/website/websiteHomeConfig.vue')
  },
  {
    path: '/websiteHomeConfig',
    name: 'websiteHomeConfig',
    component: () => import('@/views/website/websiteHomeConfig.vue')
  }
  //website---end
]
export default viewgird
