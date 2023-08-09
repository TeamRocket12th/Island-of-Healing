<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'
import { useLoading } from '~/stores/loading'

import '~/assets/css/article.css'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()
const { isLogin, userData } = storeToRefs(useUserStore())
const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

setLoading(true)
showToast.value = false

const { apiBase, userToken } = useApiConfig()
const { useFormattedTime } = useDateFormat()
const route = useRoute()
const userId = isLogin.value ? String(userData.value.id) : '0'
const articleId = route.params.id as string

const isPreview = ref(false)

// 取得單篇文章資訊
const {
  articleDetail,
  writerInfo,
  isCollecting,
  isLiking,
  comments,
  isLock,
  isRead,
  getArticleDetail
} = useArticleDetail()

onMounted(() => {
  nextTick(() => {
    if (route.query.status === 'preview') {
      isPreview.value = true
    }
    getArticleDetail(articleId, userId)
  })
})

// 對文章做的動作
const { handleCollectionAction, likeArticle, unlikeArticle } = useArticleActions()

// 計算付費文章點擊數+1
const markArticleAsRead = async (id: number) => {
  isLock.value = !isLock.value
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/paidarticleclick/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'POST'
    })
    if (res.StatusCode === 200) {
      setToast('解鎖成功！')
      isRead.value = true
    }
  } catch (error: any) {
    setToast('發生錯誤！')
  }
}

const keepReading = (id: number) => {
  if (!isLogin.value) {
    setToast('需要先登入才能閱讀文章喔！')
  } else if (userData.value.myPlan === 'free' && articleDetail.value!.Pay) {
    setToast('付費會員限定！')
  } else {
    markArticleAsRead(id)
  }
}

// 分享連結Modal
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
    document.body.style.paddingRight = isShareLinkOpen.value ? '15px' : '0'
  }
})

