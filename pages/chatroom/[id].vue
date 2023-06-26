<script setup lang="ts">
import { useChatCharacters } from '~/stores/characters'

const { selectCharacterId } = useChatCharacters()
const { id } = useRoute().params
selectCharacterId(id as string)
</script>

<template>
  <main class="bg-sand-100 pb-20">
    <ChatWindow />
  </main>
</template>
