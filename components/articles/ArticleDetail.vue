<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isLogin, userData } = storeToRefs(userStore)
const runtimeConfig = useRuntimeConfig()
const mockApiBase = runtimeConfig.public.mockApiBase
const articleDetail = ref<ArticleDetail | null>(null)
const charge = ref(false)
const route = useRoute()

const getArticleDetail = async () => {
  try {
    const res: ApiResponse = await $fetch(`${mockApiBase}/article/${route.params.id}`)
    if (res.statusCode === 200) {
      console.log(res.data)
      articleDetail.value = res.data
      charge.value = res.data.charge
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(getArticleDetail)

const textarea = ref<HTMLTextAreaElement | null>(null)
const emojiPicker = ref<any>(null)

const autoResize = () => {
  textarea.value!.style.height = '40px'
  textarea.value!.style.height = textarea.value!.scrollHeight + 'px'
}

onMounted(autoResize)

const userComment = ref('')
const showEmojiPicker = ref(false)
const insertEmoji = (emoji: any) => {
  userComment.value += emoji.i
  showEmojiPicker.value = false
}

// const isLocked = ref(true)
// const handleUnLock = () => {
//   if (!isLogin.value) {
//     alert('需要先登入才能閱讀文章喔')
//   } else if (userData.value.myPlan === 'free' && charge.value) {
//     alert('請先訂閱我們')
//   } else {
//     isLocked.value = !isLocked.value
//   }
// }

const isShareLinkOpen = ref(false)
const toggleShareLink = () => {
  isShareLinkOpen.value = !isShareLinkOpen.value
}
const closeModal = (value: boolean) => {
  isShareLinkOpen.value = value
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isShareLinkOpen.value ? 'hidden' : 'auto'
  }
})
</script>
<template>
  <div v-if="articleDetail" class="mb-10">
    <span v-if="articleDetail.charge" class="mb-3 flex items-center gap-1 text-primary-dark"
      ><Icon name="material-symbols:lock-outline" size="16" /> 付費限定文章</span
    >
    <div class="mb-5 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="h-9 w-9">
          <img src="https://picsum.photos/32" alt="writer" class="h-full w-full rounded-full" />
        </div>
        <div>
          <p class="text-xs">作家</p>
          <p class="text-sm font-medium">
            <NuxtLink :to="`/writer/${articleDetail?.writerInfo.id}`">{{
              articleDetail?.writerInfo.name
            }}</NuxtLink>
          </p>
        </div>
      </div>
      <div>
        <p class="font-light text-[#3D1F03]">
          {{ articleDetail.createdTime }} 發表於 {{ articleDetail?.category }}
        </p>
      </div>
    </div>
    <!-- 文章內文 -->
    <div class="relative max-h-[800px] overflow-hidden" :class="{ 'max-h-none': !isLocked }">
      <div
        v-if="isLocked"
        class="payment-shade absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-sand-200"
      ></div>
      <button
        v-if="isLocked"
        class="font-sm absolute bottom-10 left-1/2 flex -translate-x-2/4 transform items-center gap-1 rounded bg-secondary px-2 py-1 text-white hover:opacity-80"
        @click="handleUnLock"
      >
        <span class="pb-1">
          <Icon v-if="userData.myPlan === 'free'" name="ic:outline-paid" size="18" />
          <Icon v-else name="material-symbols:arrow-circle-down-outline" size="18" />
        </span>
        <span v-if="userData.myPlan === 'free'">付費解鎖</span>
        <span v-else>繼續閱讀</span>
      </button>
      <h2 class="mb-6 text-[32px] font-bold">{{ articleDetail?.title }}</h2>
      <img :src="articleDetail.coverUrl" alt="cover" class="mb-6 block" />
      <div class="border-b-[0.5px] border-primary pb-16">
        <div v-dompurify-html="articleDetail.content" class="mb-9"></div>
        <div class="flex items-center justify-between">
          <CategoryTag :tags="articleDetail.tags" />
          <ul class="flex gap-3">
            <li class="cursor-pointer">
              <Icon name="material-symbols:favorite-outline-rounded" size="20" />
            </li>
            <li class="cursor-pointer">
              <Icon name="material-symbols:bookmark-outline-rounded" size="20" />
            </li>
            <li class="cursor-pointer" @click="toggleShareLink">
              <Icon name="mdi:share-variant-outline" size="20" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-if="articleDetail" class="mb-9 flex items-center justify-between py-6">
    <div class="items-center md:flex">
      <div class="flex justify-between sm:mr-2">
        <img
          :src="articleDetail.writerInfo.imgUrl"
          alt="avatar"
          class="h-[60px] w-[60px] rounded-full"
        />
        <button
          class="flex h-10 w-[72px] items-center whitespace-nowrap rounded border bg-secondary px-3 text-sm text-white hover:opacity-80 sm:hidden"
        >
          <Icon name="ic:baseline-plus" size="16" />追蹤
        </button>
      </div>
      <div>
        <NuxtLink :to="`/writer/${articleDetail?.writerInfo.id}`">
          <p class="font-medium text-primary">作家·{{ articleDetail.writerInfo.name }}</p>
          <p class="font-light text-primary-dark">{{ articleDetail.writerInfo.bio }}</p>
        </NuxtLink>
      </div>
    </div>
    <div>
      <button
        class="hidden items-center whitespace-nowrap rounded border bg-secondary px-3 py-2 text-white hover:opacity-80 sm:flex"
      >
        <Icon name="ic:baseline-plus" size="20" />追蹤
      </button>
    </div>
  </div>
  <!--留言-->
  <div>
    <div class="mb-6 flex items-center justify-between">
      <p class="font-serif-tc text-2xl font-bold text-primary">留言</p>
      <button class="font-medium text-primary-dark">查看全部</button>
    </div>
    <ArticleComment />
    <div class="mb-28">
      <div class="mb-2 flex items-center">
        <div class="mr-2 h-9 w-9">
          <img :src="userData.avatar" alt="avatar" class="h-full w-full rounded-full" />
        </div>
        <span class="font-medium text-primary">{{ userData.nickName }}</span>
      </div>
      <div class="grid-cols-7 gap-6 text-right md:grid md:text-left">
        <div class="relative col-span-6 mb-4 md:mb-0">
          <textarea
            ref="textarea"
            v-model="userComment"
            cols="60"
            rows="2"
            max="50"
            placeholder="留言分享你的想法吧！"
            class="focus: h-10 w-full resize-none overflow-hidden rounded border border-secondary py-2 pl-2 pr-10 text-primary-dark outline-primary placeholder:text-sand-300"
            @input="autoResize"
          ></textarea>
          <span class="cursor-pointer" @click="showEmojiPicker = !showEmojiPicker"
            ><Icon
              name="ic:outline-sentiment-satisfied-alt"
              size="20"
              class="absolute right-[10px] top-[10px] text-secondary hover:text-primary"
          /></span>
          <EmojiPicker
            v-if="showEmojiPicker"
            ref="emojiPicker"
            class="absolute right-[10px] top-8"
            @select="insertEmoji"
          />
        </div>
        <button class="h-10 rounded bg-secondary p-2 text-white hover:opacity-80">發表留言</button>
      </div>
    </div>
  </div>
  <section>
    <h2 class="mb-6 font-serif-tc text-4xl font-bold text-primary md:text-2xl">你可能會喜歡</h2>
    <RecArticleCard />
  </section>
  <Teleport to="body">
    <ShareLink v-if="isShareLinkOpen" @close-modal="closeModal" />
  </Teleport>
</template>

<style scoped></style>