// 新增文章留言
const addArticleComment = async (id: number, articleId: string, userId: string, text: string) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/articlecomment/create`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'POST',
      body: {
        Comment: text,
        ArticleId: id
      }
    })
    if (res.StatusCode === 200) {
      setToast('新增成功！')
      getArticleDetail(articleId, userId)
    }
  } catch (error: any) {
    setToast('發生錯誤！')
  }
}

const { handleFollowAction } = useWriterActions()
const toggleFollow = () => {
  if (writerInfo.value && writerInfo.value!.Id !== userData.value.id) {
    handleFollowAction(
      writerInfo.value!.Id,
      !writerInfo.value?.Follow,
      writerInfo.value,
      articleId,
      userId,
      getArticleDetail
    )
  }
}

const handleAddComment = (inputTxt: string) => {
  addArticleComment(articleDetail.value?.Id as number, articleId, userId, inputTxt)
}

// 文章頁面Title
const htmlTitle = ref<string | undefined>('')
const emits = defineEmits(['use-title'])
const useHtmlTitle = (value: string | undefined) => {
  emits('use-title', value)
}
onBeforeUpdate(() => {
  htmlTitle.value = articleDetail.value?.Title
  useHtmlTitle(htmlTitle.value)
})
</script>
<template>
  <ArticleDetailSkeleton v-if="isLoading" />
  <section v-if="articleDetail && !isLoading" class="mb-28">
    <div class="fixed right-10 top-24 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
    <div class="mb-10">
      <span
        v-if="articleDetail.Pay && !isRead"
        class="mb-3 flex items-center gap-1 text-primary-dark"
        ><Icon name="material-symbols:lock-outline" size="16" /> 付費限定文章</span
      >
      <span
        v-else-if="articleDetail.Pay && isRead"
        class="mb-3 flex items-center gap-1 text-primary-dark"
        ><Icon name="material-symbols:lock-open-outline" size="16" /> 文章已解鎖</span
      >
      <p v-if="isPreview" class="mb-2 text-right text-primary">目前為預覽模式</p>
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="h-9 w-9">
            <NuxtLink :to="`/writer/${writerInfo?.Id}`">
              <img :src="writerInfo?.ImgUrl" alt="writer" class="h-full w-full rounded-full" />
            </NuxtLink>
          </div>
          <div>
            <p class="text-sm font-light text-primary-dark">作家</p>
            <p class="text-sm text-primary-dark">
              <NuxtLink :to="`/writer/${writerInfo?.Id}`">
                {{ writerInfo?.NickName }}
              </NuxtLink>
            </p>
          </div>
        </div>
        <div>
          <p class="font-light text-primary-dark">
            {{ useFormattedTime(articleDetail.Initdate) }} 發表於 {{ articleDetail?.Category }}
          </p>
        </div>
      </div>
      <!-- 文章內文 -->
      <div class="relative">
        <h2 class="mb-6 font-serif-tc text-3xl-plus font-bold text-primary">
          {{ articleDetail?.Title }}
        </h2>
        <img
          :src="articleDetail.ImgUrl ? articleDetail.ImgUrl : '/default-article-cover.jpg'"
          alt="cover"
          class="mb-6 block"
        />
        <div v-if="isLock && !isPreview">
          <p class="mb-10 text-xl font-medium text-primary">
            關於本文： {{ articleDetail.Summary }}
          </p>
        </div>
        <div v-if="isLock && !isRead && writerInfo?.Id !== userData.id" class="flex justify-center">
          <button
            v-if="userData.myPlan === 'free' && isLock"
            class="font-sm flex transform items-center gap-1 rounded bg-secondary px-2 py-1 text-white hover:opacity-80"
            @click="keepReading(articleDetail.Id)"
          >
            <span class="pb-1"><Icon name="ic:outline-paid" size="18" /></span>
            <span>付費解鎖</span>
          </button>
          <button
            v-if="!isRead && isLock && userData.myPlan !== 'free'"
            class="font-sm flex transform items-center gap-1 rounded bg-secondary px-2 py-1 text-white hover:opacity-80"
            @click="keepReading(articleDetail.Id)"
          >
            <span class="pb-1"
              ><Icon name="material-symbols:arrow-circle-down-outline" size="18"
            /></span>
            <span>繼續閱讀</span>
          </button>
        </div>
        <!--文章本體-->
        <div v-else>
          <div class="border-b-[0.5px] border-primary pb-16">
            <div v-dompurify-html="articleDetail?.Content" class="mb-9"></div>
            <div class="flex items-center justify-between">
              <CategoryTag :tags="articleDetail.Tags" />
              <ul class="flex gap-3">
                <li
                  v-if="!isLiking"
                  class="cursor-pointer"
                  @click="likeArticle(articleDetail.Id, articleId, userId, getArticleDetail)"
                >
                  <Icon
                    name="material-symbols:favorite-outline-rounded"
                    size="20"
                    class="text-secondary"
                  />
                </li>
                <li
                  v-else
                  class="cursor-pointer text-secondary"
                  @click="unlikeArticle(articleDetail.Id, articleId, userId, getArticleDetail)"
                >
                  <Icon name="material-symbols:favorite-rounded" size="20" class="text-secondary" />
                </li>
                <li
                  v-if="!isCollecting"
                  class="cursor-pointer"
                  @click="
                    handleCollectionAction(
                      articleDetail.Id,
                      true,
                      articleDetail,
                      userId,
                      getArticleDetail
                    )
                  "
                >
                  <Icon
                    name="material-symbols:bookmark-outline-rounded"
                    size="20"
                    class="text-secondary"
                  />
                </li>
                <li
                  v-else
                  class="cursor-pointer text-secondary"
                  @click="
                    handleCollectionAction(
                      articleDetail.Id,
                      false,
                      articleDetail,
                      userId,
                      getArticleDetail
                    )
                  "
                >
                  <Icon name="material-symbols:bookmark" size="20" class="text-secondary" />
                </li>
                <li class="cursor-pointer" @click="toggleShareLink">
                  <Icon name="mdi:share-variant-outline" size="20" class="text-secondary" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="articleDetail" class="mb-9 block items-center justify-between py-6 sm:flex">
      <div class="items-center md:flex">
        <div class="flex justify-between sm:mr-2">
          <NuxtLink :to="`/writer/${writerInfo?.Id}`">
            <img :src="writerInfo?.ImgUrl" alt="avatar" class="h-[60px] w-[60px] rounded-full"
          /></NuxtLink>

          <button
            v-if="!writerInfo?.Follow"
            type="button"
            class="flex h-10 w-[72px] items-center justify-center whitespace-nowrap rounded border bg-secondary px-3 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white sm:hidden"
            @click="toggleFollow"
          >
            <span>
              <Icon name="ic:baseline-plus" size="16" />
            </span>
            追蹤
          </button>
          <button
            v-else
            type="button"
            class="flex h-10 w-[72px] items-center justify-center whitespace-nowrap rounded border bg-secondary px-3 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white sm:hidden"
            @click="toggleFollow"
          >
            <span>
              <Icon name="material-symbols:fitbit-check-small" size="20" />
            </span>
            追蹤中
          </button>
        </div>
        <div>
          <NuxtLink :to="`/writer/${writerInfo?.Id}`">
            <p class="font-medium text-primary">作家·{{ writerInfo?.NickName }}</p>
          </NuxtLink>
          <p class="font-light text-primary-dark">{{ writerInfo?.Bio }}</p>
        </div>
      </div>
      <div>
        <button
          v-if="!writerInfo?.Follow && writerInfo?.Id !== userData.id"
          class="hidden items-center whitespace-nowrap rounded border bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white sm:flex"
          @click="toggleFollow"
        >
          <Icon name="ic:baseline-plus" size="20" />追蹤
        </button>
        <button
          v-else-if="writerInfo?.Follow && writerInfo?.Id !== userData.id"
          class="hidden items-center whitespace-nowrap rounded border bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white sm:flex"
          @click="toggleFollow"
        >
          <Icon name="material-symbols:fitbit-check-small" size="20" />追蹤中
        </button>
      </div>
    </div>
    <!--留言-->
    <div v-if="isLogin && (!isLock || writerInfo?.Id === userData.id)">
      <div class="mb-6">
        <p class="font-serif-tc text-2xl font-bold text-primary">留言</p>
      </div>
      <ArticleComment
        :comments="comments"
        :article-id="articleId"
        :user-id="userId"
        :get-article-detail="getArticleDetail"
      />
      <div class="mb-2 flex items-center">
        <div class="mr-2 h-9 w-9">
          <img :src="userData.avatar" alt="avatar" class="h-full w-full rounded-full" />
        </div>
        <span class="font-medium text-primary">{{ userData.nickName }}</span>
      </div>
      <CommentInput @send-input-txt="handleAddComment" />
    </div>
    <div v-else class="my-20 flex items-center justify-center text-primary-dark">
      <NuxtLink to="/login" class="text-xl text-primary underline">要先登入才能留言喔</NuxtLink>
    </div>
  </section>
  <section v-if="!articleDetail && !isLoading">
    <h2 class="pb-60 pt-28 text-center text-3xl text-primary">找不到文章</h2>
  </section>
  <section>
    <h2 class="mb-6 font-serif-tc text-4xl font-bold text-primary md:text-2xl">你可能會喜歡</h2>
    <RecArticleCard />
  </section>
  <Teleport to="body">
    <Transition>
      <ShareLink v-if="isShareLinkOpen" @close-modal="closeModal" />
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
