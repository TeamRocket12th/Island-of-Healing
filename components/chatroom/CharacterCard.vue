<script setup lang="ts">
defineProps({
  c: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="card h-full w-full bg-zinc-100 shadow-xl">
    <figure class="px-10 pt-10">
      <img :src="c.imgUrl" alt="chat-role" class="h-36 rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ c.name }}</h2>
      <p class="mb-4">{{ c.desc }}</p>
      <div class="card-actions">
        <NuxtLink :to="`/chatroom/${c.id}`">
          <button class="btn-md btn bg-zinc-300">進入聊天室</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
