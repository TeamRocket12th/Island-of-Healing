<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useUIStore } from '~/stores/ui'

const userStore = useUserStore()
const uiStore = useUIStore()
const { userData } = storeToRefs(userStore)
const { isWriterExpanded } = storeToRefs(uiStore)
const { toggleWriterSettings } = uiStore
</script>

<template>
  <aside class="mx-5 3xl:absolute 3xl:left-0 3xl:z-10">
    <div class="mb-2 flex items-center justify-center gap-2 px-4">
      <div class="h-[44px] w-[44px] overflow-hidden rounded-full">
        <img :src="userData.avatar" alt="user" />
      </div>
      <p>{{ userData.name }}</p>
    </div>
    <ul class="whitespace-nowrap font-serif-tc font-medium text-primary">
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/profile`"
          class="block w-full px-6 py-3 hover:bg-secondary hover:text-sand-100"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:manage-accounts-outline-rounded" size="24" class="mr-2" />
            <p>會員設定</p>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/collection`"
          class="block w-full px-6 py-3 hover:bg-secondary hover:text-sand-100"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:bookmark-outline" size="24" class="mr-2" />
            <p>我的收藏</p>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/following`"
          class="block w-full px-6 py-3 hover:bg-secondary hover:text-sand-100"
        >
          <div class="flex items-center">
            <Icon name="ic:round-rss-feed" size="24" class="mr-2" />
            <p>我的追蹤</p>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/messages`"
          class="block w-full px-6 py-3 hover:bg-secondary hover:text-sand-100"
        >
          <div class="flex items-center">
            <Icon name="ic:baseline-mail-outline" size="24" class="mr-2" />
            <p>我的訊息</p>
          </div>
        </NuxtLink>
      </li>
      <li v-if="userData.role === 'writer'" class="px-4">
        <div
          class="flex w-full cursor-pointer items-center px-6 py-3 hover:bg-secondary hover:text-sand-100"
          @click="toggleWriterSettings"
        >
          <Icon name="material-symbols:clarify-outline" size="24" class="mr-2" />
          <div class="flex items-center">
            <p>我的文章</p>
            <Icon
              name="ic:outline-expand-more"
              size="24"
              class="duration-200"
              :class="{ 'rotate-180': isWriterExpanded }"
            />
          </div>
        </div>
        <ul
          class="flex flex-col items-center overflow-hidden transition-all duration-500"
          :class="isWriterExpanded ? 'max-h-96' : 'max-h-0'"
        >
          <li class="w-full hover:bg-secondary hover:text-sand-100">
            <NuxtLink :to="`/account/${userData.id}/mywork`" class="block px-6 py-3">
              <div class="flex items-center">
                <Icon name="ph:dot-outline-fill" class="mr-4" />
                文章列表
              </div>
            </NuxtLink>
          </li>
          <li class="w-full hover:bg-secondary hover:text-sand-100">
            <NuxtLink :to="`/account/${userData.id}/progress`" class="block px-6 py-3">
              <div class="flex items-center">
                <Icon name="ph:dot-outline-fill" class="mr-4" />
                審核進度
              </div>
            </NuxtLink>
          </li>
          <li class="w-full hover:bg-secondary hover:text-sand-100">
            <NuxtLink :to="`/account/${userData.id}/drafts`" class="block px-6 py-3">
              <div class="flex items-center">
                <Icon name="ph:dot-outline-fill" class="mr-4" />
                我的草稿
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink
              :to="`/account/${userData.id}/dashboard`"
              class="block px-6 py-3 hover:bg-secondary hover:text-sand-100"
            >
              <div class="flex items-center">
                <Icon name="material-symbols:bar-chart" size="24" class="mr-2" />
                <p>後台數據</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/pastorders`"
          class="block w-full px-6 py-3 hover:bg-secondary hover:text-sand-100"
        >
          <div class="flex items-center">
            <Icon name="ic:outline-receipt" size="24" class="mr-2" />
            <p>歷史訂單</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.router-link-active {
  background-color: #796959;
  color: #faf9f3;
  span {
    background-color: #faf9f3;
  }
}
</style>
