export const useUserStore = defineStore(
  'auth',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const apiBase = runtimeConfig.public.apiBase
    const authCookie = useCookie('auth')
    const authToken = useCookie('token')

    const router = useRouter()
    const userData = ref({
      email: '',
      id: '',
      name: '',
      role: 'guest',
      avatar: '',
      birthday: '',
      myPlan: '',
      jobTitle: '',
      bio: ''
    })

    const isLogin = ref(false)

    const userLogin = () => {
      isLogin.value = true
    }

    const getUserInfo = (user: UserInfo) => {
      userData.value.email = user.Email
      userData.value.id = user.Uid
      userData.value.name = user.NickName
      userData.value.role = user.Role
      userData.value.avatar = user.ImgUrl
      userData.value.birthday = user.Birthday
      userData.value.myPlan = user.MyPlan
      if (user.Role === 'writer') {
        userData.value.jobTitle = user.JobTitle as string
        userData.value.bio = user.Bio as string
      }
    }

    const getUserToken = (token: string) => {
      authToken.value = token
    }

    const userLogout = () => {
      isLogin.value = false
      authCookie.value = null
      authToken.value = null
      const router = useRouter()
      if (router.currentRoute.value.meta.requiredAuth) {
        router.replace('/login')
      } else {
        location.reload()
      }
    }

    const checkAuth = async () => {
      const { data, error } = await useFetch(`${apiBase}/checkauth`, {
        method: 'POST',
        body: {
          token: authToken?.value
        }
      })
      if (data.value) {
        console.log('token 驗證成功')
      } else if (error.value) {
        authToken.value = null
        isLogin.value = false
        console.log('token 驗證失敗')
        router.replace('/login')
      }
    }

    return { isLogin, userData, userLogin, getUserInfo, getUserToken, userLogout, checkAuth }
  },
  {
    persist: true
  }
)
