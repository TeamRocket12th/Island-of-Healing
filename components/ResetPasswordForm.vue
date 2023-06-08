<script setup lang="ts"></script>
<template>
  <section class="flex items-center justify-center px-[300px] py-[100px] 3xl:p-[300px]">
    <div class="flex h-[700px] w-[1320px]">
      <div class="w-[660px] bg-[#CDCDCD]"></div>
      <div class="flex w-[660px] flex-col justify-center border border-[#D9D9D9] px-[180px]">
        <h2 class="py-2 text-[24px] font-bold">重設密碼</h2>

        <form action="" class="w-full">
          <p class="mt-4 text-[16px]">新密碼 :</p>
          <div class="form-control w-full max-w-xs">
            <div class="relative mt-2">
              <input
                type="email"
                placeholder="name@example.com"
                class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
              />
            </div>
            <div class="mt-[10px] flex items-center">
              <Icon name="mdi:alert-circle-outline" size="15" class="left-3 text-[#6B6B6B]" />
              <p class="ml-1 text-[14px]">密碼不得少於6個字元</p>
            </div>
          </div>
          <p class="mt-6 text-[16px]">重新輸入新密碼 :</p>
          <div class="relative mt-2">
            <input
              type="email"
              placeholder="name@example.com"
              class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
            />
          </div>
          <div class="relative mt-4">
            <button
              class="btn w-full rounded bg-[#9F9F9F] text-[16px] font-bold text-white hover:bg-slate-600"
            >
              儲存變更及登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
