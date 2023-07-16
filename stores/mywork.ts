export const myWorkStore = defineStore('mywork', () => {
  // 作家後台 - 我的文章
  const selectedCategory = ref('選擇分類')
  const getCategory = (category: string) => {
    selectedCategory.value = category
  }
  // 作家後台 - 審核進度
  const progressTab = ref('全部')

  // 貼文分析
  // 取得當下的年和月
  const date = new Date()
  const currentYear = date.getFullYear().toString()
  const currentMonth = (date.getMonth() + 1).toString()

  const selectedYear = ref(currentYear)
  const selectedMonth = ref(currentMonth)

  const getYear = (year: string) => {
    selectedYear.value = year
  }

  const getMonth = (month: string) => {
    selectedMonth.value = month
  }

  // 數據總覽
  const overviewYear = ref(currentYear)
  const overviewMonth = ref(currentMonth)

  const getOverViewYear = (year: string) => {
    overviewYear.value = year
  }

  const getOverViewMonth = (month: string) => {
    overviewMonth.value = month
  }

  return {
    selectedCategory,
    selectedYear,
    progressTab,
    selectedMonth,
    overviewYear,
    overviewMonth,
    getCategory,
    getYear,
    getMonth,
    getOverViewYear,
    getOverViewMonth
  }
})
