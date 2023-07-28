<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'

const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

const { apiBase } = useApiConfig()
const emailError = ref(false)

const { emailRequired, emailRule } = useValidate()

const account = ref('')
const alreadySend = ref<boolean>(false)

const sendResetPwd = async () => {
  try {
    alreadySend.value = true
    const res: ApiResponse = await $fetch(`${apiBase}/forgetpwd/?email=${account.value}`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST'
    })
    if (res.StatusCode === 200) {
      setToast(res.Message)
    }
  } catch (error: any) {
    console.log(error.response)
    emailError.value = true
  }
}
const handleEnterKey = (event: any) => {
  if (event.key === 'Enter') {
    sendResetPwd()
  }
}

watch(account, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emailError.value = false
  }
})
</script>
<template>
  <section class="container flex items-center justify-center pb-40 font-serif-tc">
    <div class="fixed right-10 top-44 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
    <div class="flex h-[605px] w-full">
      <div
        class="flex w-full flex-col items-center justify-center px-[74px] py-[124px] md:border md:border-primary 3xl:relative 3xl:px-[516px] 3xl:py-[132px]"
      >
        <div class="w-[322px] 3xl:static">
          <h2 class="mb-6 py-2 text-2xl font-bold text-primary">重設密碼</h2>
          <label for="email" class="mb-2 text-secondary">請輸入您常用的電子信箱</label>
          <VForm v-slot="{ errors, meta }" class="w-full">
            <div class="relative mb-4 mt-2">
              <VField
                id="email"
                v-model="account"
                :rules="[emailRequired, emailRule]"
                name="email"
                type="email"
                label="電子信箱"
                placeholder="name@example.com"
                class="input-bordered input mb-1 w-full rounded border-[#BDBDBD] bg-sand-100 text-secondary focus:outline-none"
                :class="errors['email'] ? 'border-[#EF4444]' : 'border-secondary '"
                @keydown.enter.prevent="handleEnterKey"
              />
              <div class="block text-[14px] text-red-500">
                <VErrorMessage name="email" />
              </div>
              <p v-if="emailError" class="text-[14px] text-red-500">此Email未註冊</p>
            </div>

            <div class="relative">
              <button
                class="btn w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
                type="submit"
                :disabled="!meta.valid"
                @click="sendResetPwd"
              >
                確定
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.fade-enter-active {
  transition: opacity 2s;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-to {
  opacity: 0;
}

.fade-element {
  transition: opacity 2s;
}
input::placeholder {
  color: #c1b6a4;
}
</style>
