import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  const { userData } = storeToRefs(userStore)

  if (userData.value.role !== 'writer') {
    return navigateTo('/login')
  }
})
