<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

defineProps({
  writerStats: {
    type: Object as () => WriterStats,
    required: true
  }
})

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent])

const option = ref({
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {},
  series: [
    {
      data: [20, 15, 30, 20, 30, 33, 38, 25, 33, 24, 20, 15],
      type: 'line',
      areaStyle: {
        color: '#3354F4',
        opacity: 0.4
      },
      smooth: true
    }
  ],
  tooltip: {
    show: true,
    trigger: 'item'
  }
})

const income = [
  {
    year: '2022',
    monthly: [
      {
        month: '1月',
        flowIncome: 200,
        paperIncome: 400
      },
      {
        month: '2月',
        flowIncome: 400,
        paperIncome: 500
      },
      {
        month: '3月',
        flowIncome: 300,
        paperIncome: 500
      },
      {
        month: '4月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '5月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '6月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '7月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '8月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '9月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '10月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '11月',
        flowIncome: 200,
        paperIncome: 500
      },
      {
        month: '12月',
        flowIncome: 200,
        paperIncome: 500
      }
    ]
  },
  {
    year: '2023',
    monthly: [
      {
        month: '1月',
        flowIncome: 200,
        paperIncome: 400
      },
      {
        month: '2月',
        flowIncome: 400,
        paperIncome: 500
      },
      {
        month: '3月',
        flowIncome: 300,
        paperIncome: 500
      },
      {
        month: '4月',
        flowIncome: 200,
        paperIncome: 500
      }
    ]
  }
]

const followers = [
  {
    year: '2021',
    monthly: [
      {
        month: '1月',
        followersCount: 20
      },
      {
        month: '2月',
        followersCount: 20
      },
      {
        month: '3月',
        followersCount: 20
      },
      {
        month: '4月',
        followersCount: 20
      },
      {
        month: '5月',
        followersCount: 20
      },
      {
        month: '6月',
        followersCount: 20
      },
      {
        month: '7月',
        followersCount: 30
      },
      {
        month: '8月',
        followersCount: 70
      },
      {
        month: '9月',
        followersCount: 60
      },
      {
        month: '10月',
        followersCount: 40
      },
      {
        month: '11月',
        followersCount: 30
      },
      {
        month: '12月',
        followersCount: 50
      }
    ]
  },
  {
    year: '2022',
    monthly: [
      {
        month: '1月',
        followersCount: 20
      },
      {
        month: '2月',
        followersCount: 20
      },
      {
        month: '3月',
        followersCount: 20
      },
      {
        month: '4月',
        followersCount: 20
      },
      {
        month: '5月',
        followersCount: 20
      },
      {
        month: '6月',
        followersCount: 20
      },
      {
        month: '7月',
        followersCount: 30
      },
      {
        month: '8月',
        followersCount: 70
      },
      {
        month: '9月',
        followersCount: 60
      },
      {
        month: '10月',
        followersCount: 40
      },
      {
        month: '11月',
        followersCount: 30
      },
      {
        month: '12月',
        followersCount: 50
      }
    ]
  },
  {
    year: '2023',
    monthly: [
      {
        month: '1月',
        followersCount: 10
      },
      {
        month: '2月',
        followersCount: 30
      },
      {
        month: '3月',
        followersCount: 30
      },
      {
        month: '4月',
        followersCount: 30
      },
      {
        month: '5月',
        followersCount: 40
      },
      {
        month: '6月',
        followersCount: 80
      },
      {
        month: '7月',
        followersCount: 70
      },
      {
        month: '8月',
        followersCount: 60
      }
    ]
  }
]

const selectedYearIndex = ref(income.length - 1)
const selectedMonthIndex = ref(income[selectedYearIndex.value].monthly.length - 1)
const selectedIncome = computed(
  () => income[selectedYearIndex.value].monthly[selectedMonthIndex.value]
)
const selectedYear = computed(() => income[selectedYearIndex.value].year)
const selectedMonth = computed(() => selectedIncome.value.month)

const hasPrevMonth = computed(() => selectedMonthIndex.value > 0 || selectedYearIndex.value > 0)
const hasNextMonth = computed(
  () =>
    selectedMonthIndex.value < income[selectedYearIndex.value].monthly.length - 1 ||
    selectedYearIndex.value < income.length - 1
)
const prevMonth = () => {
  if (selectedMonthIndex.value > 0) {
    selectedMonthIndex.value--
  } else if (selectedYearIndex.value > 0) {
    selectedYearIndex.value--
    selectedMonthIndex.value = income[selectedYearIndex.value].monthly.length - 1
  }
}

const nextMonth = () => {
  if (selectedMonthIndex.value < income[selectedYearIndex.value].monthly.length - 1) {
    selectedMonthIndex.value++
  } else if (selectedYearIndex.value < income.length - 1) {
    selectedYearIndex.value++
    selectedMonthIndex.value = 0
  }
}

