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
  <header>
    <nav class="bg-secondary">
      <div class="container flex h-14 items-center justify-between">
        <p class="font-serif-tc font-medium text-sand-100">提供心靈療癒的庇護所</p>
        <ul class="flex items-center gap-6">
          <li v-if="!isLogin">
            <NuxtLink to="/login" class="font-serif-tc font-bold text-sand-100">登入</NuxtLink>
          </li>
          <li v-if="!isLogin">
            <NuxtLink
              to="/signup"
              class="rounded bg-sand-100 px-2 py-1 font-serif-tc font-bold text-primary"
              >註冊</NuxtLink
            >
          </li>
          <li v-if="isLogin">
            <div class="dropdown-end dropdown">
              <label tabindex="0" class="btn-ghost btn-circle avatar btn flex w-20 items-center">
                <div class="h-9 w-9 overflow-hidden rounded-full">
                  <img :src="userData.avatar" />
                </div>
                <span class="block">
                  <Icon name="ic:outline-arrow-drop-down" size="24" class="text-sand-100"
                /></span>
              </label>

              <ul
                tabindex="0"
                class="dropdown-content menu rounded-box relative top-[105%] z-10 w-52 bg-base-100 p-2 font-serif-tc text-base shadow"
              >
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink :to="`/account/${userData.id}/profile`" class="font-medium">
                    <Icon
                      name="material-symbols:manage-accounts-outline-rounded"
                      size="24"
                      class="mr-2"
                    />
                    <span>會員設定</span>
                  </NuxtLink>
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink :to="`/account/${userData.id}/collection`" class="font-medium">
                    <Icon name="material-symbols:bookmark-outline" size="24" class="mr-2" />
                    <span>我的收藏</span>
                  </NuxtLink>
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink :to="`/account/${userData.id}/following`" class="font-medium">
                    <Icon name="ic:round-rss-feed" size="24" class="mr-2" />
                    <span>我的追蹤</span></NuxtLink
                  >
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink :to="`/account/${userData.id}/messages`" class="font-medium">
                    <Icon name="ic:baseline-mail-outline" size="24" class="mr-2" />
                    <span>我的訊息</span>
                  </NuxtLink>
                </li>
                <li v-if="userData.role === 'writer'" class="hover:bg-secondary">
                  <NuxtLink :to="`/account/${userData.id}/mywork`" class="font-medium text-sand-100"
                    >我的文章</NuxtLink
                  >
                </li>
                <li class="text-primary">
                  <NuxtLink
                    :to="`/account/${userData.id}/pastorders`"
                    class="font-medium hover:bg-secondary hover:text-sand-100"
                  >
                    <Icon name="ic:outline-receipt" size="24" class="mr-2" />
                    <span>歷史訂單</span>
                  </NuxtLink>
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <button class="flex items-center" @click="userLogout">
                    <Icon name="ic:outline-logout" size="24" class="mr-2" />
                    <span class="font-medium">登出</span>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="relative h-[142px] bg-sand-100 py-5">
      <div class="container">
        <h1 class="mb-3 text-center">
          <NuxtLink to="/" class="font-serif-tc text-4xl-plus font-bold text-primary"
            >小島聊癒所</NuxtLink
          >
        </h1>
        <ul class="flex items-center justify-center gap-4 font-serif-tc">
          <li class="text-xl font-semibold leading-normal text-primary">
            <button @click="toggleshowCategory">精選文章</button>
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
          <span class="flex items-center font-serif-tc text-xl font-semibold">·</span>
          <li>
            <NuxtLink to="/chatroom" class="text-xl font-semibold leading-normal text-primary"
              >AI告解室</NuxtLink
            >
          </li>
          <span class="flex items-center font-serif-tc text-xl font-semibold">·</span>
          <li>
            <NuxtLink to="/" class="text-xl font-semibold text-primary" leading-normal
              >論壇</NuxtLink
            >
          </li>
          <span class="flex items-center font-serif-tc text-xl font-semibold">·</span>
          <li>
            <NuxtLink to="/plans" class="text-xl font-semibold leading-normal text-primary"
              >訂閱方案</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
