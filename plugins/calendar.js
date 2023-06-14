import 'v-calendar/dist/style.css'
import VCalendar from 'v-calendar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VCalendar)
})
