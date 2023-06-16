export const useUserStore = defineStore(
  'auth',
  () => {
    const isLogin = ref(false)
    const userData = ref({
      name: '',
      role: 'guest',
      avatar: ''
    })

    const userLogin = () => {
      isLogin.value = true
    }

    const getUserInfo = (user) => {
      userData.value.name = user.nickName
      userData.value.role = user.role
      userData.value.avatar = user.imgUrl
    }

    const userLogout = () => {
      const authCookie = useCookie('auth')
      authCookie.value = null
      location.reload()
    }

    return { isLogin, userData, userLogin, getUserInfo, userLogout }
  },
  {
    persist: true
  }
)
