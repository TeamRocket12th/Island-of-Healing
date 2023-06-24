<script setup lang="ts">
import ArticleList from '~/containers/ArticleList.vue'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
const router = useRouter()

const categories: Record<string, string> = {
  'personal-growth': '個人成長',
  'emotional-awareness': '情緒察覺',
  'intimate-relationships': '親密關係',
  'daily-practice': '日常練習'
}

let categoryValue = router.currentRoute.value.query.category

if (Array.isArray(categoryValue)) {
  categoryValue = categoryValue[0]
}

const category = ref((categoryValue as string) || 'all')

watchEffect(() => {
  let categoryValue = router.currentRoute.value.query.category

  if (Array.isArray(categoryValue)) {
    categoryValue = categoryValue[0]
  }

  category.value = (categoryValue as string) || 'all'
})

const { data: articles, error } = getMockData<ArticleCard>(`article?category=${category.value}`)
if (error.value) {
  console.error('Error fetching data: ', error.value)
}

const recArticles = [
  {
    id: 1,
    imgUrl: 'https://picsum.photos/312/234',
    title: '重拾自我價值：探索內在的力量',
    writer: '李柚子',
    date: '2023-03-20'
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/312/234',
    title: '認識自我與擁抱內在小孩的旅程',
    writer: '莉莉安',
    date: '2023-03-20'
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/312/234',
    title: '別離與成長：好好道別的力量',
    writer: '馬克',
    date: '2023-03-20'
  }
]
</script>

<template>
  <main class="bg-sand-100">
    <section class="container">
      <div class="grid grid-cols-12 gap-6 border-t border-primary pb-40 pt-10">
        <div v-if="category !== 'all'" class="col-span-9">
          <ArticleList :title="categories[category]" :articles="articles" />
          <ArticleList title="你可能會喜歡" :articles="recArticles" />
        </div>
        <div v-else class="col-span-9">
          <ArticleList title="最新文章" :articles="articles" />
          <ArticleList title="精選文章" :articles="recArticles" />
          <ArticleList title="你可能會喜歡" :articles="recArticles" />
        </div>
        <ArticleSideBar />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
