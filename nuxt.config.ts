export default defineNuxtConfig({
  devtools: {
    enabled: false
  },
  devServer: {
    port: 5111
  },
  build: {
    transpile: [
        '@fortawesome/vue-fontawesome'
    ]
  },
  srcDir: 'src/',
  pages: true,
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/scss/style.scss'
  ]
})
