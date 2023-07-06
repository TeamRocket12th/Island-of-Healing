<script setup lang="ts">
const emits = defineEmits(['plan-cancel', 'cancel-check'])
const cancelPlan = (value: boolean) => {
  emits('plan-cancel', value)
}
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="cancelPlan(false)"
  >
    <div class="h-[210px] w-[500px] rounded bg-white shadow">
      <div class="flex items-center justify-between gap-2 p-4">
        <h2 class="text-xl text-primary">確定要取消訂閱？</h2>
        <div class="flex justify-end">
          <button class="border-primary text-primary" @click="cancelPlan(false)">
            <Icon name="mdi:close-thick" size="24" class="cursor-pointer text-secondary" />
          </button>
        </div>
      </div>
      <p class="border-b border-t border-sand-200 p-4 text-primary-dark">
        確認取消後，系統將終止下次扣款日起的自動扣款，您在閱讀權限到期日 2023/07/04 前仍可暢讀使用。
      </p>
      <div class="flex justify-end gap-2 p-3">
        <button
          class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
          @click="cancelPlan(false)"
        >
          繼續訂閱
        </button>
        <button
          class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
        >
          取消方案
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
