// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  // typescript: {
  //   typeCheck: true
  // },
  css: ['@/assets/css/main.css'],
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
  },
  build: {
    transpile: [/echarts/, '@vee-validate/rules']
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    apiKey: process.env.CHATGPT_API_KEY,
    public: {
      apiBase: 'https://islandofhealing.rocket-coding.com/api',
      mockApiBase: 'http://localhost:4000'
    }
  }
})
