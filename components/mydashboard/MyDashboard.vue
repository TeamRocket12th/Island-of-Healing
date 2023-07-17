<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { storeToRefs } from 'pinia'
import { myWorkStore } from '~/stores/mywork'

const { overviewYear, overviewMonth, yearsArr, monthsArr, currentYearIndex, currentMonthIndex } =
  storeToRefs(myWorkStore())
const {
  getOverViewYear,
  getOverViewMonth,
  getPrevIncomeY,
  getNextIncomeY,
  getPrevIncomeM,
  getNextIncomeM
} = myWorkStore()

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent])

// 追蹤人數
const followMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const followYears = ['2020', '2021', '2022', '2023']
const followYearIndex = ref(followYears.length - 1)

const followerOverview = ref<FollowerOverview | null>(null)
const chartMonths = ref<number[]>([])
const chartMonthIndex = ref(11)

const goNextYear = () => {
  if (followYearIndex.value !== followYears.length - 1) {
    followYearIndex.value += 1
  }
}

const goPrevYear = () => {
  if (followYearIndex.value !== 0) {
    followYearIndex.value -= 1
  }
}

// Echarts設定
const option = ref({
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    triggerEvent: true
  },
  yAxis: {
    minInterval: 1
  },
  series: [
    {
      data: chartMonths.value,
      type: 'line',
      areaStyle: {
        color: '#3354F4',
        opacity: 0.4
      },
      smooth: true,
      markLine: {
        silent: true, // 使markLine不觸發事件
        lineStyle: {
          color: 'red' // 提示線的顏色
        },
        data: []
      }
    }
  ],
  tooltip: {
    show: true,
    trigger: 'item'
  }
})

const chartRef: any = ref(null)

const handleClick = (params: any) => {
  if (params.componentType === 'xAxis') {
    chartMonthIndex.value = params.dataIndex // 更新當前選擇的月份
  }
}

const getFollowerOverview = async (year: string) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/numberoffans/${year}`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      followerOverview.value = res.NumberOfFansData
      chartMonths.value = followMonths.map((month) => res.NumberOfFansData[month])
      option.value.series[0].data = chartMonths.value
      chartMonthIndex.value = Number(overviewMonth.value) - 1
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

watchEffect(async () => {
  await getFollowerOverview(followYears[followYearIndex.value])
})

// 收益數據
const trafficIncome = ref(0)
const royaltyIncome = ref(0)

const showYearlyIncome = ref(false)

const toggleShowIncome = () => {
  showYearlyIncome.value = !showYearlyIncome.value
}

const getWriterIncome = async (year: string, month: string) => {
  try {
    const res: ApiResponse = await $fetch(
      `${apiBase}/writer/trafficandroyalty?year=${year}&month=${month}`,
      {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
      }
    )
    console.log(res)
    if (res.StatusCode === 200) {
      trafficIncome.value = Math.round(res.Royalty)
      royaltyIncome.value = Math.round(res.Traffic)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

watchEffect(async () => {
  await getWriterIncome(
    yearsArr.value[currentYearIndex.value],
    monthsArr.value[currentMonthIndex.value]
  )
})

// 文章數據總覽
const isYearsOpen = ref(false)
const isMonthsOpen = ref(false)
const years = ['2020', '2021', '2022', '2023']
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const toggleYears = () => {
  isYearsOpen.value = !isYearsOpen.value
}

const toggleMonths = () => {
  isMonthsOpen.value = !isMonthsOpen.value
}

const writerOverview = ref<WriterOverview | null>(null)

const getWriterOverview = async (year: string, month: string) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/overview/${year}/${month}`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      writerOverview.value = res.OverviewData
      console.log(res.Message)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

