<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'

const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

const { userLogout } = useUserStore()

const passwordField = useTogglePassword()
const passwordCheckField = useTogglePassword()
const { passwordRequired, passwordRule, confirmPwdSame } = useValidate()
const confirmPwdRule = () => confirmPwdSame(Password, ConfirmPassword)

const { apiBase } = useApiConfig()
const router = useRouter()

const Password = ref('')
const ConfirmPassword = ref('')

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
      setToast('變更成功！')
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
  <div class="container flex items-center justify-center pb-[55px] font-serif-tc">
    <div class="fixed right-10 top-52 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
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
                :type="passwordField.passwordType.value"
                class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
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
            <div>
              <VErrorMessage name="password" class="text-[14px] text-red-500" />
            </div>
            <label for="passwordCheck" class="mt-6 block text-[16px]">重新輸入新密碼 :</label>
            <div class="relative mb-1 mt-2">
              <VField
                id="passwordCheck"
                v-model="ConfirmPassword"
                name="passwordCheck"
                :rules="[passwordRequired, confirmPwdRule]"
                :type="passwordCheckField.passwordType.value"
                class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
              />
              <Icon
                v-if="passwordCheckField.pwdEyeOpen.value"
                name="ic:outline-remove-red-eye"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="passwordCheckField.togglePasswordType"
              />
              <Icon
                v-else
                name="material-symbols:visibility-off-outline"
                size="25"
                class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
                @click="passwordCheckField.togglePasswordType"
              />
            </div>
            <VErrorMessage name="passwordCheck" class="text-[14px] text-red-500" />
            <div class="relative mt-4">
              <button
                type="button"
                class="btn w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
                @click="resetPwd"
              >
                儲存變更及登入
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
