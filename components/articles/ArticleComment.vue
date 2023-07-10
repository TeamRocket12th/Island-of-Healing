<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')

const props = defineProps({
  comments: {
    type: Array as () => Comment[],
    required: true
  },
  getArticleDetail: {
    type: Function,
    required: true
  }
})

const openCommentId = ref(null as number | null)
const toggleEditBtns = (id: number) => {
  openCommentId.value = openCommentId.value === id ? null : id
}

const editComment = async (id: number) => {
  toggleEditBtns(id)
  if (userToken.value) {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/articlecomment/update`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'PUT'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        alert(res.Message)
        props.getArticleDetail()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }
}

const delComment = async (id: number) => {
  toggleEditBtns(id)
  if (userToken.value) {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/articlecomment/delete/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'DELETE'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        alert(res.Message)

        props.getArticleDetail()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }
}
</script>
<template>
  <ul class="mb-4">
    <li v-for="comment in comments" :key="comment.CommentId" class="mb-6 flex">
      <div class="mr-3 mt-3 h-9 w-9 sm:mt-0">
        <img :src="comment.ImgUrl" alt="user" class="h-full w-full rounded-full" />
      </div>

      <div class="w-full">
        <div class="flex justify-between">
          <p class="mb-1 font-medium text-primary">{{ comment.NickName }}</p>
          <div class="relative w-20 text-right">
            <span class="cursor-pointer text-primary"
              ><Icon
                name="material-symbols:more-horiz"
                class="h-6 w-6"
                @click="toggleEditBtns(comment.CommentId)"
              />
            </span>
            <div
              v-if="openCommentId === comment.CommentId"
              class="absolute top-6 z-10 w-full rounded border border-primary bg-white text-center"
            >
              <div v-if="comment.UserId === userData.id" class="flex flex-col">
                <button
                  class="cursor-pointer border-b border-primary py-1 text-primary hover:bg-secondary hover:text-white"
                  @click="toggleEditBtns(comment.CommentId)"
                >
                  編輯
                </button>
                <button
                  class="cursor-pointer py-1 text-primary hover:bg-secondary hover:text-white"
                  @click="delComment(comment.CommentId)"
                >
                  刪除
                </button>
              </div>
              <div v-else class="text-primary hover:bg-secondary hover:text-white">
                <button class="cursor-pointer py-1" @click="toggleEditBtns(comment.CommentId)">
                  檢舉留言
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="items-center justify-between gap-2 md:flex">
          <p class="mb-2 w-4/5 font-light text-primary-dark md:mb-0">
            {{ comment.Comment }}
          </p>
          <span
            class="font-sm self-end justify-self-end whitespace-nowrap font-light text-[#3D1F03]"
            >{{ useFormattedTime(comment.Initdate) }}</span
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
