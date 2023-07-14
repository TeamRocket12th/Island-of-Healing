<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')

const data = reactive({
  intro: '',
  reason: '',
  work: '',
  socialMedia: ''
})

const maxCharacterCount = 300
const introCount = ref<string>(`(${data.intro.length}/${maxCharacterCount})`)
watch(
  () => data.intro,
  (newValue: string) => {
    introCount.value = `(${newValue.length}/${maxCharacterCount})`
  }
)
const reasonCount = ref<string>(`(${data.reason.length}/${maxCharacterCount})`)
watch(
  () => data.reason,
  (newValue: string) => {
    reasonCount.value = `(${newValue.length}/${maxCharacterCount})`
  }
)

const workCount = ref<string>(`(${data.work.length}/${maxCharacterCount})`)
watch(
  () => data.work,
  (newValue: string) => {
    workCount.value = `(${newValue.length}/${maxCharacterCount})`
  }
)

const textLengthRule = (value: string) => {
  if (value.length >= 300) {
    return '*字數不超過300個字'
  } else {
    return true
  }
}

const required = (value: string) => {
  if (value.trim() === '') {
    return '*必填項目'
  }
  return true
}

const applyForWriter = async () => {
  if (!userToken.value) {
    return
  }
  console.log(data)
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/applyforwriter`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'PUT'
    })
    if (res.StatusCode === 200) {
      console.log(res)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
</script>

<template>
  <div class="mb-40 border-secondary bg-sand-100 p-10 sm:border">
    <div class="">
      <h2
        class="col-span-2 mb-10 text-center font-serif-tc text-2xl font-bold text-primary md:text-left"
      >
        申請成為作家
      </h2>
      <VForm v-slot="{ meta }" class="px-6 py-3 xl:mx-40 3xl:mx-52">
        <div class="mb-10">
          <label for="userIntro" class="mb-2 block font-medium text-primary">自我介紹</label>
          <VField
            id="userIntro"
            v-model="data.intro"
            name="userIntro"
            as="textarea"
            maxlength="300"
            :rules="[required, textLengthRule]"
            rows="3"
            class="w-full rounded border border-primary bg-white p-2 text-primary-dark outline-none placeholder:text-sand-300"
            placeholder="簡單介紹一下自己吧！
幫助我們更了解你！"
          />
          <div class="relative flex">
            <VErrorMessage name="userIntro" class="text-primary" />
            <p class="absolute right-0">{{ introCount }}</p>
          </div>
        </div>
        <div class="mb-10">
          <label for="userReason" class="mb-2 block font-medium text-primary"
            >為什麼想成為作家？</label
          >
          <VField
            id="userReason"
            v-model="data.reason"
            name="userReason"
            as="textarea"
            maxlength="300"
            :rules="[required, textLengthRule]"
            rows="3"
            class="w-full rounded border border-primary bg-white p-2 text-primary-dark outline-none placeholder:text-sand-300"
            placeholder="可以分享你的創作理念、動機..."
          />
          <div class="relative flex">
            <VErrorMessage name="userReason" class="text-primary" />
            <p class="absolute right-0">{{ reasonCount }}</p>
          </div>
        </div>
        <div class="mb-10">
          <label for="userWork" class="mb-2 block font-medium text-primary"
            >提供相關文字作品供參考（文字內容或外部連結皆可）</label
          >
          <VField
            id="userWork"
            v-model="data.work"
            name="userWork"
            as="textarea"
            maxlength="300"
            :rules="[required, textLengthRule]"
            rows="3"
            class="w-full rounded border border-primary bg-white p-2 text-primary-dark outline-none placeholder:text-sand-300"
            placeholder="name@example.com"
          />
          <div class="relative flex">
            <VErrorMessage name="userWork" class="text-primary" />
            <p class="absolute right-0">{{ workCount }}</p>
          </div>
        </div>
        <div class="mb-12">
          <label for="userSocialMedia" class="mb-2 block font-medium text-primary"
            >常用的社群平台連結或帳號</label
          >
          <VField
            id="userSocialMedia"
            v-model="data.socialMedia"
            name="userMedia"
            rows="4"
            :rules="required"
            class="w-full rounded border border-primary bg-white p-2 text-primary-dark outline-none placeholder:text-sand-300"
            placeholder="Facebook、Instagram、Twitter"
          />
          <VErrorMessage name="userSocialMedia" class="text-primary" />
        </div>

        <div class="flex justify-end">
          <button
            class="rounded bg-secondary px-5 py-1 text-white disabled:bg-btn-disabled disabled:text-white"
            :disabled="!meta.valid"
            @click.prevent="applyForWriter"
          >
            送出
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>
