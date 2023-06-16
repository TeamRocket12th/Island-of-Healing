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
  <section
    class="container mb-28 mt-[60px] grid grid-cols-12 rounded-lg border border-[#D9D9D9] px-10 pb-14 pt-10"
  >
    <div class="col-span-7 mr-6 rounded-lg pb-14">
      <h2 class="mb-10 text-2xl font-bold">顧客資料</h2>
      <form class="border border-[#D9D9D9] p-6">
        <div>
          <label for="name" class="mb-2 block">顧客名稱:</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            class="mb-2 block w-full rounded border border-[#D9D9D9] px-3 py-2"
          />
        </div>
        <div>
          <label for="email" class="mb-2 block">電子郵件:</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            class="mb-2 block w-full rounded border border-[#D9D9D9] px-3 py-2"
          />
        </div>
        <div>
          <label for="phone" class="mb-2 block">電話號碼:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            class="mb-2 block w-full rounded border border-[#D9D9D9] px-3 py-2"
          />
        </div>
      </form>
    </div>
    <div class="col-span-5 rounded-lg border border-[#D9D9D9] pl-10">
      <div class="mb-9 pt-6">
        <p class="mb-4 border-b border-[#D9D9D9] pb-6 text-2xl font-medium">訂單明細</p>
        <p class="mb-[52px] text-2xl font-bold">{{ plan.name }}</p>
        <div class="mb-4 flex items-center justify-between pr-6">
          <span class="text-2xl">TW ${{ plan.price }}</span>
          <span class="text-2xl">售價</span>
        </div>
        <span class="block border-b border-[#D9D9D9] pb-4 pr-6 text-right text-[32px] font-bold"
          >TW ${{ plan.price }}</span
        >
      </div>
      <div class="mb-[200px] px-16">
        <button
          type="button"
          class="block w-full rounded-[4px] bg-[#C1C1C1] py-3 text-white hover:bg-slate-400"
          @click="sentOrder(true)"
        >
          同意並送出
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
