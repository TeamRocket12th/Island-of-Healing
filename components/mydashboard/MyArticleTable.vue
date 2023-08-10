<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { myWorkStore } from '~/stores/mywork'
import { useWriterBoard } from '~/stores/writerboard'
import { useLoading } from '~/stores/loading'
import { useToast } from '~/stores/toast'

const { showToast } = storeToRefs(useToast())
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

showToast.value = false

const { selectedCategory, selectedYear, selectedMonth, progressTab } = storeToRefs(myWorkStore())
const { selectedArticleIds, postedArticles, allMyArticles } = storeToRefs(useWriterBoard())
const { getMyArticles, delArticle } = useWriterBoard()

const router = useRouter()

if (postedArticles.value.length === 0 && allMyArticles.value.length === 0) {
  setLoading(true)
}

// 取得作家後台文章列表
onMounted(getMyArticles)

interface TableData {
  [property: string]: any
}
const props = defineProps({
  nowPage: {
    type: String,
    default: '',
    validator: (value: string) => {
      const acceptableStrings = ['articleList', 'progress', 'drafts']
      return acceptableStrings.includes(value)
    }
  }
})

const { apiBase, userToken } = useApiConfig()
const articleAnalysis = ref<ArticleData[]>([])

// 刪除文章確認Modal
const showConfirmModal = ref(false)
const selectedArticle = ref<TableData>({})

const confirmDel = (item: TableData) => {
  showConfirmModal.value = true
  selectedArticle.value = item
}

const closeConfirm = (value: boolean) => {
  showConfirmModal.value = value
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = showConfirmModal.value ? 'hidden' : 'auto'
    document.body.style.paddingRight = showConfirmModal.value ? '15px' : '0'
  }
})

const dataLoaded = ref(false)
const { formatDate } = useDateFormat()

