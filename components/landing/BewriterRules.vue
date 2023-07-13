<script setup lang="ts">
const emits = defineEmits(['writer-rules'])
const showRules = (value: boolean) => {
  emits('writer-rules', value)
}
</script>
<template>
  <div
    class="fixed inset-0 z-[999] flex h-fit items-center justify-center overflow-hidden bg-black bg-opacity-20 pt-20 sm:mx-0 sm:h-auto"
    @click.self="showRules(false)"
  >
    <div class="rounded-[4.8px] bg-sand-100 sm:bg-white sm:shadow">
      <div
        class="flex items-center justify-center gap-2 border-b-sand-200 p-4 pt-8 sm:justify-between sm:pt-4"
      >
        <h3 class="my-0 text-xl text-primary">申請作家身份流程</h3>
        <Icon
          name="mdi:close-thick"
          size="24"
          class="absolute right-4 top-0 cursor-pointer text-primary sm:static"
          @click="showRules(false)"
        />
      </div>
      <div class="h-[1px] w-full bg-secondary"></div>
      <div class="m-4 text-primary-dark">
        <ol class="list-decimal pl-4 leading-9 tracking-[0.48px]">
          <li>
            成為會員
            <ul class="mb-3 list-disc pl-6">
              <li>提供必要的個人資料，包括姓名、電子郵件地址和密碼。</li>
              <li>完成註冊程序，建立您的使用者帳戶。</li>
            </ul>
          </li>
          <li>
            登入帳號，進入會員設定頁面
            <ul class="mb-3 list-disc pl-6">
              <li>在個人設定選項中，選擇成為作家。</li>
            </ul>
          </li>
          <li>
            完成基本資料後送出審核
            <ul class="mb-3 list-disc pl-6">
              <li>在成為作家身份選項中，填寫您的基本資料、寫作經驗等。</li>
              <li>確保提供的資料是正確和完整的。</li>
              <li>上傳您的作品供審核參考。</li>
            </ul>
          </li>
          <li>
            等待審核通知
            <ul class="mb-3 list-disc pl-6">
              <li>審核流程可能需要一段時間，請耐心等待。</li>
              <li>您將在審核結果出爐後收到通知，通常是透過電子郵件或使用者帳戶的訊息系統。</li>
              <li>如果您的申請被接受，您將獲得作家身份，並能夠開始寫作！</li>
              <li>如果您的申請被拒絕，您將收到相關說明或建議，以幫助您提升作家身份的申請。</li>
            </ul>
          </li>
        </ol>
        <p>感謝您的理解和耐心等待。</p>
        <p>如果您有任何疑問或需要進一步的協助，請隨時聯繫我們的客服團隊。</p>
        <span class="my-4 block sm:mt-4">其餘規定請參閱板規，若有疑問請聯絡平台。</span>
      </div>
      <div class="flex justify-end gap-2 border-t border-secondary p-4">
        <button
          class="rounded px-3 py-2 text-secondary duration-100 hover:bg-secondary hover:text-white"
          @click="showRules(false)"
        >
          先不要
        </button>
        <button
          class="rounded px-3 py-2 text-secondary duration-100 hover:bg-secondary hover:text-white"
        >
          <NuxtLink to="/signup">開始註冊</NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>
