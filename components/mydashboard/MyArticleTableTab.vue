<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { myWorkStore } from '~/stores/mywork'
import { useWriterBoard } from '~/stores/writerboard'

const useMyworkStore = myWorkStore()
const { selectedArticleIds } = storeToRefs(useWriterBoard())
const { getMyArticles, delArticle } = useWriterBoard()

const { selectedCategory, postSelectedYear, selectedYear, selectedMonth, progressTab } =
  storeToRefs(useMyworkStore)
const { getCategory, getPostSelectedYear, getYear, getMonth } = useMyworkStore

defineProps({
  nowPage: {
    type: String,
    default: ''
  }
})

const categories = ['個人成長', '情緒察覺', '親密關係', '日常練習']
const years = ['2020', '2021', '2022', '2023']
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const isCategoriesOpen = ref(false)
const isYearsOpen = ref(false)
const isMonthsOpen = ref(false)

const toggleCategories = () => {
  isCategoriesOpen.value = !isCategoriesOpen.value
}

const toggleYears = () => {
  isYearsOpen.value = !isYearsOpen.value
}

const toggleMonths = () => {
  isMonthsOpen.value = !isMonthsOpen.value
}

const reset = () => {
  getCategory('選擇分類')
  getPostSelectedYear('選擇年份')
}

interface TableData {
  [property: string]: any
}

// 刪除選取文章確認Modal
const showConfirmModal = ref(false)
const selectedArticle = ref<TableData>({})

const confrimDel = (item: TableData) => {
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

const handleDelAll = async () => {
  showConfirmModal.value = false
  try {
    await Promise.all(selectedArticleIds.value.map((id: number) => delArticle(id)))
    console.log(selectedArticleIds.value)
    selectedArticleIds.value = []
    await getMyArticles()
  } catch (error: any) {
    console.error(error)
  }
}
</script>
<template>
  <div class="flex w-full justify-between">
    <div v-if="nowPage === 'articleList'" class="mb-2 flex items-center">
      <span
        class="mr-11 cursor-pointer border-b-2 px-2 pb-2 text-primary hover:border-primary"
        :class="
          selectedCategory === '選擇分類' && postSelectedYear === '選擇年份'
            ? 'border-primary'
            : 'border-transparent'
        "
        @click="reset"
        >全部</span
      >
      <div
        class="relative mr-4 flex w-24 cursor-pointer items-center justify-center rounded border border-primary bg-white px-2 py-1 text-primary"
        @click="toggleCategories"
      >
        <span class="text-sm leading-normal">{{ selectedCategory }}</span>
        <Icon name="material-symbols:arrow-drop-down" size="20" />
        <ul
          v-if="isCategoriesOpen"
          class="absolute top-[105%] rounded border border-primary bg-white text-sm"
        >
          <li
            v-for="(category, index) in categories"
            :key="index"
            class="px-4 py-1 hover:bg-secondary hover:text-sand-100"
            :class="{ 'border-b border-[edeae6]': index !== categories.length - 1 }"
            @click="getCategory(category)"
          >
            {{ category }}
          </li>
        </ul>
      </div>
      <div
        class="relative flex cursor-pointer items-center justify-center rounded border border-primary bg-white px-2 py-1 text-primary"
        @click="toggleYears"
      >
        <span class="text-sm leading-normal">{{ postSelectedYear }}</span>
        <Icon name="material-symbols:arrow-drop-down" size="20" />
        <ul
          v-if="isYearsOpen"
          class="absolute top-[105%] rounded border border-primary bg-white text-sm"
        >
          <li
            v-for="(year, index) in years"
            :key="index"
            class="px-4 py-1 hover:bg-secondary hover:text-sand-100"
            :class="{ 'border-b border-[edeae6]': index !== years.length - 1 }"
            @click="getPostSelectedYear(year)"
          >
            {{ year }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="nowPage === 'progress'">
      <ul class="mb-2 flex gap-8 text-sand-300">
        <li
          class="cursor-pointer font-medium md:px-4 md:py-2"
          :class="{ 'border-b-2 border-primary text-primary': progressTab === '全部' }"
          @click="progressTab = '全部'"
        >
          全部
        </li>
        <li
          class="cursor-pointer font-medium md:px-4 md:py-2"
          :class="{ 'border-b-2 border-primary text-primary': progressTab === '待審核' }"
          @click="progressTab = '待審核'"
        >
          待審核
        </li>
        <li
          class="cursor-pointer font-medium md:px-4 md:py-2"
          :class="{ 'border-b-2 border-primary text-primary': progressTab === '審核中' }"
          @click="progressTab = '審核中'"
        >
          審核中
        </li>
        <li
          class="cursor-pointer font-medium md:px-4 md:py-2"
          :class="{ 'border-b-2 border-primary text-primary': progressTab === '審核結果' }"
          @click="progressTab = '審核結果'"
        >
          審核結果
        </li>
      </ul>
    </div>
    <div v-if="nowPage === 'drafts'">
      <span class="mb-2 mr-11 border-b-2 border-primary px-4 pb-2 text-primary">全部</span>
    </div>
    <div v-if="nowPage === 'dashboard'" class="mb-[18px] flex w-full items-center justify-between">
      <p class="text-xl font-medium text-primary">貼文分析</p>
      <div class="flex items-center gap-3">
        <div
          class="relative flex h-8 cursor-pointer items-center justify-center rounded border border-primary bg-white px-2 text-primary"
          @click="toggleYears"
        >
          <span class="w-14 text-center text-sm leading-normal">{{ selectedYear }} 年</span>
          <Icon name="material-symbols:arrow-drop-down" size="20" />
          <ul
            v-if="isYearsOpen"
            class="absolute top-[103%] w-20 rounded border border-primary bg-white text-center text-sm"
          >
            <li
              v-for="(year, index) in years"
              :key="index"
              class="px-4 py-1 hover:bg-secondary hover:text-sand-100"
              :class="{ 'border-b border-[edeae6]': index !== years.length - 1 }"
              @click="getYear(year)"
            >
              {{ year }}
            </li>
          </ul>
        </div>
        <div
          class="relative flex h-8 cursor-pointer items-center rounded border border-primary px-2 text-sm text-primary"
          @click="toggleMonths"
        >
          <span class="w-10 text-center text-sm leading-normal">{{ selectedMonth }} 月</span>
          <Icon name="ic:round-arrow-drop-down" size="24" />
          <ul
            v-if="isMonthsOpen"
            class="absolute top-[103%] h-36 w-16 overflow-y-scroll rounded border border-primary bg-white text-sm"
          >
            <li
              v-for="(month, index) in months"
              :key="index"
              class="px-4 py-1 hover:bg-secondary hover:text-sand-100"
              :class="{ 'border-b border-[edeae6]': index !== months.length - 1 }"
              @click="getMonth(month)"
            >
              {{ month }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button
      v-if="nowPage !== 'dashboard'"
      type="button"
      class="mb-3 rounded bg-secondary px-2 py-1 text-sm text-sand-100 hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white md:h-8"
      @click="confrimDel"
    >
      全部刪除
    </button>
    <template v-if="showConfirmModal">
      <ConfirmModal @close-confirm="closeConfirm">
        <template #header>
          <h2 class="text-xl text-primary">刪除文章?</h2>
        </template>
        <template #content>
          <p class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
            確定要刪除這{{ selectedArticleIds.length }}篇文章嗎？
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
              @click="handleDelAll"
            >
              確定
            </button>
          </div>
        </template>
      </ConfirmModal>
    </template>
  </div>
</template>

<style scoped></style>
