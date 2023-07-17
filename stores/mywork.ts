export const myWorkStore = defineStore('mywork', () => {
  // 作家後台 - 我的文章
  const yearsArr = ref(['2020', '2021', '2022', '2023'])
  const monthsArr = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])

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

  const currentYearIndex = ref(yearsArr.value.indexOf(currentYear))
  const currentMonthIndex = ref(monthsArr.value.indexOf(currentMonth))

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

  // 作家收益
  const incomeYear = ref(currentYear)
  const incomeMonth = ref(currentMonth)

  const getPrevIncomeY = () => {
    if (currentYearIndex.value !== 0) {
      currentYearIndex.value -= 1
    }
  }

  const getNextIncomeY = () => {
    if (currentYearIndex.value !== currentYear.length - 1) {
      currentYearIndex.value += 1
    }
  }

  const getPrevIncomeM = () => {
    if (currentMonthIndex.value !== 0) {
      currentMonthIndex.value -= 1
    }
  }

  const getNextIncomeM = () => {
    if (currentMonthIndex.value !== currentMonth.length - 1) {
      currentMonthIndex.value += 1
    }
  }

  return {
    selectedCategory,
    selectedYear,
    progressTab,
    selectedMonth,
    overviewYear,
    overviewMonth,
    incomeYear,
    incomeMonth,
    getCategory,
    getYear,
    getMonth,
    getOverViewYear,
    getOverViewMonth,
    getPrevIncomeY,
    getNextIncomeY,
    getPrevIncomeM,
    getNextIncomeM,
    yearsArr,
    monthsArr,
    currentYearIndex,
    currentMonthIndex
  }
})
