const base = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/youth-visualizer/' : '';
const nodeExternals = require('webpack-node-externals')

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: base
  }
} : {}

module.exports = {
  /*
  ** Headers of the page
  */
  ...routerBase,
  head: {
    title: 'youth indicator visualizer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Envoy of Youth SDG Indicator Visualization Tool' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/un-icon-en.png' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons' }
    ],
    script: [
      { src:'https://d3js.org/d3-selection-multi.v0.4.min.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#448aff' },
  /*
  ** Build configuration
  */
  css: [
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
    { src: "leaflet/dist/leaflet.css", lang: 'css' },    
    { src: '~/assets/theme.scss', lang: 'scss' }, // include vue-material theme engine
    { src: '~/assets/main.scss', lang: 'scss' } // include vue-material theme engine
  ],
  plugins: [
    { src: '~/plugins/vue-material' },
    { src: '~/plugins/directives' },
    { src: '~/plugins/vue-clipboard' },
    { src: '~/plugins/vue-leaflet', ssr: false },
    { src: '~/plugins/vue-echart', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
  ],  
  build: {
    transpile: [
      ///vue-material/, 
      /vue-echarts/,
      /resize-detector/
    ],
    /*
    ** Run ESLint on save
    */
    babel: {
      plugins: [
        ['transform-imports'],
      ],
      presets:['@vue/babel-preset-app']
    },
    vendor: ['babel-polyfill', 'eventsource-polyfill', 'vue-echarts', 'resize-detector'],
    //vendor: ['vue-material', 'vue-echarts', 'resize-detector'],
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   exclude: /(node_modules)/
        // })
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
        // if (isClient) {
        //   config.entry.vendor.push('babel-polyfill');
        //   config.entry.vendor.push('eventsource-polyfill');
        // }
        //config.entry.vendor.push('babel-polyfill')
      }
      config.module.rules.map(rule => {
        if (rule.loader === 'babel-loader') {
          console.log(rule.options)
          rule.options.include.push('resize-detector')
          // rule.options.include.push('vue-material')
          // rule.options.include.push('vue-echarts')
        }
        return rule
      })
//      if (process.server) {
        if(isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i,  /^vue-echarts/, /^resize-detector/, /^vue2-leaflet/]
          })
        ]
      }
    }
    
  }
}