const showYearlyIncome = ref(false)
const yearlyIncome = ref({ flowIncome: 0, paperIncome: 0 })

const sumYearlyIncome = () => {
  showYearlyIncome.value = true
  yearlyIncome.value = income[selectedYearIndex.value].monthly.reduce(
    (acc, cur) => {
      acc.flowIncome += cur.flowIncome
      acc.paperIncome += cur.paperIncome
      return acc
    },
    { flowIncome: 0, paperIncome: 0 }
  )
}

const showMonthlyIncome = () => {
  showYearlyIncome.value = false
}

const data = reactive([
  {
    id: '1',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    category: '個人成長',
    publishDate: '2020-05-27',
    progress: '待審核',
    collectNum: 324,
    commentNum: 58,
    likeNum: 130,
    clickNum: 200,
    permission: '所有人'
  },
  {
    id: '2',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    category: '個人成長',
    publishDate: '2021-05-27',
    progress: '審核中',
    collectNum: 324,
    commentNum: 58,
    likeNum: 130,
    clickNum: 200,
    permission: '所有人'
  },
  {
    id: '3',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    category: '情緒察覺',
    publishDate: '2022-05-27',
    progress: '審核成功',
    collectNum: 324,
    commentNum: 58,
    likeNum: 130,
    clickNum: 200,
    permission: '付費會員'
  },
  {
    id: '4',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    category: '親密關係',
    publishDate: '2023-05-27',
    progress: '審核成功',
    collectNum: 324,
    commentNum: 58,
    likeNum: 130,
    clickNum: 200,
    permission: '付費會員'
  },
  {
    id: '5',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    category: '日常練習',
    publishDate: '2023-05-27',
    progress: '審核失敗',
    collectNum: 324,
    commentNum: 58,
    likeNum: 130,
    clickNum: 200,
    permission: '付費會員'
  },
  {
    id: '6',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    category: '日常練習',
    publishDate: '2024-05-27',
    progress: '審核失敗',
    collectNum: 324,
    commentNum: 58,
    likeNum: 130,
    clickNum: 200,
    permission: '付費會員'
  }
])

interface Stats {
  [key: string]: {
    articleCount: number
    collectNum: number
    commentNum: number
    likeNum: number
    clickNum: number
    interaction: number
  }
}