watchEffect(async () => {
  await getWriterOverview(overviewYear.value, overviewMonth.value)
})
</script>
<template>
  <div class="grid-cols-12 gap-7 lg:grid">
    <div class="col-span-7 border border-sand-200 pb-3">
      <div class="mb-3 flex items-center justify-between bg-sand-200 p-3">
        <p class="text-xl font-medium text-primary">追蹤人數</p>
        <div>
          <button
            class="mr-3 disabled:text-sand-300"
            :disabled="followYearIndex === 0"
            @click="goPrevYear"
          >
            <Icon name="ic:outline-arrow-back" size="24" />
          </button>
          <button
            class="mr-6 disabled:text-sand-300"
            :disabled="followYearIndex === followYears.length - 1"
            @click="goNextYear"
          >
            <Icon name="ic:outline-arrow-forward" size="24" />
          </button>
          <span
            class="inline-block w-16 rounded bg-secondary py-1 text-center text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            >年</span
          >
        </div>
      </div>
      <div class="flex justify-between">
        <p class="ml-3 text-4xl font-medium leading-normal text-primary">
          {{ followYears[followYearIndex] }} 年
        </p>
        <ul class="flex items-center gap-10 pr-3">
          <li class="flex flex-col items-center">
            <span class="text-secondary">{{ chartMonthIndex + 1 }}月新增</span>
            <span class="text-2xl font-medium">{{ chartMonths[chartMonthIndex] }} 人</span>
          </li>
          <li class="flex flex-col items-center">
            <span class="text-secondary">總人數</span>
            <span class="text-2xl font-medium">{{ followerOverview?.Total }} 人</span>
          </li>
        </ul>
      </div>
      <client-only>
        <v-chart
          v-if="chartMonths.length > 0"
          ref="chartRef"
          class="chart"
          :option="option"
          autoresize
          @click="handleClick"
        />
      </client-only>
    </div>
    <div class="col-span-5 flex flex-col justify-between">
      <div class="mb-2 flex items-center justify-between">
        <h2 v-if="showYearlyIncome" class="text-3xl-plus text-primary">
          {{ yearsArr[currentYearIndex] }}年 回顧
        </h2>
        <h2 v-else class="text-3xl-plus text-primary">
          {{ monthsArr[currentMonthIndex] }}月{{ yearsArr[currentYearIndex] }}年 回顧
        </h2>
        <div class="flex items-center">
          <div v-if="showYearlyIncome">
            <button
              type="button"
              class="mr-3 text-primary disabled:text-sand-300"
              :disabled="currentYearIndex === 0"
              @click="getPrevIncomeY"
            >
              <Icon name="ic:outline-arrow-back" size="24" />
            </button>
            <button
              type="button"
              class="mr-3 text-primary disabled:text-sand-300"
              :disabled="currentYearIndex === yearsArr.length - 1"
              @click="getNextIncomeY"
            >
              <Icon name="ic:outline-arrow-forward" size="24" />
            </button>
          </div>
          <div v-else>
            <button
              type="button"
              class="mr-3 text-primary disabled:text-sand-300"
              :disabled="currentMonthIndex === 0"
              @click="getPrevIncomeM"
            >
              <Icon name="ic:outline-arrow-back" size="24" />
            </button>
            <button
              type="button"
              class="mr-3 text-primary disabled:text-sand-300"
              :disabled="currentMonthIndex === monthsArr.length - 1"
              @click="getNextIncomeM"
            >
              <Icon name="ic:outline-arrow-forward" size="24" />
            </button>
          </div>
          <button
            type="button"
            class="mr-3 w-16 rounded border border-secondary py-1 text-sm font-medium text-secondary hover:bg-secondary hover:text-white"
            :class="{
              'bg-secondary text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white':
                showYearlyIncome
            }"
            @click="toggleShowIncome"
          >
            年
          </button>
          <button
            type="button"
            class="w-16 rounded border border-secondary py-1 text-sm font-medium text-secondary hover:bg-secondary hover:text-white"
            :class="{
              'bg-secondary text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white':
                !showYearlyIncome
            }"
            @click="toggleShowIncome"
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
              {{ royaltyIncome }}
            </span>
            <span v-else class="text-4xl-plus leading-normal text-primary-dark">
              {{ royaltyIncome }}
            </span>
          </li>
          <li class="col-span-1 border border-sand-200 px-6 pb-6 pt-14">
            <span class="mb-[73px] block text-secondary"
              ><Icon name="material-symbols:savings-outline" size="48"
            /></span>
            <p class="text-xl font-medium text-primary">我的稿費</p>
            <span v-if="showYearlyIncome" class="text-4xl-plus leading-normal text-primary-dark">
              {{ trafficIncome }}
            </span>
            <span v-else class="text-4xl-plus leading-normal text-primary-dark">
              {{ trafficIncome }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-full mb-5 py-4">
      <div class="mb-6 flex items-center justify-between">
        <p class="text-xl font-medium text-primary">
          {{ `${overviewYear} 年 - ${overviewMonth} 月` }} 總覽
        </p>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-3">
            <div
              class="relative flex cursor-pointer items-center justify-center rounded border border-primary bg-white px-2 py-1 text-primary"
              @click="toggleYears"
            >
              <span class="w-14 text-center text-sm leading-normal">{{ overviewYear }} 年</span>
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
                  @click="getOverViewYear(year)"
                >
                  {{ year }}
                </li>
              </ul>
            </div>
            <div
              class="relative flex cursor-pointer items-center rounded border border-primary px-2 py-1 text-sm text-primary"
              @click="toggleMonths"
            >
              <span class="w-10 text-center text-sm leading-normal">{{ overviewMonth }} 月</span>
              <Icon name="ic:round-arrow-drop-down" size="24" />
              <ul
                v-if="isMonthsOpen"
                class="absolute top-[105%] h-36 overflow-y-scroll rounded border border-primary bg-white text-sm"
              >
                <li
                  v-for="(month, index) in months"
                  :key="index"
                  class="px-4 py-1 hover:bg-secondary hover:text-sand-100"
                  :class="{ 'border-b border-[edeae6]': index !== months.length - 1 }"
                  @click="getOverViewMonth(month)"
                >
                  {{ month }}
                </li>
              </ul>
            </div>
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
          <tbody v-if="writerOverview">
            <tr class="text-primary-dark">
              <td class="py-3">{{ writerOverview!.TotalArticles }}</td>
              <td class="py-3">{{ writerOverview!.TotalCollects }}</td>
              <td class="py-3">{{ writerOverview!.TotalLikes }}</td>
              <td class="py-3">{{ writerOverview!.TotalComments }}</td>
              <td class="py-3">{{ writerOverview!.TotalInteractions }}</td>
              <td class="py-3">{{ writerOverview!.TotalClicks }}</td>
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
