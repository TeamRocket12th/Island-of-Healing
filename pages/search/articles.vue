<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ArticleList from '~/containers/ArticleList.vue'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

useSeoMeta({ title: '搜尋結果' })

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const { userData } = storeToRefs(useUserStore())
const { apiBase } = useApiConfig()
const route = useRoute()
const userId = userData.value.id ? String(userData.value.id) : '0'

const searchArticles = ref<ArticleCard[]>([])

const recArticles = [
  {
    ArticleImgUrl: 'https://picsum.photos/312/234',
    Id: 1,
    Initdate: '2023-03-20',
    Title: '重拾自我價值：探索內在的力量',
    UserCollect: false,
    UserLike: false,
    WriterNickName: '李柚子'
  },
  {
    ArticleImgUrl: 'https://picsum.photos/312/234',
    Id: 2,
    Initdate: '2023-03-20',
    Title: '認識自我與擁抱內在小孩的旅程',
    UserCollect: false,
    UserLike: false,
    WriterNickName: '莉莉安'
  },
  {
    ArticleImgUrl: 'https://picsum.photos/312/234',
    Id: 3,
    Initdate: '2023-03-20',
    Title: '別離與成長：好好道別的力量',
    UserCollect: false,
    UserLike: false,
    WriterNickName: '馬克'
  }
]

const getSearchResult = async (keyword: string, category = '0', uId: string) => {
  setLoading(true)
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/searcharticle/${keyword}/${category}/${uId}`)
    console.log(res)
    if (res.StatusCode === 200) {
      searchArticles.value = res.ArticlesData
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    setLoading(false)
  }
}

watchEffect(async () => {
  if (route.query.q) {
    // clear current results
    searchArticles.value = []
    // load new results
    await getSearchResult(route.query.q as string, '0', userId)
  }
})
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-12 gap-6 pb-40 pt-10">
        <div class="col-span-full md:col-span-9">
          <div>
            <ArticleList
              :title="`關於 「${route.query.q}」`"
              :articles="searchArticles"
              :skeleton-num="3"
            />
          </div>
          <div v-if="searchArticles.length === 0 && !isLoading" class="mb-40 mt-16">
            <p class="text-center text-3xl font-medium text-primary">
              沒有找到 {{ route.query.q }} 的相關結果
            </p>
          </div>
          <div>
            <ArticleList title="你可能會喜歡" :articles="recArticles" :skeleton-num="3" />
          </div>
        </div>
        <div class="hidden md:col-span-3 md:block">
          <ArticleSideBar />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
