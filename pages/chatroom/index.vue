<script setup></script>

<template>
  <main class="bg-sand-100">
    <section class="container pt-20">
      <h2 class="mb-20 text-center text-3xl font-bold text-primary">
        不知道找誰聊天嗎？不如先來個小測驗吧！
      </h2>
      <ul class="flex h-[50vh] justify-center gap-10">
        <li class="text-2xl">
          <NuxtLink to="/chatroom/questions" class="rounded-md bg-sand-300 p-2 text-primary"
            >開始測驗</NuxtLink
          >
        </li>
        <li class="text-2xl">
          <NuxtLink to="/chatroom/characters" class="rounded-md bg-sand-300 p-2 text-primary"
            >所有角色</NuxtLink
          >
        </li>
      </ul>
    </section>
  </main>
</template>
