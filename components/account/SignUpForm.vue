<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'

const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

showToast.value = false
const { apiBase } = useApiConfig()
const router = useRouter()

const account = ref('')
const password = ref('')
const confirmPwd = ref('')
const reSignUp = ref(false)

const passwordField = useTogglePassword()
const passwordCheckField = useTogglePassword()
const { emailRequired, emailRule, passwordRequired, passwordRule, confirmPwdSame } = useValidate()
const signUpSuccess = ref(false)
const confirmPwdRule = () => confirmPwdSame(password, confirmPwd)

const handleSignUp = async () => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/signup`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: {
        Account: account.value,
        Password: password.value
      }
    })
    console.log(res)

    if (res.StatusCode === 200) {
      signUpSuccess.value = true
      setToast('註冊成功')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  } catch (error: any) {
    if (error.response._data.Message === '帳號已被使用，註冊失敗') {
      reSignUp.value = true
    }
  }
}

const handleEnterKey = (event: any) => {
  if (event.key === 'Enter') {
    if (account.value !== '' && password.value !== '' && confirmPwd.value !== '') {
      handleSignUp()
    }
  }
}

watch(account, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    reSignUp.value = false
  }
})
</script>
<template>
  <div class="container flex items-center justify-center pb-[55px] font-serif-tc">
    <div class="relative flex h-[700px] w-full">
      <div
        class="flex w-full flex-col items-center justify-center px-[74px] py-[124px] md:border md:border-primary 3xl:px-[516px] 3xl:py-[132px]"
      >
        <div class="fixed right-10 top-52 z-20 3xl:right-80">
          <ToastMsg v-if="showToast" />
        </div>
        <div class="w-[322px]">
          <div class="tabs mb-8 hidden w-full items-center justify-center font-bold lg:flex">
            <NuxtLink
              to="/login"
              class="tab-bordered tab h-[52px] w-1/2 flex-nowrap border-sand-300 py-2 text-2xl text-[#C1B6A4] hover:text-[#978e7e]"
              >登入
            </NuxtLink>
            <NuxtLink
              to="/signup"
              class="tab-bordered tab tab-active h-[52px] w-1/2 flex-nowrap border-primary py-2 text-2xl text-primary"
              >註冊
            </NuxtLink>
          </div>
          <div class="mb-6 flex items-center justify-between text-primary lg:mb-8 lg:hidden">
            <h2 class="text-2xl font-bold">註冊</h2>
            <NuxtLink to="/login" class="text-sm underline decoration-primary underline-offset-2"
              >立即登入
            </NuxtLink>
          </div>
          <VForm v-slot="{ errors, meta }" class="w-full text-secondary">
            <label for="account">帳號</label>
            <div class="relative mb-1 mt-1">
              <Icon
                name="mdi:email-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="account"
                v-model="account"
                :rules="[emailRequired, emailRule]"
                type="email"
                name="email"
                placeholder="信箱"
                class="input-bordered input w-full rounded border bg-sand-100 pl-12 text-secondary focus:outline-none"
                :class="errors['email'] ? 'border-[#EF4444]' : 'border-secondary '"
                @click="handleEnterKey"
              />
            </div>
            <VErrorMessage name="email" class="block text-sm text-red-500" />
            <p v-if="reSignUp" class="block text-sm text-red-500">帳號已被使用，註冊失敗</p>
            <label for="password" class="mt-4 block">密碼</label>
            <div class="relative mt-1">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="password"
                v-model="password"
                :rules="[passwordRequired, passwordRule]"
                name="password"
                :type="passwordField.passwordType.value"
                maxlength="13"
                placeholder="密碼"
                class="input-bordered input mb-1 w-full rounded border bg-sand-100 pl-12 text-secondary focus:outline-none"
                :class="errors['password'] ? 'border-[#EF4444]' : 'border-secondary '"
                @click="handleEnterKey"
              />
              <Icon
                v-if="passwordField.pwdEyeOpen.value"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="passwordField.togglePasswordType"
              />
              <Icon
                v-else
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="passwordField.togglePasswordType"
              />
            </div>
            <VErrorMessage name="password" class="block text-sm text-red-500" />

            <label for="checkpassword" class="mt-4 block">再次輸入密碼</label>
            <div class="relative mt-1">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-secondary"
              />
              <VField
                id="checkpassword"
                v-model="confirmPwd"
                :rules="[passwordRequired, confirmPwdRule]"
                name="passwordCheck"
                :type="passwordCheckField.passwordType.value"
                maxlength="13"
                placeholder="再次輸入密碼"
                class="input-bordered input mb-1 w-full rounded bg-sand-100 pl-12 text-secondary focus:outline-none"
                :class="errors['passwordCheck'] ? 'border-[#EF4444]' : 'border-secondary '"
                @click="handleEnterKey"
              />
              <Icon
                v-if="passwordCheckField.pwdEyeOpen.value"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="passwordCheckField.togglePasswordType"
              />
              <Icon
                v-else
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-secondary"
                @click="passwordCheckField.togglePasswordType"
              />
            </div>
            <VErrorMessage name="passwordCheck" class="block text-sm text-red-500" />
            <div class="relative my-4">
              <button
                type="submit"
                class="btn w-full rounded bg-secondary font-bold text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
                :disabled="!meta.valid"
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
  </div>
</template>
<style scoped>
.tab-bordered.border-primary {
  border-color: #4e2a09 !important;
}

.tab-bordered.border-sand-300 {
  border-color: #c1b6a4 !important;
}
input::placeholder {
  color: #c1b6a4;
}
</style>
