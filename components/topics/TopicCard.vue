<script setup lang="ts">
const router = useRouter()
const { formatDate } = useDateFormat()

const topicPage = (id: number) => {
  router.push(`/forum/${id}`)
}

defineProps({
  topic: {
    type: Object as () => TopicData,
    required: true,
    default: () => {}
  },
  title: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="flex cursor-pointer justify-between">
    <div class="flex gap-6" @click="topicPage(topic.Id)">
      <div class="h-[150px] w-[220px] bg-[#D9D9D9]">
        <img
          v-if="topic.ConversationImgUrl"
          :src="topic.ConversationImgUrl"
          alt=""
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <div class="mb-2 flex items-center gap-1">
          <div class="h-4 w-4 rounded-full bg-[#D9D9D9]">
            <img :src="topic.PosterImgUrl" alt="" class="rounded-full object-cover" />
          </div>
          <p class="text-sm text-primary-dark">{{ topic.PosterNickName }}</p>
        </div>
        <h3 class="mb-4 text-2xl text-primary">{{ topic.Title }}</h3>
        <p class="text-primary-dark">{{ topic.Summary }}</p>
      </div>
    </div>
    <div class="flex items-end gap-3">
      <p>{{ formatDate(topic.Initdate) }}</p>
      <div class="flex items-center justify-center gap-1">
        <div>
          <Icon name="material-symbols:mode-comment-outline" size="16"></Icon>
        </div>
        <p>{{ topic.CommentsNum }}</p>
      </div>
    </div>
  </div>
</template>
