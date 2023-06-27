<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

const { userLogin, getUserInfo } = userStore

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

const router = useRouter()

let res: ApiResponse = {}

const user = reactive({
  account: 'user@mail.com',
  password: 'Test0000'
})

const handleLogin = async () => {
  const { data, error } = await useFetch(`${apiBase}/login`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: user
  })
  if (data.value) {
    console.log('Login success', data.value)
    res = data.value
    if (res.statusCode === 200) {
      console.log(res.data.user)
      userLogin()
      getUserInfo(res.data.user)
      router.push('/')
    }
  } else if (error.value) {
    console.log('Login error', error.value.data)
  }
}

const emailRequired = (value: string) => {
  if (value && value.trim()) {
    return true
  }
  return '*電子郵件為必填'
}

const emailRule = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (regex.test(value)) {
    return true
  }
  return '*請輸入有效的電子郵件'
}
const passwordRequired = (value: string) => {
  if (value && value.trim()) {
    return true
  }
  return '*密碼 為必填'
}
const passwordRule = (value: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
  if (regex.test(value)) {
    return true
  }
  return '*請輸入 8 位以上大小寫英數字組合'
}
const passwordType = ref('password')
const pwdEyeOpen = ref(false)
const pwdEyeClose = ref(true)
const togglePasswordType = () => {
  passwordType.value = passwordType.value === 'text' ? 'password' : 'text'
  pwdEyeOpen.value = !pwdEyeOpen.value
  pwdEyeClose.value = !pwdEyeClose.value
}
</script>
<template>
  <section class="container flex items-center justify-center pb-[55px] font-serif-tc">
    <div class="flex h-[605px] w-full">
      <div
        class="flex w-full flex-col items-center justify-center px-[74px] py-[124px] md:border md:border-primary 3xl:px-[516px] 3xl:py-[132px]"
      >
        <div class="w-[288px]">
          <div class="tabs mb-8 hidden w-full items-center justify-center font-bold lg:flex">
            <NuxtLink
              to="/login"
              class="tab-bordered tab tab-active h-[52px] w-1/2 flex-nowrap py-2 text-2xl text-primary"
              >登入</NuxtLink
            >
            <NuxtLink
              to="/signup"
              class="tab-bordered tab h-[52px] w-1/2 flex-nowrap py-2 text-2xl text-[#C1B6A4] hover:text-[#978e7e]"
              >註冊</NuxtLink
            >
          </div>
          <div class="mb-6 flex items-center justify-between text-primary lg:mb-8 lg:hidden">
            <h2 class="text-2xl font-bold">登入</h2>
            <NuxtLink
              to="/signup"
              class="text-[14px] underline decoration-primary underline-offset-2"
              >立即註冊
            </NuxtLink>
          </div>
          <VForm class="w-full text-secondary">
            <label for="account">帳號</label>
            <div class="relative my-1">
              <Icon
                name="mdi:account-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%]"
              />
              <VField
                id="account"
                v-model="user.account"
                :rules="[emailRequired, emailRule]"
                name="email"
                type="email"
                placeholder="帳號"
                label="電子信箱"
                class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
            </div>
            <div class="mb-4 block text-[14px] text-red-500">
              <VErrorMessage name="email" />
            </div>
            <label for="password" class="block">密碼</label>
            <div class="relative my-1">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="password"
                v-model="user.password"
                name="password"
                :rules="[passwordRequired, passwordRule]"
                :type="passwordType"
                placeholder="密碼"
                class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
              <Icon
                v-if="pwdEyeOpen"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="togglePasswordType"
              />
              <Icon
                v-if="pwdEyeClose"
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="togglePasswordType"
              />
            </div>
            <div class="mb-4 block text-[14px] text-red-500">
              <VErrorMessage name="password" />
            </div>
            <div class="relative mb-4">
              <button
                type="button"
                class="btn mb-3 w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-slate-600 3xl:mb-4"
                @click.prevent="handleLogin"
              >
                登入
              </button>
            </div>
            <div class="relative flex justify-between text-[14px] text-primary">
              <NuxtLink to="/forgetpassword" class="underline underline-offset-2"
                >忘記密碼</NuxtLink
              >
              <div class="hidden lg:flex">
                <p>尚未成為會員?</p>
                <NuxtLink to="/signup" class="ml-2 underline decoration-primary underline-offset-2"
                  >立即註冊</NuxtLink
                >
              </div>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </section>
</template>