const stats = computed(() => {
  const yearlyStats: Stats = {}
  const monthlyStats: Stats = {}
  data.forEach((item) => {
    const date = new Date(item.publishDate)
    const year = date.getFullYear()
    const month = `${year}-${date.getMonth() + 1}`

    if (!yearlyStats[year]) {
      yearlyStats[year] = {
        articleCount: 0,
        collectNum: 0,
        commentNum: 0,
        likeNum: 0,
        clickNum: 0,
        interaction: 0
      }
    }
    yearlyStats[year].articleCount++
    yearlyStats[year].collectNum += item.collectNum
    yearlyStats[year].commentNum += item.commentNum
    yearlyStats[year].likeNum += item.likeNum
    yearlyStats[year].clickNum += item.clickNum

    if (!monthlyStats[month]) {
      monthlyStats[month] = {
        articleCount: 0,
        collectNum: 0,
        commentNum: 0,
        likeNum: 0,
        clickNum: 0,
        interaction: 0
      }
    }
    monthlyStats[month].articleCount++
    monthlyStats[month].collectNum += item.collectNum
    monthlyStats[month].commentNum += item.commentNum
    monthlyStats[month].likeNum += item.likeNum
    monthlyStats[month].clickNum += item.clickNum
  })

  const followerCount = 1590
  const totalStats = data.reduce(
    (acc, item) => {
      acc.articleCount++
      acc.collectNum += item.collectNum
      acc.commentNum += item.commentNum
      acc.likeNum += item.likeNum
      acc.clickNum += item.clickNum
      acc.interaction = Math.round(
        ((acc.likeNum + acc.commentNum + acc.collectNum) / followerCount) * 100
      )
      return acc
    },
    { articleCount: 0, collectNum: 0, commentNum: 0, likeNum: 0, clickNum: 0, interaction: 0 }
  )

  return { yearlyStats, monthlyStats, totalStats }
})
</script>
<template>
  <div class="grid-cols-12 gap-7 lg:grid">
    <div class="col-span-7 border border-sand-200 pb-3">
      <div class="mb-3 flex items-center justify-between bg-sand-200 p-3">
        <p class="text-xl font-medium text-primary">追蹤人數</p>
        <div>
          <span class="mr-3 cursor-pointer"> <Icon name="ic:outline-arrow-back" size="24" /></span>
          <span class="mr-6 cursor-pointer"
            ><Icon name="ic:outline-arrow-forward" size="24"
          /></span>
          <span class="inline-block w-16 rounded bg-secondary py-1 text-center text-sm text-white"
            >年</span
          >
        </div>
      </div>
      <div class="flex justify-between">
        <p class="ml-3 text-4xl font-medium leading-normal text-primary">2023年</p>
        <ul class="flex items-center gap-10 pr-3">
          <li class="flex flex-col items-center">
            <span class="text-secondary">本日新增</span>
            <span class="text-2xl font-medium">{{ writerStats.totalFollowers }} 人</span>
          </li>
          <li class="flex flex-col items-center">
            <span class="text-secondary">本月新增</span>
            <span class="text-2xl font-medium">{{ writerStats.totalFollowers }} 人</span>
          </li>
          <li class="flex flex-col items-center">
            <span class="text-secondary">總人數</span>
            <span class="text-2xl font-medium">{{ writerStats.totalFollowers }} 人</span>
          </li>
        </ul>
      </div>
      <client-only>
        <v-chart class="chart" :option="option" autoresize />
      </client-only>
    </div>
    <div class="col-span-5 flex flex-col justify-between">
      <div class="mb-2 flex items-center justify-between">
        <h2 v-if="showYearlyIncome" class="text-3xl-plus text-primary">
          {{ selectedYear }}年 回顧
        </h2>
        <h2 v-else class="text-3xl-plus text-primary">{{ selectedMonth }} 回顧</h2>
        <div>
          <button
            type="button"
            class="mr-3 text-primary disabled:text-sand-300"
            :disabled="!hasPrevMonth"
            @click="prevMonth"
          >
            <Icon name="ic:outline-arrow-back" size="24" />
          </button>
          <button
            type="button"
            class="mr-3 text-primary disabled:text-sand-300"
            :disabled="!hasNextMonth"
            @click="nextMonth"
          >
            <Icon name="ic:outline-arrow-forward" size="24" />
          </button>
          <button
            type="button"
            class="mr-3 w-16 rounded bg-secondary py-1 text-sm font-medium text-white"
            @click="sumYearlyIncome"
          >
            年
          </button>
          <button
            type="button"
            class="w-16 rounded bg-secondary py-1 text-sm font-medium text-white"
            @click="showMonthlyIncome"
          >
            月
          </button>
        </div>
      </div>
      <div>
        <ul class="grid grid-cols-2 gap-7">
          <li class="col-span-1 border border-sand-200 px-6 pb-6 pt-14">
            <span class="mb-[73px] block text-secondary"
              ><Icon name="ic:outline-travel-explore" size="48"
            /></span>
            <p class="text-xl font-medium text-primary">流量收益</p>
            <span v-if="showYearlyIncome" class="text-4xl-plus leading-normal text-primary-dark">
              {{ yearlyIncome.flowIncome }}
            </span>
            <span v-else class="text-4xl-plus leading-normal text-primary-dark">
              {{ selectedIncome.flowIncome }}
            </span>
          </li>
          <li class="col-span-1 border border-sand-200 px-6 pb-6 pt-14">
            <span class="mb-[73px] block text-secondary"
              ><Icon name="material-symbols:savings-outline" size="48"
            /></span>
            <p class="text-xl font-medium text-primary">我的稿費</p>
            <span v-if="showYearlyIncome" class="text-4xl-plus leading-normal text-primary-dark">
              {{ yearlyIncome.paperIncome }}
            </span>
            <span v-else class="text-4xl-plus leading-normal text-primary-dark">
              {{ selectedIncome.paperIncome }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-full mb-5 py-4">
      <div class="mb-6 flex items-center justify-between">
        <p class="text-xl font-medium text-primary">總覽</p>
        <div class="flex items-center gap-3">
          <div
            class="flex cursor-pointer items-center rounded border border-primary px-2 py-1 text-sm text-primary"
          >
            選擇年份<Icon name="ic:round-arrow-drop-down" size="24" />
          </div>
          <div
            class="flex cursor-pointer items-center rounded border border-primary px-2 py-1 text-sm text-primary"
          >
            選擇月份<Icon name="ic:round-arrow-drop-down" size="24" />
          </div>
        </div>
      </div>
      <div class="border-b border-sand-200">
        <table class="w-full text-center">
          <thead>
            <tr class="bg-sand-200 font-medium text-primary">
              <th class="py-3">總文章數</th>
              <th class="py-3">總收藏數</th>
              <th class="py-3">總愛心數</th>
              <th class="py-3">總留言次數</th>
              <th class="py-3">互動數</th>
              <th class="py-3">總點擊</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-primary-dark">
              <td class="py-3">{{ stats.totalStats.articleCount }}</td>
              <td class="py-3">{{ stats.totalStats.collectNum }}</td>
              <td class="py-3">{{ stats.totalStats.likeNum }}</td>
              <td class="py-3">{{ stats.totalStats.commentNum }}</td>
              <td class="py-3">{{ stats.totalStats.interaction }}</td>
              <td class="py-3">{{ stats.totalStats.clickNum }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 250px;
}
</style>
