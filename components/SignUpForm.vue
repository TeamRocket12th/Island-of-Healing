<script setup lang="ts"></script>
<template>
  <section class="flex items-center justify-center px-[300px] py-[100px] 3xl:p-[300px]">
    <div class="flex h-[700px] w-[1320px]">
      <div class="w-1/2 bg-[#CDCDCD]"></div>
      <div
        class="flex w-1/2 flex-col items-center justify-center border border-[#D9D9D9] px-[180px]"
      >
        <div class="tabs flex w-full items-center justify-center font-bold">
          <NuxtLink to="/login" class="tab-bordered tab h-[52px] w-1/2 flex-nowrap py-2 text-[24px]"
            >登入
          </NuxtLink>
          <NuxtLink
            to="/signup"
            class="tab-bordered tab tab-active h-[52px] w-1/2 flex-nowrap py-2 text-[24px]"
            >註冊
          </NuxtLink>
        </div>
        <form action="" class="w-full">
          <div class="form-control w-full max-w-xs">
            <div class="relative mt-4">
              <Icon
                name="mdi:email-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-[#6B6B6B]"
              />
              <input
                type="email"
                placeholder="信箱"
                class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
            </div>

            <div class="relative mt-4">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-[#6B6B6B]"
              />
              <input
                type="password"
                placeholder="密碼"
                class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
            </div>
            <div class="relative mt-4">
              <Icon
                name="mdi:lock-outline"
                size="25"
                class="absolute left-3 top-1/2 translate-y-[-50%] text-[#6B6B6B]"
              />
              <input
                type="password"
                placeholder="再次輸入密碼"
                class="input-bordered input w-full rounded border-[#BDBDBD] pl-12 focus:outline-none"
              />
            </div>
            <div class="relative mt-4">
              <button
                class="btn w-full rounded bg-[#9F9F9F] text-[16px] font-bold text-white hover:bg-slate-600"
              >
                註冊
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
