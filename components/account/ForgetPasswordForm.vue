<script setup lang="ts">
const user = reactive({
  account: ''
})
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

const alreadySend = ref<boolean>(false)
const sendMail = (event: Event) => {
  event.preventDefault()
  alreadySend.value = true
}
</script>
<template>
  <section class="container flex items-center justify-center pb-40 font-serif-tc">
    <div class="flex h-[605px] w-full">
      <div
        class="flex w-full flex-col items-center justify-center px-[74px] py-[124px] md:border md:border-primary 3xl:relative 3xl:px-[516px] 3xl:py-[132px]"
      >
        <div class="relative w-[288px] 3xl:static">
          <transition name="fade" mode="out-in">
            <p
              v-if="alreadySend"
              class="fade-element absolute top-[-75px] w-full rounded bg-secondary py-3 pl-2 text-[14px] text-white duration-700 lg:right-0 3xl:top-20 3xl:h-[44px] 3xl:w-[348px]"
            >
              已傳送重設密碼連結至您的信箱！
            </p>
          </transition>
          <h2 class="mb-6 py-2 text-2xl font-bold text-primary">重設密碼</h2>
          <label for="email" class="mb-2 text-secondary">請輸入您常用的電子信箱</label>
          <VForm v-slot="{ meta }" action="" class="w-full">
            <div class="relative mb-4 mt-2">
              <VField
                id="email"
                v-model="user.account"
                :rules="[emailRequired, emailRule]"
                name="email"
                type="email"
                label="電子信箱"
                placeholder="name@example.com"
                class="input-bordered input mb-1 w-full rounded border-[#BDBDBD] focus:outline-none"
              />
              <div class="block text-[14px] text-red-500">
                <VErrorMessage name="email" />
              </div>
            </div>

            <div class="relative">
              <button
                class="btn w-full rounded bg-secondary text-[16px] font-bold text-white hover:bg-slate-600"
                type="submit"
                :disabled="!meta.valid"
                @click="sendMail"
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
</style>
