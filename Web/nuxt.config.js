import appConfig from './appsettings'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: appConfig.meta.title,
    meta: [{
      charset: 'utf-8'
    },
    {
      'http-equiv': 'cleartype',
      content: 'on'
    },
    {
      'http-equiv': 'x-dns-prefetch-control',
      content: 'on'
    },
    {
      name: 'author',
      content: appConfig.meta.email
    },
    {
      name: 'MobileOptimized',
      content: '320'
    },
    {
      name: 'HandheldFriendly',
      content: 'True'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: appConfig.meta.title
    },
    {
      name: 'apple-touch-icon',
      content: '/static/icon.png'
    },
    {
      name: 'msapplication-TileImage',
      content: '/static/icon.png'
    },
    {
      name: 'msapplication-TileColor',
      content: appConfig.color.primary
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, user-scalable=no'
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: appConfig.meta.keywords
    },
    {
      hid: 'description',
      name: 'description',
      content: appConfig.meta.description
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/theme/index.css',
    '@/assets/styles/base.css'
  ],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/http',
    {
      src: '@/plugins/scroll',
      ssr: false
    },
    {
      src: '@/plugins/common-register',
      ssr: false
    },
    {
      src: '@/plugins/common-register-ssr'
    },
    {
      src: '@/plugins/user',
      ssr: false
    }
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    'cookie-universal-nuxt',
    "@nuxtjs/axios",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],
  styleResources: {
    scss: []
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },
  // loading: {
  //   color: 'red',
  //   height: '5px'
  // } 
  loading: '@/components/Loading_bar.vue'
}