<script setup lang="ts">
const emits = defineEmits(['close-video'])
const closeVideo = (value: boolean) => {
  emits('close-video', value)
}
</script>
<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="closeVideo(false)"
  >
    <video class="px-2 sm:w-1/2 sm:px-0" autoplay loop>
      <source src="~/assets/chatvideo/dog.mp4" type="video/mp4" />
    </video>
  </div>
</template>
