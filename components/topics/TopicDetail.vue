<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'
import { useLoading } from '~/stores/loading'

const { userData, isLogin } = storeToRefs(useUserStore())
const { apiBase, userToken } = useApiConfig()
const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const { topicDetail, topicComments, posterInfo, getTopic } = useTopicDetail()
const { useFormattedTime } = useDateFormat()
const route = useRoute()
const topicId = route.params.id as string
const haveCover = ref(false)
setLoading(true)

showToast.value = false
onMounted(async () => {
  await getTopic(topicId)
  if (topicDetail.value?.ImgUrl) {
    haveCover.value = true
  }
})

// 新增話題下的留言
const addTopicComment = async (topicId: string, text: string) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversationcomment/create`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'POST',
      body: {
        Comment: text,
        ConversationId: topicId
      }
    })
    if (res.StatusCode === 200) {
      getTopic(topicId)
      setToast('新增成功！')
    }
  } catch (error: any) {
    console.log(error.response)
    setToast('發生錯誤！')
  }
}

const handleAddComment = (inputTxt: string) => {
  addTopicComment(topicId, inputTxt)
}
</script>

<template>
  <TopicDetailSkeleton v-if="isLoading" />
  <section v-if="topicDetail && !isLoading" class="mb-28">
    <div class="fixed right-10 top-24 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
    <div class="mb-6 flex flex-wrap justify-between gap-3 sm:flex-nowrap sm:gap-0">
      <div v-if="!topicDetail.Anonymous" class="flex items-center gap-3">
        <div class="overflow-hidden">
          <NuxtImg :src="posterInfo?.ImgUrl" alt="poster" class="h-9 w-9 rounded-full" />
        </div>
        <p class="text-primary">{{ posterInfo?.NickName }}</p>
      </div>
      <div v-else class="flex items-center gap-3">
        <div class="overflow-hidden">
          <NuxtImg src="/anonymous.png" alt="poster" class="h-9 w-9 rounded-full" />
        </div>
        <p class="text-primary">匿名</p>
      </div>

      <span class="font-light text-primary-dark"
        >{{ useFormattedTime(topicDetail.Initdate) }} 發表於 {{ topicDetail.Category }}
      </span>
    </div>
    <h2 class="text-3xl-plus font-medium text-primary">{{ topicDetail?.Title }}</h2>
    <div class="border-b-[0.5px] border-primary pb-6"></div>
    <div class="my-6">
      <NuxtImg
        :src="haveCover ? topicDetail?.ImgUrl : 'https://picsum.photos/904/300'"
        alt="topic-cover"
        class="w-full"
      />
    </div>
    <div
      v-dompurify-html="topicDetail?.Content"
      class="mb-9 border-b-[0.5px] border-primary pb-20"
    ></div>
    <!--話題留言-->
    <div>
      <p class="mb-7 font-serif-tc text-2xl font-bold text-primary">留言</p>
      <TopicComment :topic-id="topicId" :comments="topicComments" :get-topic="getTopic" />
      <div v-if="isLogin">
        <div class="mb-2 flex items-center">
          <div class="mr-2 h-9 w-9">
            <NuxtImg :src="userData.avatar" alt="avatar" class="h-full w-full rounded-full" />
          </div>
          <span class="font-medium text-primary">{{ userData.nickName }}</span>
        </div>
        <CommentInput @send-input-txt="handleAddComment" />
      </div>
      <div v-else class="my-20 flex items-center justify-center text-primary-dark">
        <NuxtLink to="/login" class="text-xl text-primary underline">要先登入才能留言喔</NuxtLink>
      </div>
    </div>
  </section>
  <section v-if="!topicDetail && !isLoading">
    <h2 class="pb-60 pt-28 text-center text-3xl text-primary">找不到話題</h2>
  </section>
</template>

<style scoped></style>
