export default defineNuxtConfig({
  compatibilityDate: '2026-03-20',
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
  experimental: {
    appManifest: false
  },
  css: [
    '~/assets/scss/style.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        }
      }
    }
  }
})
