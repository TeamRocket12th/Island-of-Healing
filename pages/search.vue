<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ArticleList from '~/containers/ArticleList.vue'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const { userData } = storeToRefs(useUserStore())
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const route = useRoute()
const userId = String(userData.value.id) || '0'

const dataLoaded = ref(false)
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
  dataLoaded.value = false
  setLoading(true)
  const { data, error } = await useFetch<ApiResponse>(
    `${apiBase}/searcharticle/${keyword}/${category}/${uId}`,
    {
      key: 'getAllArticles',
      headers: {
        'Content-type': 'application/json'
      }
    }
  )
  console.log(data.value)

  if (data.value!.StatusCode === 200) {
    console.log(data.value!.Message)
    searchArticles.value = data.value!.ArticlesData
    dataLoaded.value = true
    setLoading(false)
  }
  if (error.value) {
    console.log(error.value)
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
        <div class="col-span-9">
          <div v-if="isLoading">Loading...</div>
          <div v-if="searchArticles.length > 0 && !isLoading">
            <ArticleList :title="`關於 「${route.query.q}」`" :articles="searchArticles" />
          </div>
          <div v-if="searchArticles.length === 0 && dataLoaded" class="mb-40 mt-16">
            <p class="text-center text-3xl font-medium text-primary">
              沒有找到 {{ route.query.q }} 的相關結果
            </p>
          </div>
          <div>
            <ArticleList title="你可能會喜歡" :articles="recArticles" />
          </div>
        </div>
        <div class="col-span-3">
          <ArticleSideBar />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
