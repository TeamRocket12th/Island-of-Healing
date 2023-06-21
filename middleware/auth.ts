import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  const { isLogin } = storeToRefs(userStore)

  if (!isLogin.value) {
    return navigateTo('/login')
  }
})
