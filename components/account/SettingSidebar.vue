<script setup lang="ts"></script>
<template>
  <div class="mx-5">
    <div class="mb-2 flex items-center gap-2 px-8">
      <div class="h-[44px] w-[44px] overflow-hidden rounded-full">
        <img src="https://picsum.photos/44" alt="user" />
      </div>
      <p class="text-xl">bendada</p>
    </div>
    <ul>
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
