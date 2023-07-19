<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ArticleList from '~/containers/ArticleList.vue'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
import { useUserStore } from '~/stores/user'

const { userData } = storeToRefs(useUserStore())
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

const router = useRouter()

// 文章分類代號
// 1=個人成長;2=情緒察覺;3=親密關係;4=日常練習;5=尚未分類
const categories: Record<string, string> = {
  'personal-growth': '個人成長',
  'emotional-awareness': '情緒察覺',
  'intimate-relationships': '親密關係',
  'daily-practice': '日常練習'
}

const getCategoriesNum = (category: string) => {
  switch (category) {
    case 'personal-growth':
      return '1'
    case 'emotional-awareness':
      return '2'
    case 'intimate-relationships':
      return '3'
    case 'daily-practice':
      return '4'
    default:
      break
  }
}

let categoryValue = router.currentRoute.value.query.category

if (Array.isArray(categoryValue)) {
  categoryValue = categoryValue[0]
}

const category = ref((categoryValue as string) || 'all')

const articles = ref<ArticleCard[]>([])
const selectedArticles = ref<ArticleCard[]>([])

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

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 分頁
const nowPage = ref(1)
const allPages = ref<number[]>([])
const changeNowPage = (p: number) => {
  nowPage.value = p
}

// 取得所有文章 $fetch
// const getAllArticles = async (page = '1') => {
//   changeNowPage(page)
//   scrollTop()
//   try {
//     const res: ApiResponse = await $fetch(`${apiBase}/readallarticles`, {
//       headers: {
//         'Content-type': 'application/json'
//       },
//       method: 'POST',
//       body: {
//         Page: page,
//         UserId: userData.value.id || '0'
//       }
//     })
//     console.log(res)
//     if (res.StatusCode === 200) {
//       console.log(res.Message)
//       articles.value = res.LatestArticleData
//       selectedArticles.value = res.SelectedArticleData
//     }
//   } catch (error: any) {
//     console.log(error.response)
//   }
// }

// 取得所有文章 useFetch
const getAllArticles = async (page = 1) => {
  changeNowPage(page)
  scrollTop()
  const { data, error } = await useFetch<ApiResponse>(`${apiBase}/readallarticles`, {
    key: 'getAllArticles',
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: {
      Page: page,
      UserId: userData.value.id || '0'
    }
  })
  console.log(data.value)

  if (data.value!.StatusCode === 200) {
    articles.value = data.value!.LatestArticleData
    selectedArticles.value = data.value!.SelectedArticleData
    allPages.value = data.value!.TotalLatestPages
  }
  if (error.value) {
    console.log(error.value)
  }
}

// 取得特定分類文章
const getSpArticles = async (nowPage: number, category: string) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/readcategoryarticles`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: {
        ArticlesCategoryId: getCategoriesNum(category),
        Page: nowPage,
        UserId: userData.value.id || '0'
      }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      articles.value = res.ArticleData
      allPages.value = res.TotalPages
      scrollTop()
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

const handleReading = (page: number) => {
  changeNowPage(page)
  if (category.value === 'all') {
    getAllArticles(nowPage.value)
  } else {
    getSpArticles(nowPage.value, category.value)
  }
}

onMounted(() => {
  nextTick(() => {
    if (category.value === 'all') {
      getAllArticles(nowPage.value)
    } else {
      getSpArticles(nowPage.value, category.value)
    }
  })
})

watchEffect(() => {
  let categoryValue = router.currentRoute.value.query.category

  if (Array.isArray(categoryValue)) {
    categoryValue = categoryValue[0]
  }
  category.value = (categoryValue as string) || 'all'
})

watch(category, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== 'all') {
    getSpArticles(1, newVal)
    nowPage.value = 1
  } else {
    getAllArticles(nowPage.value)
  }
})
</script>

<template>
  <section>
    <div class="container">
      <div class="grid-cols-12 gap-6 border-primary pb-40 pt-10 sm:border-t md:grid">
        <div v-if="category !== 'all'" class="col-span-full lg:col-span-9">
          <ArticleList :title="categories[category]" :articles="articles" />
          <ArticleList title="你可能會喜歡" :articles="recArticles" />
        </div>
        <div v-else class="col-span-full lg:col-span-9">
          <ArticleList title="最新文章" :articles="articles" />
          <ArticleList title="精選文章" :articles="selectedArticles" />
          <ArticleList title="你可能會喜歡" :articles="recArticles" />
        </div>
        <div class="col-span-3 hidden lg:block">
          <ArticleSideBar />
        </div>
        <div class="col-span-9 text-center">
          <span class="rounded border-b border-l border-t border-sand-200 py-3">
            <button
              v-for="(p, index) in allPages"
              :key="index"
              class="btn-page border-r border-sand-200 px-4 py-3 hover:bg-secondary hover:text-white"
              :class="nowPage === p ? 'bg-secondary text-white' : 'bg-white text-secondary'"
              @click="handleReading(p)"
            >
              {{ p }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-page:first-child {
  border-radius: 4px 0 0 4px;
}
.btn-page:last-child {
  border-radius: 0 4px 4px 0;
}
</style>
