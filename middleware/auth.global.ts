import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { checkAuth } = useUserStore()

  if (to.meta.requiredAuth) {
    checkAuth()
  }
})
