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
  <div class="flex flex-col justify-between sm:flex-row">
    <div class="flex cursor-pointer flex-wrap gap-6 sm:flex-nowrap" @click="topicPage(topic.Id)">
      <div class="h-[150px] w-full flex-shrink-0 sm:w-[220px]">
        <NuxtImg
          v-if="topic.ConversationImgUrl"
          :src="topic.ConversationImgUrl"
          alt="topic-cover"
          class="h-full w-full object-cover object-center"
        />
        <NuxtImg
          v-else
          src="https://picsum.photos/150/220"
          alt="topic-cover"
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <div class="mb-2 flex items-center gap-1">
          <div class="h-4 w-4 rounded-full bg-[#D9D9D9]">
            <NuxtImg
              :src="topic.PosterImgUrl ? topic.PosterImgUrl : '/anonymous.png'"
              alt="poster"
              class="rounded-full object-cover"
            />
          </div>
          <p class="text-sm text-primary-dark">{{ topic.PosterNickName }}</p>
        </div>
        <h3 class="mb-4 text-2xl text-primary">{{ topic.Title }}</h3>
        <p class="hidden text-primary-dark sm:block">{{ topic.Summary }}</p>
      </div>
    </div>
    <div class="flex items-end justify-between gap-3 text-primary-dark sm:justify-normal">
      <p class="whitespace-nowrap">{{ formatDate(topic.Initdate) }}</p>
      <div class="flex items-center justify-center gap-1 text-primary-dark">
        <span>
          <Icon name="material-symbols:mode-comment-outline" size="16"></Icon>
        </span>
        <p>{{ topic.CommentsNum }}</p>
      </div>
    </div>
  </div>
</template>
