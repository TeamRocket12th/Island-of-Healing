<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

const { emailRequired, emailRule } = useValidate()

const user = reactive({
  account: ''
})

const alreadySend = ref<boolean>(false)

const sendResetPwd = async () => {
  try {
    alreadySend.value = true
    const res = await $fetch(`${apiBase}/forgetpwd/?email=${user.account}`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST'
    })
    console.log(res)
  } catch (error: any) {
    console.log(error.response)
  }
}
const handleEnterKey = (event: any) => {
  if (event.key === 'Enter') {
    sendResetPwd()
  }
}
</script>
<template>
  <section class="container flex items-center justify-center pb-40 font-serif-tc">
    <div class="relative flex h-[605px] w-full">
      <div
        class="flex w-full flex-col items-center justify-center px-[74px] py-[124px] md:border md:border-primary 3xl:relative 3xl:px-[516px] 3xl:py-[132px]"
      >
        <div class="w-[322px] 3xl:static">
          <p
            v-if="alreadySend"
            data-aos="fade-left"
            class="fade-element absolute top-28 w-[322px] rounded bg-secondary py-3 pl-2 text-[14px] text-white duration-700 lg:right-0 lg:top-20 lg:h-[44px] lg:w-[348px]"
          >
            已傳送重設密碼連結至您的信箱！
          </p>

          <h2 class="mb-6 py-2 text-2xl font-bold text-primary">重設密碼</h2>
          <label for="email" class="mb-2 text-secondary">請輸入您常用的電子信箱</label>
          <VForm v-slot="{ errors, meta }" class="w-full">
            <div class="relative mb-4 mt-2">
              <VField
                id="email"
                v-model="user.account"
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
            </div>

            <div class="relative">
              <button
                class="btn w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
                type="button"
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