// 取得作家後台文章數據
const getAnalysis = async (year: string, month: string) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/articleanalysis/${year}/${month}`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
    })
    if (res.StatusCode === 200) {
      articleAnalysis.value = res.ArticleAnalysisData
      dataLoaded.value = true
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

watchEffect(async () => {
  if (props.nowPage === 'dashboard') {
    await getAnalysis(selectedYear.value, selectedMonth.value)
  }
})

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
  let result = setArticleByCategory(postedArticles.value)
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
    return allMyArticles.value.filter((article) => article.Progress === '草稿')
  } else {
    return setArticleByProgress(allMyArticles.value)
  }
})

const dataWithCheckbox = ref<TableData[]>([])
const progressWithCheckbox = ref<TableData[]>([])

watchEffect(() => {
  dataWithCheckbox.value = filteredArticles.value.map((item) => ({ ...item, isChecked: false }))
  progressWithCheckbox.value = progressList.value.map((item) => ({ ...item, isChecked: false }))
})

// 確認是否可編輯
const checkEdit = (progress: string, id: number) => {
  if (progress === '審核中' || progress === '審核成功') {
    return
  }
  router.push(`/editarticle/${id}`)
}

// 收集選取文章
const collectArticle = (id: number) => {
  if (selectedArticleIds.value.includes(id)) {
    selectedArticleIds.value = selectedArticleIds.value.filter((articleId) => articleId !== id)
  } else {
    selectedArticleIds.value.push(id)
  }
}

// 頁面改變時，重置選取的文章
watchEffect(() => {
  if (props.nowPage) {
    selectedArticleIds.value = []
  }
})

// 刪除單篇文章
const handleRemove = (article: TableData) => {
  showConfirmModal.value = false
  if (article.Progress === '審核中') {
    return
  }
  delArticle(article.Id)
}

const checkPreview = (progress: string, id: number) => {
  if (progress === '審核成功') {
    router.push(`/article/${id}`)
  } else {
    router.push(`/article/${id}?status=preview`)
  }
}
</script>
<template>
  <div class="overflow-x-auto">
    <div class="fixed right-10 top-36 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
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
                  :disabled="item.Progress === '審核中'"
                  type="checkbox"
                  class="hidden"
                  @change="collectArticle(item.Id)"
                />
                <label
                  :for="`checkbox${item.Id}`"
                  class="inline-block h-6 w-6 rounded border border-secondary"
                  :class="
                    item.Progress === '審核中'
                      ? 'cursor-not-allowed bg-gray-200 '
                      : 'cursor-pointer bg-white'
                  "
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
              <span class="cursor-pointer" @click="checkPreview(item.Progress, item.Id)">{{
                item.Title
              }}</span>
            </td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.CollectNum }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ formatDate(item.Initdate) }}</td>
            <td class="py-[10px] text-primary-dark md:w-[14%]">{{ item.CommentNum }}</td>
            <td class="py-[10px] text-primary-dark md:w-[17%]">
              <button
                type="button"
                class="text-scondary disabled:text-btn-disabled"
                :disabled="item.Progress === '審核成功' || item.Progress === '審核中'"
                @click="checkEdit(item.Progress, item.Id)"
              >
                <Icon name="material-symbols:edit-outline" size="24" class="mr-3" />
              </button>
              <button
                type="button"
                class="disabled:text-btn-disabled"
                :disabled="item.Progress === '審核中'"
                @click="confirmDel(item)"
              >
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
                  :disabled="item.Progress === '審核中'"
                  @change="collectArticle(item.Id)"
                />
                <label
                  :for="`checkbox${item.Id}`"
                  class="inline-block h-6 w-6 rounded border border-secondary"
                  :class="
                    item.Progress === '審核中'
                      ? 'cursor-not-allowed bg-gray-200 '
                      : 'cursor-pointer bg-white'
                  "
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
            <td class="w-[31%] py-[10px] text-primary-dark">
              <span class="cursor-pointer" @click="checkPreview(item.Progress, item.Id)">
                {{ item.Title }}
              </span>
            </td>
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
            <td class="w-[14%] py-[10px] text-primary-dark">-</td>
            <td class="w-[14%] py-[10px] text-primary-dark">
              {{ item.Pay ? '付費會員' : '所有人' }}
            </td>
            <td class="w-[17%] py-[10px] text-primary-dark">
              <button
                type="button"
                class="mr-3 disabled:text-btn-disabled"
                :disabled="item.Progress === '審核中' || item.Progress === '審核成功'"
                @click="checkEdit(item.Progress, item.Id)"
              >
                <Icon name="material-symbols:edit-outline" size="24" />
              </button>
              <button
                type="button"
                class="disabled:text-btn-disabled"
                :disabled="item.Progress === '審核中'"
                @click="confirmDel(item)"
              >
                <Icon name="material-symbols:delete-outline" size="24" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody
          v-if="dataWithCheckbox.length === 0 && progressWithCheckbox.length === 0 && !isLoading"
        >
          <tr>
            <td colspan="6" class="pt-10 text-center text-2xl font-medium text-primary">
              找不到文章
            </td>
          </tr>
        </tbody>
        <tbody v-if="articleAnalysis.length > 0 && nowPage === 'dashboard'">
          <tr v-for="article in articleAnalysis" :key="article.Id" class="text-center">
            <td class="w-[31%] py-[10px] text-primary-dark">
              <NuxtLink :to="`/article/${article.Id}`"> {{ article.Title }}</NuxtLink>
            </td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ formatDate(article.Initdate) }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ article.Likes }}</td>
            <td class="w-[14%] py-[10px] text-primary-dark">{{ article.Clicks }}</td>
            <td class="w-[17%] py-[10px] text-primary-dark">{{ article.Comments }}</td>
          </tr>
          <tr v-if="articleAnalysis.length === 0 && !isLoading">
            <td colspan="6" class="pt-10 text-center text-2xl font-medium text-primary">
              找不到文章
            </td>
          </tr>
        </tbody>
      </table>
      <!--刪除確認Modal-->
      <template v-if="showConfirmModal">
        <ConfirmModal @close-confirm="closeConfirm">
          <template #header>
            <h2 class="text-xl text-primary">刪除文章?</h2>
          </template>
          <template #content>
            <p class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
              確定要刪除這篇文章嗎？
            </p>
          </template>
          <template #footer>
            <div class="flex justify-end gap-2 p-3">
              <button
                class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
                @click="showConfirmModal = false"
              >
                取消
              </button>
              <button
                class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
                @click="handleRemove(selectedArticle)"
              >
                確定
              </button>
            </div>
          </template>
        </ConfirmModal>
      </template>
    </div>
  </div>
  <div class="mt-10">
    <LoadingItem v-if="isLoading" />
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #eeeae1;
}
</style>
