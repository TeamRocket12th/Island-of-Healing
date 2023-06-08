<script setup lang="ts"></script>
<template>
  <section class="flex items-center justify-center px-[300px] py-[100px] 3xl:p-[300px]">
    <div class="flex h-[700px] w-[1320px]">
      <div class="w-1/2 bg-[#CDCDCD]"></div>
      <div class="flex w-1/2 flex-col justify-center border border-[#D9D9D9] px-[180px]">
        <h2 class="py-2 text-[24px] font-bold">忘記密碼</h2>
        <p class="mt-4">請輸入您常用的電子信箱</p>
        <form action="" class="w-full">
          <div class="form-control w-full max-w-xs">
            <div class="relative mt-2">
              <input
                type="email"
                placeholder="name@example.com"
                class="input-bordered input w-full rounded border-[#BDBDBD] focus:outline-none"
              />
            </div>

            <div class="relative mt-4">
              <NuxtLink to="/resetpassword">
                <button
                  class="btn w-full rounded bg-[#9F9F9F] text-[16px] font-bold text-white hover:bg-slate-600"
                >
                  確定
                </button>
              </NuxtLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
