export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  css: [
    '~/assets/css/atoms/__atoms.scss',
    '~/assets/css/atoms/__hero-overrides.scss',
    '~/assets/css/atoms/__hero-final.scss',
    '~/assets/css/atoms/__responsive.scss'
  ],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Тортики от Анастасии — Симферополь',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }]
    }
  },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  nitro: {
    externals: {
      inline: ['swiper', 'vue']
    },
    prerender: {
      routes: ['/', '/privacy']
    }
  }
})
