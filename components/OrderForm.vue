<script setup lang="ts">
const plan = {
  name: '月付讀到飽專案',
  price: 120
}
const emits = defineEmits(['custom-order'])
const sentOrder = (value: boolean) => {
  emits('custom-order', value)
}
</script>

<template>
  <section class="container grid grid-cols-12 border border-primary bg-white px-10 pb-14 pt-10">
    <div class="col-span-7 mr-6 pb-[204px]">
      <h2 class="mb-10 font-serif-tc text-2xl font-bold text-primary">顧客資料</h2>
      <form class="rounded border-[0.5px] border-secondary px-6 py-[26px]">
        <div>
          <label for="name" class="mb-2 block text-primary-dark">顧客名稱:</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            class="mb-5 block w-full rounded border border-secondary px-3 py-2"
          />
        </div>
        <div>
          <label for="email" class="mb-2 block text-primary-dark">電子郵件:</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            class="mb-5 block w-full rounded border border-secondary px-3 py-2"
          />
        </div>
        <div>
          <label for="phone" class="mb-2 block text-primary-dark">電話號碼:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            class="block w-full rounded border border-secondary px-3 py-2"
          />
        </div>
      </form>
    </div>
    <div class="col-span-5 rounded border-[0.5px] border-secondary pl-6 pr-6">
      <div class="mb-11 pt-6">
        <p
          class="mb-4 border-b-[0.5px] border-primary pb-6 font-serif-tc text-2xl font-bold text-primary"
        >
          訂單明細
        </p>
        <p class="mb-6 text-xl font-medium text-primary-dark">{{ plan.name }}</p>
        <div class="mb-16 flex items-center justify-between">
          <span class="font-medium text-primary-dark">TW ${{ plan.price }}</span>
          <span class="font-light text-primary-dark">售價</span>
        </div>
        <span
          class="block border-b-[0.5px] border-primary pb-6 text-right text-xl font-bold text-primary-dark"
          >TW ${{ plan.price }}</span
        >
      </div>
      <div class="px-16">
        <button
          type="button"
          class="block w-full rounded border bg-secondary px-3 py-2 text-white"
          @click="sentOrder(true)"
        >
          同意並送出
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
