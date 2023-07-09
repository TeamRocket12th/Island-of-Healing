<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { myWorkStore } from '~/stores/mywork'

const { selectedCategory, selectedYear, progressTab } = storeToRefs(myWorkStore())

interface TableData {
  [property: string]: any
}
const props = defineProps({
  nowPage: {
    type: String,
    default: ''
  }
})

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
const articles = ref<ArticleSummary[]>([])

// const { data: articles, error } = getMockData<ArticleSummary>('account', 'mywork')
// if (error.value) {
//   console.error('Error fetching data: ', error.value)
// }

// 取得作家後台文章列表
const getMyArticles = async () => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/articles`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      articles.value = res.Data
      console.log(articles.value)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

const formatDate = (dateStr: string) => {
  const formatteddate = new Date(dateStr)
  const year = formatteddate.getFullYear()
  const month = (formatteddate.getMonth() + 1).toString().padStart(2, '0')
  const day = formatteddate.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

onMounted(getMyArticles)

// 刪除單篇文章
const delArticle = async (id: number) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/article/delete/${id}`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'DELETE'
    })
    console.log(res)
    if (res.StatusCode === 200) {
      alert(res.Message)
      getMyArticles()
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 依照文章類別篩選
const setArticleByCategory = (articles: ArticleSummary[]) => {
  switch (selectedCategory.value) {
    case '個人成長':
      return articles.filter((article: ArticleSummary) => article.Category === '個人成長')
    case '情緒察覺':
      return articles.filter((article: ArticleSummary) => article.Category === '情緒察覺')
    case '親密關係':
      return articles.filter((article: ArticleSummary) => article.Category === '親密關係')
    case '日常練習':
      return articles.filter((article: ArticleSummary) => article.Category === '日常練習')
    default:
      return articles
  }
}

// 依照文章年份篩選
const setArticleByYear = (articles: ArticleSummary[]) => {
  switch (selectedYear.value) {
    case '2020年':
      return articles.filter((article: ArticleSummary) => article.Initdate.split('-')[0] === '2020')
    case '2021年':
      return articles.filter((article: ArticleSummary) => article.Initdate.split('-')[0] === '2021')
    case '2022年':
      return articles.filter((article: ArticleSummary) => article.Initdate.split('-')[0] === '2022')
    case '2023年':
      return articles.filter((article: ArticleSummary) => article.Initdate.split('-')[0] === '2023')
    case '2024年':
      return articles.filter((article: ArticleSummary) => article.Initdate.split('-')[0] === '2024')
    default:
      return articles
  }
}

const filteredArticles = computed(() => {
  let result = setArticleByCategory(articles.value)
  result = setArticleByYear(result)
  return result
})

const setArticleByProgress = (articles: ArticleSummary[]) => {
  switch (progressTab.value) {
    case '待審核':
      return articles.filter((article) => article.Progress === '待審核')
    case '審核中':
      return articles.filter((article) => article.Progress === '審核中')
    case '審核結果':
      return articles.filter(
        (article) => article.Progress === '審核成功' || article.Progress === '審核失敗'
      )
    case '全部':
      return articles.filter((article) => article.Progress !== '草稿')
    default:
      return articles
  }
}

const progressList = computed(() => {
  if (props.nowPage === 'drafts') {
    console.log(articles.value.filter((article) => article.Progress === '草稿'))
    return articles.value.filter((article) => article.Progress === '草稿')
  } else {
    return setArticleByProgress(articles.value)
  }
})

const dataWithCheckbox = ref<TableData[]>([])
const progressWithCheckbox = ref<TableData[]>([])

watchEffect(() => {
  dataWithCheckbox.value = filteredArticles.value.map((item) => ({ ...item, isChecked: false }))
  progressWithCheckbox.value = progressList.value.map((item) => ({ ...item, isChecked: false }))
})
</script>
<template>
  <div class="overflow-x-auto">
    <div>
      <table class="w-[1240px] md:w-full">
        <thead>
          <tr v-if="nowPage === 'articleList'" class="bg-sand-200 text-primary">
            <th class="py-[10px] font-medium">選取</th>
            <th class="py-[10px] font-medium">文章名稱</th>
            <th class="py-[10px] font-medium">收藏次數</th>
            <th class="py-[10px] font-medium">發佈時間</th>
            <th class="py-[10px] font-medium">留言次數</th>
            <th class="py-[10px] font-medium">操作</th>
          </tr>
          <tr
            v-else-if="nowPage === 'progress' || nowPage === 'drafts'"
            class="bg-sand-200 text-primary"
          >
            <th class="py-[10px] font-medium">選取</th>
            <th class="py-[10px] font-medium">文章名稱</th>
            <th class="py-[10px] font-medium">審核狀態</th>
            <th class="py-[10px] font-medium">發佈時間</th>
            <th class="py-[10px] font-medium">閱讀權限</th>
            <th class="py-[10px] font-medium">操作</th>
          </tr>
          <tr v-else class="bg-sand-200 text-primary">
            <th class="py-[10px] font-medium">文章名稱</th>
            <th class="py-[10px] font-medium">發佈時間</th>
            <th class="py-[10px] font-medium">愛心數</th>
            <th class="py-[10px] font-medium">總點擊</th>
            <th class="py-[10px] font-medium">留言次數</th>
          </tr>
        </thead>
        <tbody v-if="nowPage === 'articleList'">
          <tr v-for="item in dataWithCheckbox" :key="item.Id" class="text-center">
            <td class="px-11 py-[10px] md:w-[10%]">
              <div class="h-6">
                <input
                  :id="`checkbox${item.Id}`"
                  v-model="item.isChecked"
                  type="checkbox"
                  class="hidden"
                />
                <label
                  :for="`checkbox${item.Id}`"
                  class="inline-block h-6 w-6 cursor-pointer rounded border border-secondary bg-white"
                >
                  <Icon
                    v-if="item.isChecked"
                    name="ic:outline-check"
                    class="pb-[6px] text-primary"
                    size="24"
                  />
                </label>
              </div>
            </td>
            <td class="py-[10px] text-primary-dark md:w-[31%]">
              <NuxtLink :to="`/article/${item.Id}`">{{ item.Title }}</NuxtLink>
            </td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.CollectNum }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ formatDate(item.Initdate) }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.CommentNum }}</td>
            <td class="py-[10px] text-primary-dark md:w-[17%]">
              <button type="button">
                <Icon name="material-symbols:edit-outline" size="24" class="mr-3" />
              </button>
              <button type="button" class="mr-3">
                <Icon name="ic:outline-visibility" size="24" />
              </button>
              <button type="button" @click="delArticle(item.Id)">
                <Icon name="material-symbols:delete-outline" size="24" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="nowPage === 'progress' || nowPage === 'drafts'">
          <tr v-for="item in progressWithCheckbox" :key="item.Id" class="text-center">
            <td class="w-[10%] px-11 py-[10px]">
              <div class="h-6">
                <input
                  :id="`checkbox${item.Id}`"
                  v-model="item.isChecked"
                  type="checkbox"
                  class="hidden"
                />
                <label
                  :for="`checkbox${item.Id}`"
                  class="inline-block h-6 w-6 cursor-pointer rounded border border-secondary bg-white"
                >
                  <Icon
                    v-if="item.isChecked"
                    name="ic:outline-check"
                    class="pb-[6px] text-primary"
                    size="24"
                  />
                </label>
              </div>
            </td>
            <td class="w-[31%] py-[10px] text-primary-dark">{{ item.Title }}</td>
            <td
              v-if="nowPage === 'progress'"
              class="w-[14%] py-[10px]"
              :class="{
                'text-primary-dark': item.Progress === '待審核' || item.Progress === '審核中',
                'text-[#198754]': item.Progress === '審核成功',
                'text-[#EF4444]': item.Progress === '審核失敗'
              }"
            >
              <div class="flex items-center justify-center gap-1">
                <span>
                  <Icon
                    v-if="item.Progress === '審核失敗'"
                    name="ic:outline-cancel"
                    size="24"
                    class="text-[#EF4444]"
                  />
                  <Icon
                    v-if="item.Progress === '審核成功'"
                    name="ic:round-check-circle-outline"
                    size="24"
                    class="text-[#198754]"
                  />
                </span>
                {{ item.Progress }}
              </div>
            </td>
            <td v-else class="w-[14%] py-[10px]">-</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ formatDate(item.Initdate) }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">
              {{ item.Pay ? '付費會員' : '所有人' }}
            </td>
            <td class="w-[17%] py-[10px] text-primary-dark">
              <button type="button" class="mr-3">
                <Icon name="material-symbols:edit-outline" size="24" />
              </button>
              <button v-if="nowPage !== 'progress'" type="button" class="mr-3">
                <Icon name="ic:outline-visibility" size="24" />
              </button>
              <button type="button">
                <Icon name="material-symbols:delete-outline" size="24" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="item in articles" :key="item.Id" class="text-center">
            <td class="w-[31%] py-[10px] text-primary-dark">{{ item.Title }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ formatDate(item.Initdate) }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark"></td>
            <td class="w-[14%] py-[10px] text-primary-dark"></td>
            <td class="w-[17%] py-[10px] text-primary-dark">{{ item.CommentNum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #eeeae1;
}
</style>
