<script setup lang="ts">
const emits = defineEmits(['post-rules'])
const showRules = (value: boolean) => {
  emits('post-rules', value)
}
</script>
<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20 pt-20 sm:mx-0 sm:h-auto"
    @click.self="showRules(false)"
  >
    <div class="rounded-[4.8px] bg-sand-100 p-4 sm:bg-white sm:shadow">
      <div
        class="flex items-center justify-center gap-2 border-b-sand-200 p-4 pt-8 sm:justify-between sm:border-b sm:pt-4"
      >
        <h2 class="my-0 text-xl text-primary">與小島的發文留言小約定</h2>
        <Icon
          name="mdi:close-thick"
          size="24"
          class="absolute right-4 top-0 cursor-pointer text-primary sm:static"
          @click="showRules(false)"
        />
      </div>
      <p class="leading-9 tracking-[0.48px]">
        一、禁止使用不雅字眼、中傷、歧視、挑釁或謾罵他人。<br />
        二、禁止作者進行惡意行為，包括網絡釣魚、垃圾郵件、發佈惡意軟體或連結等。<br />
        三、文章內文字數需多於 50 個繁體中文字。<br />
        四、不要在網站上分享侵犯他人版權的內容。<br />
        五、請設定<span class="font-bold">「文章分類」</span>，讓更多人與你產生共鳴！<br />
        六、自動擷取前 30 個文字作為摘要(自行輸入)。<br />
        七、作者需對其在網站上發布的內容負有責任，並且平台不對內容的準確性或可靠性承擔責任。<br />
      </p>
      <span class="my-10 block sm:mt-4">其餘規定請參閱板規，若有疑問請聯絡平台。</span>
      <div class="flex justify-center p-4">
        <button
          class="rounded bg-secondary p-[7px] text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="showRules(false)"
        >
          我瞭解了
        </button>
      </div>
    </div>
  </div>
</template>
