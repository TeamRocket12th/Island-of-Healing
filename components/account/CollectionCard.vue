<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'

const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

defineProps({
  collectedArticles: {
    type: Array as () => Article[],
    required: true,
    default: () => []
  }
})

const { formatDate } = useDateFormat()
const { apiBase, userToken } = useApiConfig()

const dataLoaded = ref(false)

// 收藏文章
const isCollected = async (articleId: number, article: Article) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/article/collect/${articleId}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'POST'
    })
    if (res.StatusCode === 200) {
      setToast('收藏成功！')
      article.IsCollected = !article.IsCollected
      dataLoaded.value = true
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 取消收藏文章
const cancelCollect = async (articleId: number, article: Article) => {
  if (userToken.value) {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/article/cancelcollect/${articleId}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'PUT'
      })

      if (res.StatusCode === 200) {
        setToast('已取消收藏！')
        article.IsCollected = !article.IsCollected
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="fixed right-10 top-52 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
    <div class="col-span-10 col-start-2 grid sm:pb-[106px]">
      <ul v-if="collectedArticles.length > 0">
        <li v-for="article in collectedArticles" :key="article.ArticleId">
          <div class="block w-full gap-4 sm:flex sm:p-6">
            <div class="w-full sm:w-1/2 lg:w-1/4">
              <NuxtLink :to="`/article/${article.ArticleId}`">
                <img
                  :src="
                    article.ArticleImgUrl ? article.ArticleImgUrl : '/default-article-cover.jpg'
                  "
                  alt="cover"
                  class="h-full w-full object-cover"
                />
              </NuxtLink>
            </div>
            <div class="w-full sm:w-1/2 lg:w-3/4">
              <div class="sm:w-[90%]">
                <div class="mb-3 hidden items-center gap-1 sm:flex">
                  <NuxtLink :to="`/writer/${article.WriterId}`">
                    <div class="h-6 w-6 overflow-hidden rounded-full">
                      <img :src="article.WriterImgUrl" alt="writer-pic" class="h-full w-full" />
                    </div>
                  </NuxtLink>
                  <NuxtLink :to="`/writer/${article.WriterId}`">
                    <span class="text-sm font-light">{{ article.WriterNickName }}</span>
                  </NuxtLink>
                </div>
                <NuxtLink :to="`/article/${article.ArticleId}`">
                  <h3 class="mb-4 font-serif-tc text-xl font-bold text-primary sm:mb-2">
                    {{ article.Title }}
                  </h3>
                </NuxtLink>
                <p class="mb-5 font-light text-primary-dark sm:mb-2">
                  {{ article.Summary }}
                </p>
              </div>
              <div class="hidden sm:flex sm:justify-between">
                <p class="font-light">{{ formatDate(article.Initdate) }}</p>
                <div class="flex cursor-pointer items-center gap-1">
                  <span
                    v-if="article.IsCollected"
                    class="text-secondary"
                    @click="cancelCollect(article.ArticleId, article)"
                  >
                    <Icon name="material-symbols:bookmark" size="24" />
                  </span>
                  <span
                    v-else
                    class="text-sand-300"
                    @click="isCollected(article.ArticleId, article)"
                    ><Icon name="material-symbols:bookmark-outline-rounded" size="24"
                  /></span>
                  <span
                    v-if="article.IsCollected"
                    class="font-light text-secondary"
                    @click="cancelCollect(article.ArticleId, article)"
                    >已收藏</span
                  >
                  <span
                    v-else
                    class="font-light text-secondary"
                    @click="isCollected(article.ArticleId, article)"
                    >收藏</span
                  >
                </div>
              </div>
              <div class="flex items-center justify-between sm:hidden">
                <div class="flex gap-[5px]">
                  <div class="flex items-center gap-1">
                    <NuxtLink :to="`/writer/${article.WriterId}`">
                      <div class="h-6 w-6 overflow-hidden rounded-full">
                        <img :src="article.WriterImgUrl" alt="writer-pic" class="h-full w-full" />
                      </div>
                    </NuxtLink>
                    <NuxtLink :to="`/writer/${article.WriterId}`">
                      <span class="text-sm font-light">{{ article.WriterNickName }}</span>
                    </NuxtLink>
                  </div>
                  <p class="font-light">·{{ formatDate(article.Initdate) }}</p>
                </div>
                <div class="flex cursor-pointer items-center gap-1">
                  <span
                    v-if="article.IsCollected"
                    class="text-secondary"
                    @click="cancelCollect(article.ArticleId, article)"
                  >
                    <Icon name="material-symbols:bookmark" size="24" />
                  </span>
                  <span
                    v-else
                    class="text-sand-300"
                    @click="isCollected(article.ArticleId, article)"
                    ><Icon name="material-symbols:bookmark-outline-rounded" size="24"
                  /></span>
                  <span
                    v-if="article.IsCollected"
                    class="font-light text-secondary"
                    @click="cancelCollect(article.ArticleId, article)"
                    >已收藏</span
                  >
                  <span
                    v-else
                    class="font-light text-secondary"
                    @click="isCollected(article.ArticleId, article)"
                    >收藏</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="mb-6 mt-[21px] w-full border-[0.5px] border-primary border-opacity-30 sm:my-6"
          ></div>
        </li>
      </ul>
      <p v-else class="text-center text-2xl text-primary">目前沒有收藏文章</p>
    </div>
  </div>
</template>

<style scoped></style>
