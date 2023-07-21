// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-gtag'
  ],
  typescript: {
    typeCheck: true
  },
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
  plugins: [
    {
      src: '~/plugins/aos.client.ts',
      mode: 'client'
    }
  ],
  runtimeConfig: {
    apiKey: process.env.CHATGPT_API_KEY,
    public: {
      apiBase: 'https://islandofhealing.rocket-coding.com/api',
      mockApiBase: 'http://localhost:4000'
    }
  },
  gtag: {
    id: 'G-96SY6NF307',
    config: {
      page_title: '小島聊癒所'
    }
  },
  app: {
    head: {
      title: '小島聊癒所',
      meta: [
        {
          name: 'description',
          content: '歡迎來到小島聊癒所'
        }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    }
  }
})
