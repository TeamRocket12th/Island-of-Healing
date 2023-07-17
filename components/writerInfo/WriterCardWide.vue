<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
const { isLoading } = storeToRefs(useLoading())

defineProps({
  writerInfo: {
    type: Array as () => Writer[],
    default: () => [],
    required: true
  }
})

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
// 追蹤作家
const followWriter = async (id: number, writer: Writer) => {
  if (!userToken.value) {
    alert('請先登入')
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/follow/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'POST'
    })
    console.log(res)
    if (res.StatusCode === 200) {
      alert(res.Message)
      writer.IsFollowing = !writer.IsFollowing
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 取消追蹤作家
const unFollowWriter = async (id: number, writer: Writer) => {
  if (!userToken.value) {
    alert('請先登入')
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/cancelfollow/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'DELETE'
    })
    console.log(res)
    if (res.StatusCode === 200) {
      alert(res.Message)
      writer.IsFollowing = !writer.IsFollowing
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
</script>

<template>
  <div>
    <ul
      v-if="!isLoading && writerInfo.length > 0"
      class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:px-28"
    >
      <li
        v-for="writer in writerInfo"
        :key="writer.WriterId"
        class="mb-6 flex items-center justify-between border bg-white p-6 shadow-sm"
      >
        <NuxtLink :to="`/writer/${writer.WriterId}`">
          <span class="flex items-center gap-2">
            <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
              <img :src="writer.ImgUrl" alt="writer" />
            </div>
            <div>
              <p class="font-medium text-primary">{{ writer.NickName }}</p>

              <p class="text-sm text-primary-dark">{{ writer.JobTitle }}。{{ writer.Bio }}</p>
            </div>
          </span>
        </NuxtLink>
        <button
          v-if="writer.IsFollowing"
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="unFollowWriter(writer.WriterId, writer)"
        >
          <Icon name="material-symbols:fitbit-check-small" size="20" />追蹤中
        </button>
        <button
          v-else
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="followWriter(writer.WriterId, writer)"
        >
          <Icon name="ic:baseline-plus" size="20" />追蹤
        </button>
      </li>
    </ul>
    <p v-else-if="!isLoading && writerInfo.length === 0" class="text-center text-2xl text-primary">
      目前還沒有追蹤作家
    </p>
    <span v-if="isLoading">Loading...</span>
  </div>
</template>
<style scoped></style>
