<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
</script>
<template>
  <div class="mx-5">
    <div class="mb-2 flex items-center justify-center gap-2 px-4">
      <div class="h-[44px] w-[44px] overflow-hidden rounded-full">
        <img :src="userData.avatar" alt="user" />
      </div>
      <p>{{ userData.name }}</p>
    </div>
    <ul class="whitespace-nowrap">
      <li class="px-4">
        <NuxtLink to="/account/profile" class="block w-full px-6 py-3 hover:bg-gray-200">
          <div class="flex items-center">
            <Icon name="material-symbols:manage-accounts-outline-rounded" size="24" class="mr-2" />
            <span>會員設定</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink to="/account/collection" class="block w-full px-6 py-3 hover:bg-gray-200">
          <div class="flex items-center">
            <Icon name="material-symbols:bookmark-outline" size="24" class="mr-2" />
            <span>我的收藏</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink to="/account/following" class="block w-full px-6 py-3 hover:bg-gray-200">
          <div class="flex items-center">
            <Icon name="ic:round-rss-feed" size="24" class="mr-2" />
            <span>我的追蹤</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink to="/account/messages" class="block w-full px-6 py-3 hover:bg-gray-200">
          <div class="flex items-center">
            <Icon name="ic:baseline-mail-outline" size="24" class="mr-2" />
            <span>我的訊息</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <div class="flex w-full cursor-pointer items-center px-6 py-3 hover:bg-gray-200">
          <Icon name="material-symbols:clarify-outline" size="24" class="mr-2" />
          <div class="flex items-center">
            <span>我的文章</span>
            <Icon name="ic:outline-expand-more" size="24" />
          </div>
        </div>
        <ul class="flex flex-col items-center">
          <li class="w-full">
            <NuxtLink to="/" class="block px-6 py-3 hover:bg-gray-200">
              <div class="flex items-center">
                <span class="ml-2 mr-4 block h-1 w-1 rounded-full bg-slate-600"></span> 文章列表
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink to="/" class="block px-6 py-3 hover:bg-gray-200">
              <div class="flex items-center">
                <span class="ml-2 mr-4 block h-1 w-1 rounded-full bg-slate-600"></span> 審核進度
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink to="/" class="block px-6 py-3 hover:bg-gray-200">
              <div class="flex items-center">
                <span class="ml-2 mr-4 block h-1 w-1 rounded-full bg-slate-600"></span> 我的草稿
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink to="/" class="block px-6 py-3 hover:bg-gray-200">
              <div class="flex items-center">
                <Icon name="material-symbols:bar-chart" size="24" class="mr-2" />
                <span>後台數據</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="px-4">
        <NuxtLink to="/account/myplan" class="block w-full px-6 py-3 hover:bg-gray-200">
          <div class="flex items-center">
            <Icon name="ic:baseline-done-all" size="24" class="mr-2" />
            <span>訂閱管理</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink to="/account/pastorders" class="block w-full px-6 py-3 hover:bg-gray-200">
          <div class="flex items-center">
            <Icon name="ic:outline-receipt" size="24" class="mr-2" />
            <span>歷史訂單</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
