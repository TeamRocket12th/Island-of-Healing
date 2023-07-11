export const useUserStore = defineStore(
  'auth',
  () => {
    const router = useRouter()
    const userInfo = useCookie('userInfo')
    const authToken = useCookie('token')
    const userData = ref({
      email: '',
      id: null as number | null,
      nickName: '',
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
      userData.value.nickName = user.NickName
      userData.value.role = user.Role
      userData.value.avatar = user.ImgUrl
      userData.value.myPlan = user.MyPlan
      userInfo.value = JSON.stringify(userData.value)
    }

    const getUserToken = (token: string) => {
      authToken.value = token
    }

    const userLogout = () => {
      isLogin.value = false
      userInfo.value = null
      authToken.value = null
      userData.value = {
        email: '',
        id: null,
        nickName: '',
        role: 'guest',
        avatar: '',
        birthday: '',
        myPlan: '',
        jobTitle: '',
        bio: ''
      }
      const router = useRouter()
      if (router.currentRoute.value.meta.requiredAuth) {
        router.replace('/login')
      } else {
        location.reload()
      }
    }

    const checkAuth = () => {
      if (authToken.value) {
        console.log('token 驗證成功')
      } else {
        isLogin.value = false
        userInfo.value = null
        authToken.value = null
        console.log('token 驗證失敗')
        router.replace('/login')
      }
    }

    return {
      isLogin,
      userData,
      userLogin,
      getUserInfo,
      getUserToken,
      userLogout,
      checkAuth
    }
  },
  {
    persist: true
  }
)
