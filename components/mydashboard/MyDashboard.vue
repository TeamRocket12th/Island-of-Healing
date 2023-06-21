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
  ]
})
</script>
<template>
  <div class="grid grid-cols-12 gap-7">
    <div class="col-span-6 border border-[#D9D9D9] pb-3">
      <div class="flex justify-between">
        <p class="ml-3 text-4xl font-medium leading-normal">2023年</p>
        <div class="flex flex-col items-center">
          <span>總人數</span>
          <span class="text-2xl font-medium">{{ writerStats.totalFollowers }}人</span>
        </div>
      </div>
      <client-only>
        <v-chart class="chart" :option="option" />
      </client-only>
    </div>
    <div class="col-span-6">
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-2xl">4月 回顧</h2>
        <div>
          <button type="button" class="mr-3">
            <Icon name="ic:outline-arrow-back" size="24" />
          </button>
          <button type="button" class="mr-3">
            <Icon name="ic:outline-arrow-forward" size="24" />
          </button>
          <button type="button" class="mr-3 rounded bg-[#9F9F9F] px-8 py-1 font-medium text-white">
            年
          </button>
          <button type="button" class="rounded bg-[#9F9F9F] px-8 py-1 font-medium text-white">
            月
          </button>
        </div>
      </div>
      <div class="col-span-6">
        <ul class="grid grid-cols-2 gap-7">
          <li class="col-span-1 border border-[#D9D9D9] px-6 pb-6 pt-14">
            <span class="mb-[73px] block"><Icon name="ic:outline-travel-explore" size="48" /></span>
            <p class="text-xl font-medium">流量收益</p>
            <span class="text-5xl leading-normal text-[#9F9F9F]">500</span>
          </li>
          <li class="col-span-1 border border-[#D9D9D9] px-6 pb-6 pt-14">
            <span class="mb-[73px] block"
              ><Icon name="material-symbols:savings-outline" size="48"
            /></span>
            <p class="text-xl font-medium">我的稿費</p>
            <span class="text-5xl leading-normal text-[#9F9F9F]">500</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-full mb-5 border border-[#D9D9D9] py-4">
      <div class="mb-6 flex items-center justify-between px-4">
        <p class="font-medium">總覽</p>
        <div class="flex items-center gap-3">
          <div
            class="flex cursor-pointer items-center rounded-lg border border-[#828282] px-2 py-1 text-sm text-[#828282]"
          >
            選擇年份<Icon name="ic:round-arrow-drop-down" size="24" />
          </div>
          <div
            class="flex cursor-pointer items-center rounded-lg border border-[#828282] px-2 py-1 text-sm text-[#828282]"
          >
            選擇月份<Icon name="ic:round-arrow-drop-down" size="24" />
          </div>
        </div>
      </div>
      <div class="border-b border-[#f9f9f9]">
        <table class="w-full text-center">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-3">總文章數</th>
              <th class="py-3">總收藏數</th>
              <th class="py-3">總愛心數</th>
              <th class="py-3">總留言次數</th>
              <th class="py-3">互動數</th>
              <th class="py-3">總點擊</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3">{{ writerStats.totalArticles }}</td>
              <td class="py-3">{{ writerStats.totalCollection }}</td>
              <td class="py-3">{{ writerStats.totalLikes }}</td>
              <td class="py-3">{{ writerStats.totalComments }}</td>
              <td class="py-3">{{ writerStats.totalInteractions }}</td>
              <td class="py-3">{{ writerStats.totalClicks }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 330px;
}
</style>
