<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'

const { characters } = storeToRefs(useChatCharacters())
</script>

<template>
  <section class="container pb-24 pt-14">
    <h2 class="mb-12 text-center text-4xl">想要和誰聊天呢？</h2>
    <ul class="grid grid-cols-12 justify-center gap-6">
      <li v-for="c in characters" :key="c.id" class="col-span-full lg:col-span-4">
        <CharacterCard :c="c" />
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
