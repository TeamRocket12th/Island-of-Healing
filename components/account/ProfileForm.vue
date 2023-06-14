<script setup lang="ts">
const email = ref('name@example.com')
const password = ref('Test0000')
const userName = ref('島民')
const phone = ref('09-00000000')
const birthday = ref('')
const address = ref('')
</script>

<template>
  <div class="bg-white p-10">
    <div class="flex w-full">
      <h2 class="w-1/6 text-2xl font-bold">會員設定</h2>
      <div class="flex w-2/3 gap-3 pt-10">
        <div>
          <div class="relative h-[100px] w-[100px] rounded-full bg-[#D9D9D9]">
            <div
              class="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#9F9F9F]"
            >
              <Icon name="material-symbols:edit-outline-rounded" size="16" />
            </div>
          </div>
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
