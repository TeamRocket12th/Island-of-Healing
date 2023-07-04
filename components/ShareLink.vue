<script setup lang="ts">
const route = useRoute()
const url = route.fullPath

const copyUrl = () => {
  const input = url
  navigator.clipboard
    .writeText(input)
    .then(() => {
      const successMessage = document.getElementById('successMessage')
      successMessage.classList.remove('hidden')
      setTimeout(() => {
        successMessage.classList.add('hidden')
      }, 2000) // 顯示2秒後隱藏
    })
    .catch((error) => {
      console.error('複製URL時發生錯誤: ', error)
    })
}
</script>

<template>
  <!-- You can open the modal using ID.showModal() method -->

  <dialog id="my_modal_3" class="modal">
    <form method="dialog" class="modal-box h-[234px] w-[518px] cursor-default rounded">
      <button class="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">✕</button>
      <h3 class="mb-6 text-xl font-bold text-primary">分享</h3>
      <div class="relative flex justify-between">
        <ul class="mb-6 flex gap-7">
          <li class="flex cursor-pointer flex-col items-center justify-between">
            <!-- ${url}前面要放部屬的網址  -->
            <NuxtLink :to="`https://www.facebook.com/sharer.php?u=${url}`">
              <img src="~/assets/images/facebook.svg" alt="" class="mb-1 h-[44px] w-[44px]" />
            </NuxtLink>
            <p class="text-xs">Facebook</p>
          </li>
          <li class="flex cursor-pointer flex-col items-center justify-between">
            <!-- ${url}前面要放部屬的網址  -->
            <NuxtLink :to="`https://twitter.com/intent/tweet?url=${url}`">
              <img src="~/assets/images/twitter.svg" alt="" class="mb-1 h-[44px] w-[44px]" />
            </NuxtLink>
            <p class="text-xs">Twitter</p>
          </li>
          <li class="flex cursor-pointer flex-col items-center justify-between">
            <img src="~/assets/images/line.svg" alt="" class="mb-1 mt-[3px] h-[38px] w-[38px]" />
            <p class="text-xs">Line</p>
          </li>
        </ul>
        <div
          id="successMessage"
          class="absolute bottom-2 right-0 mt-2 hidden rounded bg-sand-100 p-2 px-4 text-sm text-primary"
        >
          已複製到剪貼板
        </div>
      </div>
      <div class="flex h-10 gap-2">
        <input
          ref="urlInput"
          type="text"
          class="w-full cursor-pointer rounded border border-secondary px-2 hover:border-2"
          :value="url"
          readonly
          @click="copyUrl"
        />
        <div
          class="btn-sm btn h-10 rounded bg-secondary px-6 py-2 font-normal text-white hover:bg-slate-600"
          @click="copyUrl"
        >
          複製
        </div>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped></style>
