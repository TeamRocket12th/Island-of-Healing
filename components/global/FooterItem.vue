<script setup lang="ts"></script>

<template>
  <footer class="bg-secondary text-sand-100">
    <div class="container grid h-[308px] grid-cols-12 py-[92px]">
      <di v class="col-span-5 border-r border-gray-500 py-7 pr-12">
        <h2 class="mb-4 font-serif-tc text-4xl font-bold">小島聊癒所</h2>
        <p class="font-light">
          「小島聊癒所」陪伴人們認識自己的情緒，傾聽內在的聲音，<br />
          希望透過閱讀我們的文章，在遇到困境時找到一點方向與慰藉。
        </p>
      </di>
      <div class="col-span-4 col-start-9 py-7 pl-7">
        <ul class="mb-6 flex gap-11">
          <li class="font-serif-tc text-sm font-medium leading-normal">
            <NuxtLink to="/"><p>精選文章</p></NuxtLink>
          </li>
          <li class="font-serif-tc text-sm font-medium leading-normal">
            <NuxtLink to="/chatroom"><p>AI 告解室</p></NuxtLink>
          </li>
          <li class="font-serif-tc text-sm font-medium leading-normal">
            <NuxtLink to="/"><p>論壇</p></NuxtLink>
          </li>
          <li class="font-serif-tc text-sm font-medium leading-normal">
            <NuxtLink to="/plans"><p>訂閱方案</p></NuxtLink>
          </li>
        </ul>
        <div class="flex items-center gap-5">
          <div class="h-[0.5px] w-[139px] bg-sand-100"></div>
          <p class="font-serif-tc text-sm font-semibold">Follow</p>
          <span class="rounded-full bg-sand-100 p-[6px]">
            <NuxtLink to="/">
              <Icon name="bi:facebook" size="28" class="text-secondary"
            /></NuxtLink>
          </span>
          <span class="rounded-full bg-sand-100 p-[6px]">
            <NuxtLink to="/"> <Icon name="bi:youtube" size="28" class="text-secondary" /></NuxtLink>
          </span>
          <span class="rounded-full bg-sand-100 p-[6px]">
            <NuxtLink to="/">
              <Icon name="bi:instagram" size="28" class="text-secondary"
            /></NuxtLink>
          </span>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <span class="text-sand-100">Copyright © 2023 小島工作室</span>
    </div>
  </footer>
</template>

<style scoped></style>
