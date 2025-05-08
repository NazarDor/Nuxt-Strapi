// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/strapi',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@primevue/nuxt-module',
    '@samk-dev/nuxt-vcalendar'
  ],
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.my-app-dark',
          cssLayer: false
        }
      }
    }
  },
  imports: {
    dirs: ['stores']
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:1337/api',
      url: process.env.STRAPI_URL || 'http://localhost:1337',
    }
  },

  vite: {
    server: {
      allowedHosts: ['9080-176-241-139-28.ngrok-free.app']
    }
  }
})