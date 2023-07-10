<script setup lang="ts">
import { useChatCharacters } from '~/stores/characters'
definePageMeta({
  layout: 'chatlayout'
})

const { selectCharacterId } = useChatCharacters()
const { id } = useRoute().params
selectCharacterId(id as string)
</script>

<template>
  <main class="pb-20">
    <ChatWindow />
  </main>
</template>
