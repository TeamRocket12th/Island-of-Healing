<script setup lang="ts"></script>
<template>
  <section class="container flex items-center justify-center py-[100px]">
    <div class="flex h-[700px] w-full">
      <div class="w-1/2 bg-[#CDCDCD]"></div>
      <div
        class="flex w-1/2 flex-col items-center justify-center border border-[#D9D9D9] px-28 3xl:px-[180px]"
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
            <!-- <Icon
              name="ic:outline-remove-red-eye"
              size="25"
              class="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer text-[#6B6B6B]"
              onclick="seePassWord"
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
              註冊
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
