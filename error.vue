<script setup lang="ts">
defineProps(['error'])

const handleClearError = () =>
  clearError({
    redirect: '/'
  })
</script>

<template>
  <main class="h-screen bg-sand-200 px-3 py-10">
    <section class="container flex flex-col items-center justify-center">
      <h1 class="mb-6 text-6xl font-bold text-primary">
        {{ error.statusCode }}
      </h1>
      <p class="mb-6 text-3xl text-primary">{{ error.message }}</p>
      <div class="mb-4">
        <img src="/errorpage.jpg" alt="errorduck" class="block rounded-md" />
      </div>

      <p class="mb-6 text-2xl text-primary">好像發生錯誤了...</p>
      <div>
        <button
          class="btn bg-secondary font-medium tracking-[1.5px] text-sand-100 hover:bg-assistant"
          @click="handleClearError"
        >
          Back
        </button>
      </div>
    </section>
  </main>
</template>
