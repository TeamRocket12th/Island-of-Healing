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
</script>
<template>
  <section class="container flex items-center justify-center py-[100px]">
    <div class="flex h-[700px] w-full">
      <div class="w-1/2 bg-[#CDCDCD]"></div>
      <div
        class="flex w-1/2 flex-col items-center justify-center border border-[#D9D9D9] px-28 3xl:px-[180px]"
      >
        <div class="tabs flex w-full items-center justify-center font-bold">
          <NuxtLink
            to="/login"
            class="tab-bordered tab tab-active h-[52px] w-1/2 flex-nowrap py-2 text-[24px]"
            >登入</NuxtLink
          >
          <NuxtLink
            to="/signup"
            class="tab-bordered tab h-[52px] w-1/2 flex-nowrap py-2 text-[24px]"
            >註冊</NuxtLink
          >
        </div>
        <form class="w-full">
          <div class="relative mt-4">
            <Icon
              name="mdi:account-outline"
              size="25"
              class="absolute left-3 top-1/2 translate-y-[-50%] text-[#6B6B6B]"
            />
            <input
              v-model="user.account"
              type="email"
              placeholder="帳號"
              class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
            />
          </div>

          <div class="relative mt-4">
            <Icon
              name="mdi:lock-outline"
              size="25"
              class="absolute left-3 top-1/2 translate-y-[-50%] text-[#6B6B6B]"
            />
            <input
              v-model="user.password"
              type="password"
              placeholder="密碼"
              class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
            />
            <!-- <Icon
              name="ic:outline-remove-red-eye"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
            /> -->
            <Icon
              name="material-symbols:visibility-off-outline"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
            />
          </div>
          <div class="relative mt-4">
            <button
              type="button"
              class="btn w-full rounded bg-[#9F9F9F] text-[16px] font-bold text-white hover:bg-slate-600"
              @click.prevent="handleLogin"
            >
              登入
            </button>
          </div>
          <div class="relative mt-4">
            <NuxtLink to="/forgetpassword" class="h-12">忘記密碼</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
