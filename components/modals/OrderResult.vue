<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { userData } = storeToRefs(useUserStore())
const router = useRouter()
console.log(userData.value.email)

const data = {
  success: {
    alert: '謝謝您！您的訂單已經成立！',
    content: '訂單確認電郵已經發送到您的電子郵箱：',
    userEmail: userData.value.email
  },
  failed: {
    alert: '很抱歉！您的訂單付款失敗！',
    content: '訂單付款失敗，請再試一次！'
  }
}

const emits = defineEmits(['close-result'])
const closeResult = (value: boolean) => {
  emits('close-result', value)
  router.replace('/')
}

const isOrderOK = ref(true)
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="closeResult(false)"
  >
    <div class="container mb-28 mt-[60px] grid grid-cols-12 rounded-lg px-10 pb-14 pt-10">
      <div class="col-span-6 col-start-4 rounded border bg-white shadow">
        <div v-if="isOrderOK">
          <div class="mb-4 flex items-center justify-between gap-2 p-4">
            <div class="flex gap-2">
              <div>
                <Icon name="mdi:check-circle-outline" size="24" class="text-primary" />
              </div>
              <h2 class="my-auto flex text-xl font-bold">{{ data.success.alert }}</h2>
            </div>
            <button type="button" @click="closeResult(false)">
              <Icon name="mdi:close-thick" size="24" class="text-secondary" />
            </button>
          </div>
          <div class="border-b border-t border-sand-200 p-4">
            <p class="text-primary-dark">{{ data.success.content }}</p>
            <p class="text-primary-dark">{{ userData.email }}</p>
          </div>
        </div>
        <div v-else>
          <div class="mb-4 flex items-center justify-between gap-2 p-4">
            <div class="flex gap-2">
              <div>
                <Icon name="mdi:emoticon-sad-outline" size="24" class="text-primary" />
              </div>
              <h2 class="my-auto flex text-xl font-bold">{{ data.failed.alert }}</h2>
            </div>
            <button type="button" @click="closeResult(false)">
              <Icon name="mdi:close-thick" size="24" class="text-secondary" />
            </button>
          </div>
          <p class="border-b border-t border-sand-200 p-4 text-primary-dark">
            {{ data.failed.content }}
          </p>
        </div>
        <div class="flex justify-end p-3">
          <button
            v-if="isOrderOK"
            class="rounded border bg-secondary p-[7px] text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            @click="closeResult(false)"
          >
            繼續購物
          </button>
          <button
            v-else
            class="rounded border bg-secondary p-[7px] text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            @click="closeResult(false)"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
