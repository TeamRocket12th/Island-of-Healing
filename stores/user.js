import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'auth',
  () => {
    const isLogin = ref(false)
    const userRole = ref('guest')

    const userLogin = () => {
      isLogin.value = true
    }

    const getUserRole = (role) => {
      userRole.value = role
    }

    const userLogout = () => {
      const authCookie = useCookie('auth')
      authCookie.value = null
    }

    return { isLogin, userRole, userLogin, getUserRole, userLogout }
  },
  {
    persist: true
  }
)
