<script setup lang="ts"></script>
<template>
  <section class="container flex items-center justify-center py-[100px]">
    <div class="flex h-[700px] w-full">
      <div class="w-1/2 bg-[#CDCDCD]"></div>
      <div class="flex w-1/2 flex-col justify-center border border-[#D9D9D9] px-28 3xl:px-[180px]">
        <h2 class="py-2 text-[24px] font-bold">重設密碼</h2>

        <form action="" class="w-full">
          <p class="mt-4 text-[16px]">新密碼 :</p>

          <div class="relative mt-2">
            <input
              type="password"
              placeholder="name@example.com"
              class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
            />
            <!-- <Icon
              name="ic:outline-remove-red-eye"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
            /> -->
            <Icon
              name="material-symbols:visibility-off-outline"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
            />
          </div>
          <div class="mt-[10px] flex items-center">
            <Icon name="mdi:alert-circle-outline" size="15" class="left-3 text-[#6B6B6B]" />
            <p class="ml-1 text-[14px]">密碼不得少於6個字元</p>
          </div>

          <p class="mt-6 text-[16px]">重新輸入新密碼 :</p>
          <div class="relative mt-2">
            <input
              type="password"
              placeholder="name@example.com"
              class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
            />
            <!-- <Icon
              name="ic:outline-remove-red-eye"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
            /> -->
            <Icon
              name="material-symbols:visibility-off-outline"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
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
