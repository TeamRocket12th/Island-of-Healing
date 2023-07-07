<script setup lang="ts"></script>

<template>
  <footer class="bg-secondary">
    <div
      class="container h-auto pb-8 pt-10 sm:grid sm:h-[308px] sm:grid-cols-2 sm:py-[92px] xl:grid-cols-12"
    >
      <div class="py-10 sm:py-7 sm:pr-12 xl:col-span-5">
        <h2 class="mb-4 font-serif-tc text-4xl font-bold text-sand-100">小島聊癒所</h2>
        <p class="font-light text-sand-100">
          「小島聊癒所」陪伴人們認識自己的情緒，傾聽內在的聲音，<br class="hidden md:block" />
          希望透過閱讀我們的文章，在遇到困境時找到一點方向與慰藉。
        </p>
      </div>
      <div class="sm:py-7 sm:pl-7 xl:col-span-4 xl:col-start-9">
        <ul class="mb-6 flex flex-col sm:flex-row sm:gap-11">
          <li
            class="border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/"><p class="text-sand-100">精選文章</p></NuxtLink>
          </li>
          <li
            class="border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/chatroom"><p class="text-sand-100">AI 告解室</p></NuxtLink>
          </li>
          <li
            class="border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/"><p class="text-sand-100">論壇</p></NuxtLink>
          </li>
          <li
            class="border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/plans"><p class="text-sand-100">訂閱方案</p></NuxtLink>
          </li>
        </ul>
        <div class="items-center gap-5 px-5 sm:flex sm:px-0">
          <div class="hidden h-[0.5px] w-[139px] bg-sand-100 sm:block"></div>
          <p class="mb-5 font-serif-tc text-sm font-semibold text-sand-100 sm:mb-0">Follow</p>
          <div class="flex items-center gap-3">
            <span class="rounded-full bg-sand-100 p-[6px]">
              <NuxtLink to="/">
                <Icon name="bi:facebook" size="28" class="text-secondary"
              /></NuxtLink>
            </span>
            <span class="rounded-full bg-sand-100 p-[6px]">
              <NuxtLink to="/">
                <Icon name="bi:youtube" size="28" class="text-secondary"
              /></NuxtLink>
            </span>
            <span class="rounded-full bg-sand-100 p-[6px]">
              <NuxtLink to="/">
                <Icon name="bi:instagram" size="28" class="text-secondary"
              /></NuxtLink>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-3 text-center">
      <span class="block text-sand-100 sm:py-0">Copyright © 2023 小島工作室</span>
    </div>
  </footer>
</template>

<style scoped></style>
