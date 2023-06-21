export const useUserStore = defineStore(
  'auth',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const apiBase = runtimeConfig.public.apiBase
    const authCookie = useCookie('auth')
    const sessionId = useCookie('sessionId')

    const router = useRouter()
    const userData = ref({
      userId: '',
      name: '',
      role: 'guest',
      avatar: ''
    })

    const isLogin = ref(false)

    const userLogin = () => {
      isLogin.value = true
      sessionId.value = 'testSessionId'
    }

    const getUserInfo = (user: UserInfo) => {
      userData.value.userId = user.uuid
      userData.value.name = user.nickName
      userData.value.role = user.role
      userData.value.avatar = user.imgUrl
    }

    const userLogout = () => {
      authCookie.value = null
      sessionId.value = null
      location.reload()
    }

    const checkAuth = async () => {
      const { data, error } = await useFetch(`${apiBase}/checkauth`, {
        method: 'POST',
        body: {
          token: sessionId?.value
        }
      })
      if (data.value) {
        console.log('sessionId 驗證成功')
      } else if (error.value) {
        sessionId.value = null
        isLogin.value = false
        console.log('session 驗證失敗')
        router.replace('/login')
      }
    }

    return { isLogin, userData, userLogin, getUserInfo, userLogout, checkAuth }
  },
  {
    persist: true
  }
)
