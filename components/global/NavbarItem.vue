<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isLogin, userData } = storeToRefs(userStore)
const { userLogout } = userStore

const showCategory = ref(false)
const toggleshowCategory = () => {
  showCategory.value = !showCategory.value
}
</script>

<template>
  <header class="bg-[#CDCDCD]">
    <div class="container">
      <nav class="relative flex h-14 items-center justify-between">
        <h1>
          <NuxtLink to="/" class="font-serif-tc text-2xl font-bold">小島聊癒所</NuxtLink>
        </h1>
        <ul class="flex items-center gap-6 text-xl font-medium">
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
          <li><NuxtLink to="/chatroom">AI告解室</NuxtLink></li>
          <li><NuxtLink to="/">留言板</NuxtLink></li>
          <li><NuxtLink to="/plans">訂閱方案</NuxtLink></li>
          <li v-if="isLogin">
            <div class="dropdown-end dropdown">
              <label tabindex="0" class="btn-ghost btn-circle avatar btn">
                <div class="h-9 w-9 rounded-full">
                  <img :src="userData.avatar" />
                </div>
              </label>
              <ul
                tabindex="0"
                class="dropdown-content menu rounded-box relative top-[105%] z-10 w-52 bg-base-100 p-2 text-base shadow"
              >
                <li>
                  <NuxtLink to="/account/profile" class="cursor-pointer">會員設定</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/account/collection" class="cursor-pointer">我的收藏</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/account/following" class="cursor-pointer">我的追蹤</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/account/messages" class="cursor-pointer">我的訊息</NuxtLink>
                </li>
                <li v-if="userData.role === 'writer'">
                  <NuxtLink to="/account/mywork" class="cursor-pointer">我的文章</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/account/myplan" class="cursor-pointer">訂閱管理</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/account/pastorders" class="cursor-pointer">歷史訂單</NuxtLink>
                </li>
                <li>
                  <button type="button" @click="userLogout">登出</button>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="!isLogin"><NuxtLink to="/login">登入</NuxtLink></li>
          <li v-if="!isLogin"><NuxtLink to="/signup">註冊</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
