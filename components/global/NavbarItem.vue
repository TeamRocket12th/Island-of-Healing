<script setup lang="ts">
const showCategory = ref(false)
const toggleshowCategory = () => {
  showCategory.value = !showCategory.value
}
</script>

<template>
  <header class="bg-[#CDCDCD]">
    <div class="container">
      <nav class="relative flex h-16 items-center justify-between">
        <h1 class="text-2xl font-bold"><NuxtLink to="/">小島聊癒所</NuxtLink></h1>
        <ul class="flex gap-6 text-xl font-medium">
          <li>
            <button @click="toggleshowCategory">
              精選文章 <Icon name="ic:round-arrow-drop-down" size="24" />
            </button>
            <ul
              v-if="showCategory"
              class="absolute top-full z-10 w-36 whitespace-nowrap border border-[#CDCDCD] bg-white font-normal"
            >
              <li>
                <RouterLink to="/" class="block w-full border-b border-[#CDCDCD] p-[10px]"
                  >個人成長</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/" class="block w-full border-b border-[#CDCDCD] p-[10px]"
                  >情緒覺察</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/" class="block w-full border-b border-[#CDCDCD] p-[10px]"
                  >親密關係</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/" class="block w-full p-[10px]">日常練習</RouterLink>
              </li>
            </ul>
          </li>
          <li><NuxtLink to="/">AI告解室</NuxtLink></li>
          <li><NuxtLink to="/">留言板</NuxtLink></li>
          <li><NuxtLink to="/account/myplan">訂閱方案</NuxtLink></li>
          <li><NuxtLink to="/login">登入</NuxtLink></li>
          <li><NuxtLink to="/signup">註冊</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
