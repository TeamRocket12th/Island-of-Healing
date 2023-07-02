<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { myWorkStore } from '~/stores/mywork'

const { selectedCategory, selectedYear, progressTab } = storeToRefs(myWorkStore())

interface TableData {
  [property: string]: any
}
defineProps({
  nowPage: {
    type: String,
    default: ''
  }
})

const { data: articles, error } = getMockData<ArticleSummary>('account', 'mywork')
if (error.value) {
  console.error('Error fetching data: ', error.value)
}

// 依照文章類別篩選
const setArticleByCategory = (articles: ArticleSummary[]) => {
  switch (selectedCategory.value) {
    case '個人成長':
      return articles.filter((article: ArticleSummary) => article.category === '個人成長')
    case '情緒察覺':
      return articles.filter((article: ArticleSummary) => article.category === '情緒察覺')
    case '親密關係':
      return articles.filter((article: ArticleSummary) => article.category === '親密關係')
    case '日常練習':
      return articles.filter((article: ArticleSummary) => article.category === '日常練習')
    default:
      return articles
  }
}

// 依照文章年份篩選
const setArticleByYear = (articles: ArticleSummary[]) => {
  switch (selectedYear.value) {
    case '2020年':
      return articles.filter(
        (article: ArticleSummary) => article.publishDate.split('-')[0] === '2020'
      )
    case '2021年':
      return articles.filter(
        (article: ArticleSummary) => article.publishDate.split('-')[0] === '2021'
      )
    case '2022年':
      return articles.filter(
        (article: ArticleSummary) => article.publishDate.split('-')[0] === '2022'
      )
    case '2023年':
      return articles.filter(
        (article: ArticleSummary) => article.publishDate.split('-')[0] === '2023'
      )
    case '2024年':
      return articles.filter(
        (article: ArticleSummary) => article.publishDate.split('-')[0] === '2024'
      )
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
      return articles.filter((article) => article.progress === '待審核')
    case '審核中':
      return articles.filter((article) => article.progress === '審核中')
    case '審核結果':
      return articles.filter(
        (article) => article.progress === '審核成功' || article.progress === '審核失敗'
      )
    default:
      return articles
  }
}

const progressList = computed(() => {
  return setArticleByProgress(articles.value)
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
            <th class="py-[10px] font-medium">選取</th>
            <th class="py-[10px] font-medium">文章名稱</th>
            <th class="py-[10px] font-medium">發佈時間</th>
            <th class="py-[10px] font-medium">愛心數</th>
            <th class="py-[10px] font-medium">總點擊</th>
            <th class="py-[10px] font-medium">留言次數</th>
          </tr>
        </thead>
        <tbody v-if="nowPage === 'articleList'">
          <tr v-for="item in dataWithCheckbox" :key="item.id" class="text-center">
            <td class="px-11 py-[10px] md:w-[10%]">
              <div class="h-6">
                <input
                  :id="`checkbox${item.id}`"
                  v-model="item.isChecked"
                  type="checkbox"
                  class="hidden"
                />
                <label
                  :for="`checkbox${item.id}`"
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
            <td class="py-[10px] text-primary-dark md:w-[31%]">{{ item.title }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.collectNum }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.publishDate }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.commentNum }}</td>
            <td class="py-[10px] text-primary-dark md:w-[17%]">
              <button type="button">
                <Icon name="material-symbols:edit-outline" size="24" class="mr-3" />
              </button>
              <button type="button" class="mr-3">
                <Icon name="ic:outline-visibility" size="24" />
              </button>
              <button type="button">
                <Icon name="material-symbols:delete-outline" size="24" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="nowPage === 'progress' || nowPage === 'drafts'">
          <tr v-for="item in progressWithCheckbox" :key="item.id" class="text-center">
            <td class="w-[10%] px-11 py-[10px]">
              <div class="h-6">
                <input
                  :id="`checkbox${item.id}`"
                  v-model="item.isChecked"
                  type="checkbox"
                  class="hidden"
                />
                <label
                  :for="`checkbox${item.id}`"
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
            <td class="w-[31%] py-[10px] text-primary-dark">{{ item.title }}</td>
            <td
              v-if="nowPage === 'progress'"
              class="w-[14%] py-[10px]"
              :class="{
                'text-primary-dark': item.progress === '待審核' || item.progress === '審核中',
                'text-[#198754]': item.progress === '審核成功',
                'text-[#EF4444]': item.progress === '審核失敗'
              }"
            >
              <div class="flex items-center justify-center gap-1">
                <span>
                  <Icon
                    v-if="item.progress === '審核失敗'"
                    name="ic:outline-cancel"
                    size="24"
                    class="text-[#EF4444]"
                  />
                  <Icon
                    v-if="item.progress === '審核成功'"
                    name="ic:round-check-circle-outline"
                    size="24"
                    class="text-[#198754]"
                  />
                </span>

                {{ item.progress }}
              </div>
            </td>
            <td v-else class="w-[14%] py-[10px]">-</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ item.publishDate }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ item.permission }}</td>
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
          <tr v-for="item in articles" :key="item.id" class="text-center">
            <td class="w-[10%] px-11 py-[10px]">
              <input type="checkbox" class="mt-1 h-4 w-4 cursor-pointer" />
            </td>
            <td class="w-[31%] py-[10px] text-primary-dark">{{ item.title }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ item.publishDate }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ item.likeNum }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ item.clickNum }}</td>
            <td class="w-[17%] py-[10px] text-primary-dark">{{ item.commentNum }}</td>
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
