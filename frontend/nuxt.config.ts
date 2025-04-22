// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/strapi',
  ],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:1337/api',
      url: process.env.STRAPI_URL || 'http://localhost:1337',
    }
  }
})