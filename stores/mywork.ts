export const myWorkStore = defineStore('mywork', () => {
  // 作家後台 - 我的文章
  const selectedCategory = ref('選擇分類')
  const selectedYear = ref('選擇時間')

  const getCategory = (category: string) => {
    selectedCategory.value = category
  }

  const getYear = (year: string) => {
    selectedYear.value = year
  }

  // 作家後台 - 審核進度
  const progressTab = ref('全部')

  return { selectedCategory, selectedYear, progressTab, getCategory, getYear }
})
