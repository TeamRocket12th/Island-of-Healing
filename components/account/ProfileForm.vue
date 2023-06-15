<script setup>
const userData = reactive({
  email: 'name@example.com',
  password: 'Test0000',
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
</script>

<template>
  <div class="bg-white p-10">
    <div class="grid grid-cols-12">
      <h2 class="col-span-2 text-2xl font-bold">會員設定</h2>
      <div class="col-span-9">
        <div class="flex gap-4 pt-10">
          <div>
            <div class="relative h-[100px] w-[100px] rounded-full bg-[#D9D9D9]">
              <button
                class="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#9F9F9F]"
              >
                <Icon name="material-symbols:edit-outline-rounded" size="16" />
              </button>
            </div>
          </div>
          <form class="w-full px-6 pt-6">
            <div class="mb-4 flex gap-4">
              <div class="w-1/2">
                <label for="email" class="mb-2 block">常用信箱</label>
                <input
                  id="email"
                  type="input"
                  :value="userData.email"
                  class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                  readonly="readonly"
                />
              </div>
              <div class="w-1/2">
                <label for="passeord" class="mb-2 block">密碼</label>
                <input
                  id="password"
                  v-model="userData.password"
                  type="password"
                  class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                />
              </div>
            </div>
            <div class="mb-4 flex gap-4">
              <div class="w-1/2">
                <label for="userName" class="mb-2 block">修改名稱</label>
                <input
                  id="userName"
                  v-model="userData.userName"
                  class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                />
              </div>
              <div class="w-1/2">
                <label for="phone" class="mb-2 block">電話</label>
                <input
                  id="phone"
                  v-model="userData.phone"
                  type="input"
                  class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                />
              </div>
            </div>
            <div class="mb-4 flex gap-4">
              <div class="w-1/2">
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
              <div class="w-1/2">
                <label for="title" class="mb-2 block">頭銜</label>
                <input
                  id="title"
                  v-model="userData.jobTitle"
                  type="input"
                  class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
                />
              </div>
            </div>
            <div class="mb-9">
              <label for="userIntro" class="mb-2 block">自我介紹</label>
              <textarea
                id="userIntro"
                v-model="userData.userIntro"
                placeholder="稍微介紹一下自己吧..."
                name="userIntro"
                rows="8"
                type="text"
                maxlength="30"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
              ></textarea>
            </div>
            <div class="mb-16 flex w-full justify-end">
              <button class="rounded-md border bg-[#828282] px-6 py-[7px] text-white">
                儲存變更
              </button>
            </div>
          </form>
        </div>

        <form action="" class="w-full px-6 pt-6">
          <div class="mb-4 flex gap-4">
            <div class="w-1/2">
              <label for="email" class="mb-2 block">常用信箱</label>
              <input
                id="email"
                type="input"
                :value="email"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#E5E5E5]"
              />
            </div>
            <div class="w-1/2">
              <label for="passeord" class="mb-2 block">密碼</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#E5E5E5]"
              />
            </div>
          </div>
          <div class="mb-4 flex gap-4">
            <div class="w-1/2">
              <label for="userName" class="mb-2 block">修改名稱</label>
              <input
                id="userName"
                v-model="userName"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#E5E5E5]"
              />
            </div>
            <div class="w-1/2">
              <label for="phone" class="mb-2 block">電話</label>
              <input
                id="phone"
                v-model="phone"
                type="input"
                class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#E5E5E5]"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="birthday" class="mb-2 block">生日</label>
            <input
              id="birthday"
              type="text"
              class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#E5E5E5]"
            />
          </div>
          <div class="mb-9">
            <label for="address" class="mb-2 block">地址</label>
            <input
              id="address"
              type="text"
              class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#E5E5E5]"
            />
          </div>
          <button class="mb-16 flex w-full justify-end">
            <span class="rounded-md border bg-[#828282] px-6 py-[7px] text-white">儲存變更</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
