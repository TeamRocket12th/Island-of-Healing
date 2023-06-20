import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { checkAuth } = useUserStore()
  const path = to.path
  if (path.includes('account')) {
    checkAuth()
  }
})
