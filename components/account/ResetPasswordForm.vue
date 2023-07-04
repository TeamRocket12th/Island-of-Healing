<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const { userLogout } = userStore

const { passwordRequired, passwordRule, confirmPwdSame } = useValidate()
const confirmPwdRule = () => confirmPwdSame(Password, ConfirmPassword)

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const router = useRouter()

const Password = ref('')
const ConfirmPassword = ref('')

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

const resetPwd = async () => {
  const userToken = useCookie('token')
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/setpwd`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'PUT',
      body: {
        Password: Password.value,
        ConfirmPassword: ConfirmPassword.value
      }
    })
    if (res.StatusCode === 200) {
      alert(res.Message)
      Password.value = ''
      ConfirmPassword.value = ''
      userLogout()
      router.replace('/login')
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
        <div class="w-[322px] text-secondary">
          <h2 class="mb-4 py-2 text-[24px] font-bold text-primary">重設密碼</h2>

          <VForm action="" class="w-full">
            <label for="password" class="text-[16px]">新密碼 :</label>
            <div class="relative mb-1 mt-2">
              <VField
                id="password"
                v-model="Password"
                name="password"
                :rules="[passwordRequired, passwordRule]"
                :type="passwordType"
                class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
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
            <div>
              <VErrorMessage name="password" class="text-[14px] text-red-500" />
            </div>
            <!-- <div class="mb-4 mt-[10px] flex items-center">
              <Icon name="mdi:alert-circle-outline" size="15" class="left-3" />
             <p class="ml-1 text-[14px]">密碼不得少於6個字元</p> 
            </div> -->

            <label for="passwordCheck" class="mt-6 block text-[16px]">重新輸入新密碼 :</label>
            <div class="relative mb-1 mt-2">
              <VField
                id="passwordCheck"
                v-model="ConfirmPassword"
                name="passwordCheck"
                :rules="[passwordRequired, confirmPwdRule]"
                :type="passwordCheckType"
                class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
              />
              <Icon
                v-if="pwdCheckEyeOpen"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="togglePasswordCheckType"
              />
              <Icon
                v-if="pwdCheckEyeClose"
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="togglePasswordCheckType"
              />
            </div>
            <VErrorMessage name="passwordCheck" class="text-[14px] text-red-500" />
            <div class="relative mt-4">
              <button
                type="button"
                class="btn w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-slate-600"
                @click="resetPwd"
              >
                儲存變更及登入
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </section>
</template>
