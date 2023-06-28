<script setup lang="ts">
const emits = defineEmits(['post-rules'])
const rulesShow = (value) => {
  emits('post-rules', value)
}
</script>
<template>
  <div
    class="absolute left-1/2 top-2/3 h-[500px] w-[775px] -translate-x-1/2 -translate-y-1/2 rounded-[4.8px] bg-white shadow"
  >
    <div
      class="flex items-center justify-between gap-2 border-b border-b-sand-200 p-4"
      @click="rulesShow(false)"
    >
      <h2 class="my-0 text-xl text-primary">與小島的發文留言小約定</h2>
      <Icon name="mdi:close-thick" size="24" class="cursor-pointer" />
    </div>
    <div class="mb-9 p-4">
      <p class="leading-9 tracking-[0.48px]">
        一、禁止使用不雅字眼、中傷、歧視、挑釁或謾罵他人。<br />
        二、禁止作者進行惡意行為，包括網絡釣魚、垃圾郵件、發佈惡意軟體或連結等。<br />
        三、文章內文字數需多於 50 個繁體中文字。<br />
        四、不要在網站上分享侵犯他人版權的內容。<br />
        五、請設定「文章分類」，讓更多人與你產生共鳴！<br />
        六、自動擷取前 30 個文字作為摘要(自行輸入)。<br />
        七、作者需對其在網站上發布的內容負有責任，並且平台不對內容的準確性或可靠性承擔責任。<br />
      </p>
      <span class="mt-4 block">其餘規定請參閱板規，若有疑問請聯絡平台。</span>
    </div>
    <div class="flex justify-center p-4">
      <button class="rounded bg-secondary p-[7px] text-white" @click="rulesShow(false)">
        我瞭解了
      </button>
    </div>
  </div>
</template>
