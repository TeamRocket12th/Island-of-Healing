<script setup lang="ts">
const data = {
  status: {
    success: {
      alert: '謝謝您！您的訂單已經成立！',
      content: '訂單確認電郵已經發送到您的電子郵箱：',
      userEmail: 'abc0000@gmail.com'
    },
    failed: {
      alert: '很抱歉！您的訂單付款失敗！',
      content: '訂單付款失敗，請再試一次！'
    }
  }
}
const status = ref(true)
</script>

<template>
  <div
    class="mb-28 mt-[60px] grid grid-cols-12 rounded-lg border border-[#D9D9D9] bg-[#D9D9D9] px-10 pb-14 pt-10"
  >
    <div class="col-span-3"></div>
    <div class="col-span-6 border bg-white">
      <div>
        <div v-show="status" class="text-center">
          <div class="mb-6 flex justify-center">
            <Icon name="mdi:check-circle-outline" size="20" class="right-0 top-0 mr-7 mt-7" />
            <h2 class="flex items-end font-bold">{{ data.status.success.alert }}</h2>
          </div>
          <p>{{ data.status.success.content }}</p>
          <p class="mb-8">{{ data.status.success.userEmail }}</p>
        </div>
        <div v-show="!status" class="text-center">
          <div class="mb-6 flex justify-center">
            <Icon name="mdi:emoticon-sad-outline" size="20" class="right-0 top-0 mr-7 mt-7" />
            <h2 class="flex items-end font-bold">{{ data.status.failed.alert }}</h2>
          </div>
          <p class="mb-8">{{ data.status.failed.content }}</p>
        </div>
        <div class="flex justify-center">
          <button v-show="status" class="mb-5 border bg-gray-500 px-4 py-2 text-white">
            繼續購物
          </button>
          <button v-show="!status" class="mb-5 border bg-gray-500 px-4 py-2 text-white">
            確定
          </button>
        </div>
      </div>
    </div>
    <div class="col-span-3"></div>
  </div>
</template>

<style scoped></style>
