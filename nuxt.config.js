
const path = require('path')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: '/js/flexible.js', type: 'text/javascript', charset: 'utf-8'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/transition.less',
    '~assets/styles/common.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/storage',
    '@/plugins/global',
    {src: '@/plugins/vant-ui', ssr: true},
    '@/plugins/axios',
    '@/plugins/mixins'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', {alias:'cookiz'}]
  ],
  axios: {
    // retry: {retries:3},
    // debug: process.env._ENV == 'production' ? false : true,
    // baseURL: process.env._ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000',
    // withCredentials: true,
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "vant",
            style: false
          },
          "vant"
        ]
      ]
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, './assets/styles/vant-ui/variables.less')}"`
        }
      }
    },
    postcss: [
      require('postcss-px2rem')({
        remUnit: 37.5
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // if (ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
