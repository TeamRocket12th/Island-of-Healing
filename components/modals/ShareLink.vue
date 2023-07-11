<script setup lang="ts">
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
})
const route = useRoute()
const url = route.fullPath
const lineShareUrl = `http://localhost:3000${url}`

const emits = defineEmits(['close-modal'])

const closeModal = (value: boolean) => {
  emits('close-modal', value)
}

const showSuccessMsg = ref(false)

const copyUrl = () => {
  navigator.clipboard.writeText(url)
  showSuccessMsg.value = true
  setTimeout(() => {
    showSuccessMsg.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="closeModal(false)"
  >
    <div class="modal-box h-[234px] w-[518px] rounded">
      <button
        class="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"
        @click="closeModal(false)"
      >
        ✕
      </button>
      <h3 class="mb-6 text-xl font-bold text-primary">分享</h3>
      <div class="relative flex justify-between">
        <ul class="mb-6 flex gap-7">
          <li class="flex cursor-pointer flex-col items-center justify-between">
            <!-- ${url}前面要放部屬的網址  -->
            <NuxtLink :to="`https://www.facebook.com/sharer.php?u=${url}`" target="_blank">
              <img
                src="~/assets/images/sharelink/facebook.svg"
                alt="Facebook分享按鈕"
                class="mb-1 h-[44px] w-[44px]"
              />
            </NuxtLink>
            <p class="text-xs">Facebook</p>
          </li>
          <li class="flex cursor-pointer flex-col items-center justify-between">
            <!-- ${url}前面要放部屬的網址  -->
            <NuxtLink :to="`https://twitter.com/intent/tweet?url=${url}`" target="_blank">
              <img
                src="~/assets/images/sharelink/twitter.svg"
                alt="Twitter分享按鈕"
                class="mb-1 h-[44px] w-[44px]"
              />
            </NuxtLink>
            <p class="text-xs">Twitter</p>
          </li>
          <li class="flex cursor-pointer flex-col items-center justify-between">
            <NuxtLink
              :to="`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                lineShareUrl
              )}`"
              target="_blank"
            >
              <img
                src="~/assets/images/sharelink/line.svg"
                alt="Line分享按鈕"
                class="mb-1 mt-[3px] h-[38px] w-[38px]"
              />
            </NuxtLink>
            <p class="text-xs">Line</p>
          </li>
        </ul>
        <div
          v-if="showSuccessMsg"
          class="absolute bottom-5 right-0 mt-2 h-8 rounded bg-sand-100 px-4 py-2 text-sm text-primary"
        >
          已複製到剪貼板
        </div>
      </div>
      <div class="flex h-10 gap-2">
        <input
          type="text"
          class="w-full cursor-pointer rounded border border-secondary px-2 hover:border-2"
          :value="url"
          readonly
          @click="copyUrl"
        />
        <button
          type="button"
          class="btn-sm btn h-10 rounded bg-secondary px-6 py-2 font-normal text-white hover:bg-slate-600"
          @click="copyUrl"
        >
          複製
        </button>
      </div>
    </div>
  </div>
</template>
