<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { myWorkStore } from '~/stores/mywork'
const useMyworkStore = myWorkStore()

const { selectedCategory, selectedYear, progressTab } = storeToRefs(useMyworkStore)
const { getCategory, getYear } = useMyworkStore

defineProps<{ nowPage: string }>()
const categories = ['個人成長', '情緒察覺', '親密關係', '日常練習']
const years = ['2020年', '2021年', '2022年', '2023年']
const isCategoriesOpen = ref(false)
const isYearsOpen = ref(false)

const toggleCategories = () => {
  isCategoriesOpen.value = !isCategoriesOpen.value
}

const toggleYears = () => {
  isYearsOpen.value = !isYearsOpen.value
}

const reset = () => {
  getCategory('選擇分類')
  getYear('選擇年份')
}
</script>
<template>
  <div class="flex w-full justify-between">
    <div v-if="nowPage === 'articleList'" class="mb-2 flex items-center">
      <span
        class="mr-11 cursor-pointer px-2 pb-2 text-primary"
        :class="{
          'border-b-2 border-primary':
            selectedCategory === '選擇分類' && selectedYear === '選擇年份'
        }"
        @click="reset"
        >全部</span
      >
      <div
        class="relative mr-4 flex cursor-pointer items-center justify-center rounded border border-primary bg-white px-2 py-1 text-primary"
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
        <span class="text-sm leading-normal">{{ selectedYear }}</span>
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
            @click="getYear(year)"
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
        <!-- <div
          class="flex cursor-pointer items-center rounded border border-primary px-2 py-1 text-sm text-primary"
        >
          選擇年份<Icon name="ic:round-arrow-drop-down" size="24" />
        </div> -->
        <div
          class="relative flex cursor-pointer items-center justify-center rounded border border-primary bg-white px-2 py-1 text-primary"
          @click="toggleYears"
        >
          <span class="text-sm leading-normal">{{ selectedYear }}</span>
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
              @click="getYear(year)"
            >
              {{ year }}
            </li>
          </ul>
        </div>
        <div
          class="flex cursor-pointer items-center rounded border border-primary px-2 py-1 text-sm text-primary"
        >
          選擇月份<Icon name="ic:round-arrow-drop-down" size="24" />
        </div>
      </div>
    </div>
    <button
      v-if="nowPage !== 'dashboard'"
      type="button"
      class="mb-3 rounded bg-secondary px-2 py-1 text-sm text-sand-100 md:h-8"
    >
      全部刪除
    </button>
  </div>
</template>

<style scoped></style>
