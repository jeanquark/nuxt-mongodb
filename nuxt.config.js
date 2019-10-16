
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  serverMiddleware: [
    // '~/serverMiddleware/databaseInit.js',
    '~/serverMiddleware/api/index.js',
    // {
    //   path: '/api/',
    //   handler: '~/serverMiddleware/api/index'
    // },
    // {
    //   path: '/api/articles',
    //   handler: '~/serverMiddleware/api/articles'
    // },
    // {
    //   // path: `/api/article/:id`,
    //   path: '/api/article',
    //   handler: '~/serverMiddleware/api/article'
    // }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
