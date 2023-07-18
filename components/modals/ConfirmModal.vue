<script setup lang="ts">
const emits = defineEmits(['close-confirm'])
const closeConfrim = (value: boolean) => {
  emits('close-confirm', value)
}
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="closeConfrim(false)"
  >
    <div class="h-[210px] w-[500px] rounded bg-white shadow">
      <div class="flex items-center justify-between gap-2 p-4">
        <slot name="header"></slot>

        <div class="flex justify-end">
          <button class="border-primary text-primary" @click="closeConfrim(false)">
            <Icon name="mdi:close-thick" size="24" class="cursor-pointer text-secondary" />
          </button>
        </div>
      </div>

      <slot name="content"></slot>

      <div class="flex justify-end gap-2 p-3">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
