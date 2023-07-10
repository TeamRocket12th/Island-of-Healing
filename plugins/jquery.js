import jQuery from 'jquery'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(jQuery)
})
