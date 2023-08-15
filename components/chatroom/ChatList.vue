<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'

const { characters } = storeToRefs(useChatCharacters())
</script>

<template>
  <section class="animate-fadein container pb-44 pt-14">
    <h2 class="mb-12 text-center text-4xl font-medium text-primary">想要和誰聊天呢？</h2>
    <ul class="grid grid-cols-12 justify-center gap-6">
      <li v-for="c in characters" :key="c.id" class="col-span-full md:col-span-6 lg:col-span-3">
        <CharacterCard :c="c" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fadein {
  animation-name: fadein;
  animation-duration: 0.6s;
  animation-fill-mode: both;
}
</style>
