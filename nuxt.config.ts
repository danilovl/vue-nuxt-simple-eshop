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
  app: {
    head: {
      title: 'Simple Shop',
      meta: [
        {name: 'description', content: 'Simple Shop — a demo e-shop built with Nuxt 3, Pinia and TypeScript.'},
        {name: 'theme-color', content: '#4f46e5'}
      ],
      link: [
        {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'},
        {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'}
      ],
      script: [
        {
          tagPosition: 'head',
          innerHTML: "(function(){var m=document.cookie.match(/(?:^|; )theme=(light|dark)(?:;|$)/);var t=m?m[1]:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-bs-theme',t)})()"
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3555'
    }
  },
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
    server: {
      watch: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true'
      }
    },
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
