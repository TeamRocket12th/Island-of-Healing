<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const router = useRouter()

let res: ApiResponse = {}

const user = reactive({
  account: 'example@mail.com',
  password: 'Test0000',
  confirmpwd: 'Test0000'
})

const handleSignUp = async () => {
  const { data, error } = await useFetch(`${apiBase}/signup`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: user
  })
  if (data.value) {
    res = data.value
    console.log(res)
    if (res.statusCode === 200) {
      console.log(res.Message)
      router.push('/login')
    }
  } else if (error.value) {
    console.log(error.value.data)
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

const confirmationRule = () => {
  if (user.confirmpwd === user.password) {
    return true
  }
  return '*密碼不一致'
}
// 修改input type & eye icons
const passwordType = ref('password')
const pwdEyeOpen = ref(false)
const pwdEyeClose = ref(true)
const togglePasswordType = () => {
  passwordType.value = passwordType.value === 'text' ? 'password' : 'text'
  pwdEyeOpen.value = !pwdEyeOpen.value
  pwdEyeClose.value = !pwdEyeClose.value
}
const passwordCheckType = ref('password')
const pwdCheckEyeOpen = ref(false)
const pwdCheckEyeClose = ref(true)
const togglePasswordCheckType = () => {
  passwordCheckType.value = passwordCheckType.value === 'text' ? 'password' : 'text'
  pwdCheckEyeOpen.value = !pwdCheckEyeOpen.value
  pwdCheckEyeClose.value = !pwdCheckEyeClose.value
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
              class="tab-bordered tab h-[52px] w-1/2 flex-nowrap py-2 text-2xl text-[#C1B6A4] hover:text-[#978e7e]"
              >登入
            </NuxtLink>
            <NuxtLink
              to="/signup"
              class="tab-bordered tab tab-active h-[52px] w-1/2 flex-nowrap py-2 text-2xl text-primary"
              >註冊
            </NuxtLink>
          </div>
          <div class="mb-6 flex items-center justify-between text-primary lg:mb-8 lg:hidden">
            <h2 class="text-2xl font-bold">註冊</h2>
            <NuxtLink
              to="/login"
              class="text-[14px] underline decoration-primary underline-offset-2"
              >立即登入
            </NuxtLink>
          </div>
          <VForm class="w-full text-secondary">
            <label for="account">帳號</label>
            <div class="relative mb-1 mt-1">
              <Icon
                name="mdi:email-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="account"
                v-model="user.account"
                :rules="[emailRequired, emailRule]"
                type="email"
                name="email"
                placeholder="信箱"
                class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
            </div>
            <VErrorMessage name="email" class="block text-[14px] text-red-500" />
            <label for="password " class="mt-4 block">密碼</label>
            <div class="relative mt-1">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="password"
                v-model="user.password"
                :rules="[passwordRequired, passwordRule]"
                name="password"
                :type="passwordType"
                placeholder="密碼"
                class="input-bordered input mb-1 w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
              <Icon
                v-if="pwdEyeOpen"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="togglePasswordType"
              />

              <Icon
                v-if="pwdEyeClose"
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="togglePasswordType"
              />
            </div>
            <VErrorMessage name="password" class="block text-[14px] text-red-500" />
            <label for="checkpassword" class="mt-4 block">再次輸入密碼</label>
            <div class="relative mt-1">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="checkpassword"
                v-model="user.confirmpwd"
                :rules="[passwordRequired, confirmationRule]"
                name="passwordCheck"
                :type="passwordCheckType"
                placeholder="再次輸入密碼"
                class="input-bordered input mb-1 w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
              <Icon
                v-if="pwdCheckEyeOpen"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                onclick="seePassWord"
                @click="togglePasswordCheckType"
              />
              <Icon
                v-if="pwdCheckEyeClose"
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="togglePasswordCheckType"
              />
            </div>
            <VErrorMessage name="passwordCheck" class="block text-[14px] text-red-500" />
            <div class="relative my-4">
              <button
                type="button"
                class="btn w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-slate-600"
                @click.prevent="handleSignUp"
              >
                註冊
              </button>
            </div>
            <div class="hidden justify-end text-[14px] lg:flex">
              <p>已成為會員？</p>
              <NuxtLink to="/login" class="ml-2 underline underline-offset-2">立即登入</NuxtLink>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </section>
</template>
