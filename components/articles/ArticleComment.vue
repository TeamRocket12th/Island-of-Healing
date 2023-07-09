<script setup lang="ts">
defineProps({
  comments: {
    type: Array as () => Comment[],
    required: true
  }
})
</script>
<template>
  <ul class="mb-4">
    <li v-for="comment in comments" :key="comment.CommentId" class="mb-6 flex">
      <div class="mr-3 mt-3 h-9 w-9 sm:mt-0">
        <img :src="comment.ImgUrl" alt="user" class="h-full w-full rounded-full" />
      </div>
      <div class="w-full">
        <p class="mb-1 font-medium text-primary">{{ comment.NickName }}</p>
        <div class="items-center justify-between gap-2 md:flex">
          <p class="mb-2 w-4/5 font-light text-primary-dark md:mb-0">
            {{ comment.Comment }}
          </p>
          <span class="font-sm justify-self-end whitespace-nowrap font-light text-[#3D1F03]">{{
            useFormattedTime(comment.Initdate)
          }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
