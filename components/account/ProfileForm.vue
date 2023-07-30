<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'
import { useToast } from '~/stores/toast'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const { setToast } = useToast()

const { userData } = storeToRefs(useUserStore())
const { apiBase, userToken } = useApiConfig()

const NickName = ref<string>(userData.value.nickName)

const userInfo: userProfile = reactive({
  Birthday: null,
  JobTitle: '',
  Bio: ''
})

const getUserInfo = async () => {
  if (userToken.value) {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/userinfo`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        }
      })
      if (res.StatusCode === 200) {
        NickName.value = res.Data.User.NickName
        userInfo.Birthday = res.Data.User.Birthday
        userInfo.JobTitle = res.Data.User.Jobtitle || ''
        userInfo.Bio = res.Data.User.Bio || ''
        userData.value.avatar = res.Data.User.ImgUrl
        setLoading(false)
      }
    } catch (error: any) {
      setToast('發生錯誤！')
    }
  }
}

setLoading(true)
onMounted(getUserInfo)

const handleDateClick = (togglePopover: () => void) => {
  togglePopover()
}
const birth = ref('')

const formattedDate = computed(() => {
  if (userInfo.Birthday) {
    const selectedDate = new Date(userInfo.Birthday)
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    birth.value = `${year}-${month}-${day}`
    return `${year}-${month}-${day}`
  } else {
    return '請選擇日期'
  }
})

const fileInput = ref<HTMLInputElement | null>(null)
const openFilePicker = () => {
  fileInput.value?.click()
}
const selectFile = (event: Event) => {
  const formData = new FormData()
  const file: any = (event.target as HTMLInputElement).files?.[0]

  formData.append('userphoto', file)

  updateUserPhoto(formData)
}

const maxCharacterCount = 30
const characterCount = ref<string>(`(${userInfo.Bio.length}/${maxCharacterCount})`)

watch(
  () => userInfo.Bio,
  (newValue: string) => {
    characterCount.value = `(${newValue.length}/${maxCharacterCount})`
  }
)

const textLengthRule = (value: string) => {
  if (value.length >= 30 || value.length === 30) {
    return '*自我介紹不超過30個字'
  } else {
    return true
  }
}

// 更新使用者資料
const updateUserInfo = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/updateuserinfo`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'PUT',
      body: {
        NickName: NickName.value,
        Birthday: userInfo.Birthday,
        JobTitle: userInfo.JobTitle,
        Bio: userInfo.Bio
      }
    })
    if (res.StatusCode === 200) {
      userData.value.nickName = NickName.value
      setToast('已成功更新資料！')
    }
  } catch (error: any) {
    setToast('發生錯誤！')
  }
}

// 更新使用者大頭照
const updateUserPhoto = async (data: FormData) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/upload/userphoto`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'PUT',
      body: data
    })
    if (res.StatusCode === 200) {
      getUserInfo()
    }
  } catch (error: any) {
    setToast('發生錯誤！')
  }
}
</script>

<template>
  <div class="col-span-9">
    <div v-if="isLoading" class="py-16"><LoadingItem /></div>
    <div v-else class="flex flex-wrap pt-6 md:flex-nowrap lg:gap-4 lg:pt-10">
      <div class="mx-auto my-0">
        <div class="relative h-[100px] w-[100px] rounded-full bg-[#E9E4D9]">
          <img :src="userData.avatar" class="h-full w-full rounded-full object-contain" />
          <button
            class="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-secondary hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            @click="openFilePicker"
          >
            <Icon name="material-symbols:edit-outline-rounded" size="16" class="text-sand-100" />
          </button>
          <input ref="fileInput" type="file" style="display: none" @change="selectFile" />
        </div>
      </div>
      <VForm v-slot="{ meta }" class="form w-full px-6 pt-6">
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
              v-model="NickName"
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
              <VDatePicker v-model="userInfo.Birthday" expanded>
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
            v-model="userInfo.JobTitle"
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
            v-model="userInfo.Bio"
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
              to="/resetpassword"
              class="rounded border border-secondary bg-white px-2 py-[3px] text-secondary hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
              >修改密碼</nuxt-link
            >
          </div>
          <div class="mb-12 flex justify-between gap-8 lg:mb-9 lg:justify-start">
            <h4 class="text-2xl font-medium text-primary">訂閱管理</h4>
            <nuxt-link
              :to="`/account/${userData.id}/myplan`"
              class="rounded border border-secondary bg-white px-2 py-[3px] text-secondary hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
              >變更訂閱</nuxt-link
            >
          </div>
        </div>
        <div class="mb-16 flex w-full justify-end">
          <button
            type="submit"
            class="rounded border bg-secondary px-[7px] py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            :disabled="!meta.valid"
            @click.prevent="updateUserInfo"
          >
            儲存變更
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<style scoped></style>
