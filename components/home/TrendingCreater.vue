<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'

const { userData } = storeToRefs(useUserStore())
const { showToast } = storeToRefs(useToast())

showToast.value = false

const { apiBase, userToken } = useApiConfig()

const trendingCreater = ref<TrendingCreater[]>([])

const { data } = await useFetch<TrendingCreater[]>(`${apiBase}/hotwriters/get`, {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${userToken.value}`
  },
  params: {
    userid: userData.value.id || '0'
  },
  lazy: true
})

watchEffect(() => {
  if (data.value) {
    trendingCreater.value = data.value
  }
})

const { handleFollowAction } = useWriterActions()
</script>

<template>
  <section class="container mb-6 py-[84px]">
    <div class="mb-6 flex items-center gap-2 sm:px-4">
      <h2 class="font-serif-tc text-4xl font-bold text-primary">熱門創作者</h2>
      <div class="h-[0.5px] w-[150px] bg-primary"></div>
    </div>
    <ul
      class="flex h-[250px] items-center gap-6 overflow-x-scroll sm:grid sm:grid-cols-12 sm:overflow-auto"
    >
      <li
        v-for="creater in trendingCreater"
        :key="creater.WriterId"
        class="min-h-[250px] w-[151px] px-6 pb-3 pt-4 sm:col-span-2 sm:w-auto sm:p-0"
      >
        <NuxtLink :to="`/writer/${creater.WriterId}`">
          <div class="m-auto mb-4 h-[95px] w-[95px]">
            <NuxtImg
              loading="lazy"
              :src="creater.Imgurl"
              alt="avatar"
              class="h-[95px] w-[95px] rounded-full"
            />
          </div>
        </NuxtLink>
        <p class="mb-1 text-center font-serif-tc font-bold text-primary">
          <NuxtLink :to="`/writer/${creater.WriterId}`">{{ creater.Name }} </NuxtLink>
        </p>
        <p class="mb-4 min-h-[21px] text-center text-sm font-light text-primary">
          {{ creater.JobTitle }}
        </p>
        <button
          v-if="creater.IsFollowed"
          class="m-auto flex items-center rounded bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          :disabled="creater.WriterId === userData.id"
          @click="handleFollowAction(creater.WriterId, false, creater)"
        >
          <Icon name="material-symbols:fitbit-check-small" size="16" />
          <span class="pr-[2px] text-sm leading-normal">追蹤中</span>
        </button>
        <button
          v-if="!creater.IsFollowed"
          class="m-auto flex items-center rounded bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          :disabled="creater.WriterId === userData.id"
          @click="handleFollowAction(creater.WriterId, true, creater)"
        >
          <Icon name="ic:outline-plus" size="16" />
          <span class="pr-[3px] text-sm leading-normal">追蹤</span>
        </button>
      </li>
    </ul>
    <div class="fixed right-10 top-44 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
