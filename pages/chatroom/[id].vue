<script setup lang="ts">
import { useChatCharacters } from '~/stores/characters'

const { selectCharacterId } = useChatCharacters()
const { id } = useRoute().params
selectCharacterId(id as string)
</script>

<template>
  <main>
    <ChatWindow />
  </main>
</template>
