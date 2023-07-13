<script setup lang="ts">
// import { writer } from 'repl'

defineProps({
  writerInfo: {
    type: Array as () => Writer[],
    required: true,
    default: () => []
  }
})

const shortenBio = (bio: string) => {
  let shortBio = bio
  if (bio && bio.length > 13) {
    shortBio = bio.substring(0, 13) + '...'
  }
  return shortBio
}

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
// 追蹤作家
const followWriter = async (id: number, writerInfo: Writer[]) => {
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
      const writer = writerInfo.find((writer: any) => writer.WriterId === id)
      if (writer) {
        writer.IsFollowing = true
      }
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 取消追蹤作家
const unFollowWriter = async (id: number, writerInfo: Writer[]) => {
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

      const writer = writerInfo.find((writer: any) => writer.WriterId === id)
      if (writer) {
        writer.IsFollowing = false
      }
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
</script>

<template>
  <div>
    <ul v-if="writerInfo.length > 0" class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:px-28">
      <li
        v-for="writer in writerInfo"
        :key="writer.WriterId"
        class="mb-6 flex items-center justify-between border bg-white p-6 shadow-sm"
      >
        <span class="flex items-center gap-2">
          <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
            <img :src="writer.ImgUrl" alt="writer" />
          </div>
          <div>
            <NuxtLink :to="`/writer/${writer.WriterId}`"
              ><p class="font-medium text-primary">{{ writer.NickName }}</p></NuxtLink
            >

            <p class="text-sm text-primary-dark">
              {{ writer.JobTitle }}。{{ shortenBio(writer.Bio) }}
            </p>
          </div>
        </span>
        <button
          v-if="writer.IsFollowing"
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="unFollowWriter(writer.WriterId, writerInfo)"
        >
          <Icon name="material-symbols:fitbit-check-small" size="20" />追蹤中
        </button>
        <button
          v-else
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="followWriter(writer.WriterId, writerInfo)"
        >
          <Icon name="ic:baseline-plus" size="20" />追蹤
        </button>
      </li>
    </ul>
    <span v-else>Loading...</span>
  </div>
</template>
<style scoped></style>
