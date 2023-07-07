<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { userLogin, getUserInfo, getUserToken } = userStore
const { emailRequired, emailRule, passwordRequired, passwordRule } = useValidate()

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const router = useRouter()
const passwordField = useTogglePassword()

const user = reactive({
  account: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/login`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: user
    })
    console.log(res)
    if (res.StatusCode === 200) {
      alert(res.Message)
      userLogin()
      getUserInfo(res.Data.User)
      getUserToken(res.Token)
      router.replace('/')
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
</script>
<template>
  <section class="container flex items-center justify-center pb-[55px] font-serif-tc">
    <div class="flex h-[605px] w-full">
      <div
        class="flex w-full flex-col items-center justify-center px-[74px] py-[124px] md:border md:border-primary 3xl:px-[516px] 3xl:py-[132px]"
      >
        <div class="w-[322px]">
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
          <VForm v-slot="{ errors, meta }" class="w-full text-secondary">
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
                class="input-bordered input w-full rounded border pl-12 focus:outline-none"
                :class="errors['email'] ? 'border-[#EF4444]' : 'border-secondary '"
              />
            </div>
            <VErrorMessage name="email" class="block text-sm text-red-500" />
            <label for="password" class="mt-4 block">密碼</label>
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
                :type="passwordField.passwordType.value"
                placeholder="密碼"
                maxlength="13"
                class="input-bordered input w-full rounded border pl-12 focus:outline-none"
                :class="errors['password'] ? 'border-[#EF4444]' : 'border-secondary '"
              />
              <Icon
                v-if="passwordField.pwdEyeOpen.value"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="passwordField.togglePasswordType"
              />
              <Icon
                v-else
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="passwordField.togglePasswordType"
              />
            </div>
            <VErrorMessage name="password" class="block text-sm text-red-500" />
            <div class="relative mb-4">
              <button
                type="button"
                class="btn my-4 w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-slate-600 disabled:bg-[#cfccc9] disabled:text-white 3xl:mb-4"
                :disabled="!meta.valid"
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
