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
    <ul class="whitespace-nowrap">
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/profile`"
          class="block w-full px-6 py-3 hover:rounded-md hover:bg-gray-200"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:manage-accounts-outline-rounded" size="24" class="mr-2" />
            <span>會員設定</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/collection`"
          class="block w-full px-6 py-3 hover:rounded-md hover:bg-gray-200"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:bookmark-outline" size="24" class="mr-2" />
            <span>我的收藏</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/following`"
          class="block w-full px-6 py-3 hover:rounded-md hover:bg-gray-200"
        >
          <div class="flex items-center">
            <Icon name="ic:round-rss-feed" size="24" class="mr-2" />
            <span>我的追蹤</span>
          </div>
        </NuxtLink>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/messages`"
          class="block w-full px-6 py-3 hover:rounded-md hover:bg-gray-200"
        >
          <div class="flex items-center">
            <Icon name="ic:baseline-mail-outline" size="24" class="mr-2" />
            <span>我的訊息</span>
          </div>
        </NuxtLink>
      </li>
      <li v-if="userData.role === 'writer'" class="px-4">
        <div
          class="flex w-full cursor-pointer items-center px-6 py-3 hover:rounded-md hover:bg-gray-200"
          @click="toggleWriterSettings"
        >
          <Icon name="material-symbols:clarify-outline" size="24" class="mr-2" />
          <div class="flex items-center">
            <span>我的文章</span>
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
          <li class="w-full">
            <NuxtLink
              :to="`/account/${userData.id}/mywork`"
              class="block px-6 py-3 hover:rounded-md hover:bg-gray-200"
            >
              <div class="flex items-center">
                <span class="ml-2 mr-4 block h-1 w-1 rounded-full bg-slate-600"></span> 文章列表
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink
              :to="`/account/${userData.id}/progress`"
              class="block px-6 py-3 hover:rounded-md hover:bg-gray-200"
            >
              <div class="flex items-center">
                <span class="ml-2 mr-4 block h-1 w-1 rounded-full bg-slate-600"></span> 審核進度
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink
              :to="`/account/${userData.id}/drafts`"
              class="block px-6 py-3 hover:rounded-md hover:bg-gray-200"
            >
              <div class="flex items-center">
                <span class="ml-2 mr-4 block h-1 w-1 rounded-full bg-slate-600"></span> 我的草稿
              </div>
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink
              :to="`/account/${userData.id}/dashboard`"
              class="block px-6 py-3 hover:rounded-md hover:bg-gray-200"
            >
              <div class="flex items-center">
                <Icon name="material-symbols:bar-chart" size="24" class="mr-2" />
                <span>後台數據</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="px-4">
        <NuxtLink
          :to="`/account/${userData.id}/pastorders`"
          class="block w-full px-6 py-3 hover:rounded-md hover:bg-gray-200"
        >
          <div class="flex items-center">
            <Icon name="ic:outline-receipt" size="24" class="mr-2" />
            <span>歷史訂單</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.accordion-enter-active {
  transition: height 0.3s ease-in-out;
}
.accordion-leave-active {
  transition: height 0.3s ease-in-out;
}
.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  height: auto;
}

.router-link-active {
  background-color: #d9d9d9;
  border-radius: 6px;
}
</style>
