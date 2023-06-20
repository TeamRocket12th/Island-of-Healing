<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

interface UsersData {
  email: string
}

const usersData: UsersData = reactive({
  email: 'name@example.com'
})

const date = ref<Date | null>(null)
const handleDateClick = (togglePopover: () => void) => {
  event?.preventDefault()
  togglePopover()
}

const formattedDate = computed(() => {
  if (date.value) {
    const selectedDate = new Date(date.value)
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
    // console.log(reader)
  }
}
const showInputStatus = ref()
onMounted(() => {
  if (userData.value.role === 'writer') {
    showInputStatus.value = false
  } else {
    showInputStatus.value = true
  }
})

const inputText: Ref<string> = ref('')
const maxCharacterCount = 30
const characterCount: Ref<string> = ref(`(${inputText.value.length}/${maxCharacterCount})`)

watch(inputText, (newValue: string) => {
  characterCount.value = `(${newValue.length}/${maxCharacterCount})`
})

const handleInput = (event: Event) => {
  const text: string = (event.target as HTMLTextAreaElement).value.slice(0, maxCharacterCount)
  inputText.value = text
}
</script>

<template>
  <div class="border border-secondary bg-sand-100 p-10">
    <div class="grid grid-cols-12">
      <h2 class="col-span-2 font-serif-tc text-2xl font-bold text-primary">會員設定</h2>
      <div class="col-span-9">
        <div class="flex gap-4 pt-10">
          <div>
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
              <input
                id=""
                ref="fileInput"
                type="file"
                name=""
                style="display: none"
                @change="selectFile"
              />
            </div>
          </div>
          <VForm class="w-full px-6 pt-6 font-sans-tc">
            <div class="mb-4">
              <label for="email" class="mb-2 block text-primary">常用信箱</label>
              <input
                id="email"
                type="input"
                :value="usersData.email"
                class="w-2/3 rounded border border-primary bg-white px-3 py-[6px] text-sand-300 outline-none"
                readonly
              />
            </div>
            <div class="flex w-full">
              <div class="mb-4 w-2/3 gap-4">
                <label for="userName" class="text-primary">暱稱</label>
                <VField
                  id="userName"
                  :value="userData.name"
                  name="userName"
                  label="*名稱"
                  class="my-2 w-full rounded border border-primary bg-white px-3 py-[6px] text-sand-300 outline-none"
                  rules="required"
                />
                <VErrorMessage name="userName" class="text-primary" />
              </div>
              <div class="mb-4 w-1/3">
                <label for="birthday" class="mb-2 block text-primary">生日</label>
                <div class="w-full cursor-pointer rounded border border-primary bg-white">
                  <VDatePicker v-model="date" expanded>
                    <template #default="{ togglePopover }">
                      <div
                        class="flex cursor-pointer justify-between px-3 py-[6px]"
                        @click="handleDateClick(togglePopover)"
                      >
                        <input
                          id="birthday"
                          v-model="formattedDate"
                          type="text"
                          class="w-full cursor-pointer rounded border-primary text-sand-300 outline-none"
                          readonly
                        />
                        <button class="mr-4">
                          <Icon name="material-symbols:arrow-drop-down" size="24" />
                        </button>
                      </div>
                    </template>
                  </VDatePicker>
                </div>
              </div>
            </div>
            <div v-show="showInputStatus" class="mb-4">
              <label for="jobTitle" class="block text-primary">頭銜</label>
              <VField
                id="jobTitle"
                name="jobTitle"
                label="*頭銜"
                class="my-2 block w-2/3 rounded border border-primary bg-white px-3 py-[6px] text-sand-300 outline-none"
                rules="required"
              />
              <VErrorMessage name="jobTitle" class="text-primary" />
            </div>
            <div v-show="showInputStatus" class="mb-9">
              <label for="userIntro" class="mb-2 block text-primary">自我介紹</label>
              <VField
                id="userIntro"
                v-model="inputText"
                name="userIntro"
                as="textarea"
                label="*自我介紹"
                maxlength="30"
                rules="max_value:30"
                rows="4"
                class="w-full rounded border border-primary bg-white px-3 py-[6px] text-sand-300 outline-none"
                placeholder="向其他人簡單介紹你自己吧!
可以分享你的創作理念、寫作方向，建議 20-30 字為佳！"
                @input="handleInput"
              />
              <div class="relative flex">
                <VErrorMessage name="userIntro" class="text-primary" />
                <p class="absolute right-0">{{ characterCount }}</p>
              </div>
            </div>
            <div>
              <div class="mb-[27px] flex gap-8">
                <h4 class="font-medium text-primary">重置密碼</h4>
                <button class="rounded border border-secondary px-2 py-[3px] text-secondary">
                  <nuxt-link to="/forgetpassword">重設密碼</nuxt-link>
                </button>
              </div>
              <div class="mb-11 flex gap-8">
                <h4 class="font-medium text-primary">訂閱管理</h4>
                <button class="rounded border border-secondary px-2 py-[3px] text-secondary">
                  <nuxt-link to="/">變更訂閱</nuxt-link>
                </button>
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
