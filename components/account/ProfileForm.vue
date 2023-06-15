<script setup>
const userData = reactive({
  email: 'name@example.com',
  password: '',
  userName: '島民',
  phone: '09-00000000',
  jobTitle: '小島里長伯',
  userIntro: ''
})

const date = ref(new Date())
const handleDateClick = (togglePopover) => {
  event.preventDefault()
  togglePopover()
}
const formattedDate = computed(() => {
  const selectedDate = new Date(date.value)
  const year = selectedDate.getFullYear()
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
  const day = String(selectedDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
})

const selectedImage = ref('')
const fileInput = ref(null)
const openFilePicker = () => {
  fileInput.value.click()
}
const selectFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      selectedImage.value = reader.result
    }
    reader.readAsDataURL(file)
    // console.log(reader)
  }
}
const passwordRequired = (value) => {
  if (value && value.trim()) {
    return true
  }
  return '*密碼 為必填'
}

const passwordRule = (value) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
  if (regex.test(value)) {
    return true
  }
  return '*請輸入 8 位以上大小寫英數字組合'
}

const confirmPassword = ref('')
const confirmationRule = () => {
  if (confirmPassword.value === userData.password) {
    return true
  }
  return '*密碼不一致'
}
</script>

<template>
  <div class="bg-white p-10">
    <div class="grid grid-cols-12">
      <h2 class="col-span-2 text-2xl font-bold">會員設定</h2>
      <div class="col-span-9">
        <div class="flex gap-4 pt-10">
          <div>
            <div class="relative h-[100px] w-[100px] rounded-full bg-[#D9D9D9]">
              <img v-if="selectedImage" :src="selectedImage" class="h-full w-full rounded-full" />
              <button
                class="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#9F9F9F]"
                @click="openFilePicker"
              >
                <Icon name="material-symbols:edit-outline-rounded" size="16" />
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
          <VForm class="w-full px-6 pt-6">
            <div class="mb-4 w-full gap-4">
              <label for="email" class="mb-2 block">常用信箱</label>
              <input
                id="email"
                type="input"
                :value="userData.email"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                readonly="readonly"
              />
            </div>
            <div class="mb-4 w-full gap-4">
              <label for="phone" class="mb-2 block">電話</label>
              <input
                id="phone"
                v-model="userData.phone"
                type="input"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
              />
            </div>
            <div class="mb-4 w-full gap-4">
              <label for="userName">修改名稱</label>
              <VField
                id="userName"
                v-model="userData.userName"
                name="userName"
                label="*名稱"
                class="my-2 w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                rules="required"
              />
              <VErrorMessage name="userName" class="text-red-500" />
            </div>
            <div class="mb-4 gap-4">
              <label for="birthday" class="mb-2 block">生日</label>
              <div class="w-full cursor-pointer rounded-sm border border-[#D9D9D9]">
                <VDatePicker v-model="date" expanded>
                  <template #default="{ togglePopover }">
                    <div
                      class="flex cursor-pointer justify-between"
                      @click="handleDateClick(togglePopover)"
                    >
                      <input
                        id="birthday"
                        type="text"
                        class="cursor-pointer py-[7px] pl-3 text-[#7B7B7B] outline-none"
                        :value="formattedDate"
                        readonly="readonly"
                      />
                      <button class="mr-4">
                        <Icon name="material-symbols:keyboard-arrow-down-rounded" size="16" />
                      </button>
                    </div>
                  </template>
                </VDatePicker>
              </div>
            </div>
            <div class="mb-4 w-full gap-4">
              <label for="jobTitle">頭銜</label>
              <VField
                id="jobTitle"
                v-model="userData.jobTitle"
                name="jobTitle"
                label="*頭銜"
                class="my-2 w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                rules="required"
              />
              <VErrorMessage name="jobTitle" class="text-red-500" />
            </div>
            <div>
              <label for="password">輸入新密碼</label>
              <VField
                id="password"
                v-model="userData.password"
                name="password"
                label="*密碼"
                type="password"
                class="my-2 w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                :rules="[passwordRequired, passwordRule]"
              />
              <VErrorMessage name="password" class="text-red-500" />
              <label for="confirmation" class="mt-2 block">再次輸入新密碼</label>
              <VField
                id="confirmation"
                v-model="confirmPassword"
                name="confirmation"
                label="*密碼"
                type="password"
                class="my-2 w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                :rules="[passwordRequired, confirmationRule]"
              />
              <VErrorMessage name="confirmation" class="text-red-500" />
            </div>
            <div class="mb-9">
              <label for="userIntro" class="mb-2 block">自我介紹</label>
              <VField
                id="userIntro"
                v-model="userData.userIntro"
                name="userIntro"
                as="textarea"
                label="*自我介紹"
                rules="max:10"
                rows="8"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                placeholder="稍微介紹一下自己吧..."
              />
              <VErrorMessage name="userIntro" class="text-red-500" />
            </div>
            <div class="mb-16 flex w-full justify-end">
              <button class="rounded-md border bg-[#828282] px-6 py-[7px] text-white">
                儲存變更
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
