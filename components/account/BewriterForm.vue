<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'
const { apiBase, userToken } = useApiConfig()

const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

const props = defineProps({
  getStatus: {
    type: String,
    default: ''
  },
  getWriter: {
    type: Function,
    default: () => {}
  }
})

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

// 送出申請成為作家
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
      setToast('已提交申請！')
      showSendModal.value = false
      alert(res.Message)
      data.intro = ''
      data.reason = ''
      data.work = ''
      data.socialMedia = ''
      props.getWriter()
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

const showSendModal = ref(false)
const sendModal = () => {
  showSendModal.value = true
}

const closeConfirm = (value: boolean) => {
  showSendModal.value = value
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = showSendModal.value ? 'hidden' : 'auto'
  }
})
</script>

<template>
  <div class="mb-40 bg-sand-100">
    <div v-if="getStatus === '申請失敗' || getStatus === '未申請'">
      <div class="fixed right-10 top-52 z-20 3xl:right-80">
        <ToastMsg v-if="showToast" />
      </div>
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
            @click.prevent="sendModal"
          >
            送出
          </button>
        </div>
      </VForm>
      <template v-if="showSendModal">
        <ConfirmModal @close-confirm="closeConfirm">
          <template #header>
            <h2 class="text-xl text-primary">確定要提交嗎？</h2>
          </template>
          <template #content>
            <p class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
              提交後就無法再編輯囉！審核流程可能需要 3-5 個工作天，請耐心等待通知。
            </p>
          </template>
          <template #footer>
            <div class="flex justify-end gap-2">
              <button
                class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
                @click="showSendModal = false"
              >
                返回
              </button>
              <button
                class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
                @click="applyForWriter"
              >
                確定
              </button>
            </div>
          </template>
        </ConfirmModal>
      </template>
    </div>
    <div v-if="getStatus === '已申請'">
      <p class="text-center text-2xl text-primary">已提交申請，請耐心等候！</p>
    </div>
  </div>
</template>
