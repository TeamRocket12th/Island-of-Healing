<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

const birthday = ref<Date | null>(new Date(userData.value.birthday))
const handleDateClick = (togglePopover: () => void) => {
  event?.preventDefault()
  togglePopover()
}

const formattedDate = computed(() => {
  if (birthday.value) {
    const selectedDate = new Date(birthday.value)
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } else {
    return '請選擇日期'
  }
})

const selectedImage = ref(userData.value.avatar)
const fileInput = ref<HTMLInputElement | null>(null)
const openFilePicker = () => {
  fileInput.value?.click()
}
const selectFile = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      selectedImage.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const jobTitle = ref<string>(userData.value.jobTitle)

const bioInput = ref<string>(userData.value.bio)
const maxCharacterCount = 30
const characterCount = ref<string>(`(${bioInput.value.length}/${maxCharacterCount})`)

watch(bioInput, (newValue: string) => {
  characterCount.value = `(${newValue.length}/${maxCharacterCount})`
})

const textLengthRule = (value: string) => {
  if (value.length >= 30 || value.length === 30) {
    return '*自我介紹不超過30個字'
  } else {
    return true
  }
}
</script>

<template>
  <div class="mb-40 border-secondary bg-sand-100 p-10 sm:border">
    <div class="xl:grid xl:grid-cols-12">
      <h2 class="col-span-2 text-center font-serif-tc text-2xl font-bold text-primary md:text-left">
        會員設定
      </h2>
      <div class="col-span-9">
        <div class="flex flex-wrap pt-6 md:flex-nowrap lg:gap-4 lg:pt-10">
          <div class="mx-auto my-0">
            <div class="relative h-[100px] w-[100px] rounded-full bg-[#E9E4D9]">
              <img :src="selectedImage" class="h-full w-full rounded-full" />
              <button
                class="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
                @click="openFilePicker"
              >
                <Icon
                  name="material-symbols:edit-outline-rounded"
                  size="16"
                  class="text-sand-100"
                />
              </button>
              <input ref="fileInput" type="file" style="display: none" @change="selectFile" />
            </div>
          </div>
          <VForm class="w-full px-6 pt-6">
            <div class="mb-4 lg:mb-6">
              <label for="email" class="mb-2 block text-primary">常用信箱</label>
              <input
                id="email"
                v-model="userData.email"
                type="input"
                class="w-full cursor-not-allowed rounded border border-primary bg-white px-3 py-[6px] text-sand-300 outline-none lg:w-2/3"
                readonly
              />
            </div>
            <div class="mb-4 block w-full lg:mb-6 lg:flex">
              <div class="w-full gap-4 lg:w-2/3">
                <label for="userName" class="block text-primary">暱稱</label>
                <VField
                  id="userName"
                  :value="userData.name"
                  name="userName"
                  label="*名稱"
                  class="my-2 w-full rounded border border-primary bg-white px-3 py-[6px] text-primary-dark outline-none"
                  rules="required"
                />
                <VErrorMessage name="userName" class="text-primary" />
              </div>
              <div class="w-full pt-4 lg:w-1/3 lg:pl-8 lg:pt-0">
                <label for="birthday" class="mb-2 block text-primary">生日</label>
                <div class="w-full cursor-pointer rounded border border-primary bg-white">
                  <VDatePicker v-model="birthday" expanded>
                    <template #default="{ togglePopover }">
                      <div
                        class="flex cursor-pointer justify-between px-3 py-[6px]"
                        @click="handleDateClick(togglePopover)"
                      >
                        <input
                          id="birthday"
                          v-model="formattedDate"
                          type="text"
                          class="w-full cursor-pointer rounded border-primary text-primary-dark outline-none"
                          readonly
                        />
                        <button>
                          <Icon name="material-symbols:arrow-drop-down" size="24" />
                        </button>
                      </div>
                    </template>
                  </VDatePicker>
                </div>
              </div>
            </div>
            <div v-if="userData.role === 'writer'" class="mb-4 lg:mb-6">
              <label for="jobTitle" class="block text-primary">頭銜</label>
              <VField
                id="jobTitle"
                v-model="jobTitle"
                name="jobTitle"
                label="*頭銜"
                class="my-2 block w-full rounded border border-primary bg-white px-3 py-[6px] text-primary-dark outline-none lg:w-2/3"
                rules="required"
              />
              <VErrorMessage name="jobTitle" class="text-primary" />
            </div>
            <div v-if="userData.role === 'writer'" class="mb-12 lg:mb-11">
              <label for="userIntro" class="mb-2 block text-primary">自我介紹</label>
              <VField
                id="userIntro"
                v-model="bioInput"
                name="userIntro"
                as="textarea"
                label="*自我介紹"
                maxlength="30"
                :rules="textLengthRule"
                rows="4"
                class="w-full rounded border border-primary bg-white px-3 py-[6px] text-primary-dark outline-none"
                placeholder="向其他人簡單介紹你自己吧!可以分享你的創作理念、寫作方向，建議 20-30 字為佳！"
              />
              <div class="relative flex">
                <VErrorMessage name="userIntro" class="text-primary" />
                <p class="absolute right-0">{{ characterCount }}</p>
              </div>
            </div>
            <div>
              <div class="mb-[42px] flex justify-between gap-8 lg:mb-[27px] lg:justify-start">
                <h4 class="text-2xl font-medium text-primary">重置密碼</h4>
                <nuxt-link
                  to="/forgetpassword"
                  class="rounded border border-secondary px-2 py-[3px] text-secondary"
                  >修改密碼</nuxt-link
                >
              </div>
              <div class="mb-12 flex justify-between gap-8 lg:mb-9 lg:justify-start">
                <h4 class="text-2xl font-medium text-primary">訂閱管理</h4>
                <nuxt-link
                  to="/account/{userData.userId}/myplan"
                  class="rounded border border-secondary px-2 py-[3px] text-secondary"
                  >變更訂閱</nuxt-link
                >
              </div>
            </div>
            <div class="mb-16 flex w-full justify-end">
              <button class="rounded border bg-secondary px-[7px] py-2 text-white">儲存變更</button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
