<script setup>
const data = [
  {
    role: '心理諮商師',
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二步是主動尋求多元性和不同觀點。與各種不同背景和經歷的人互動，聆聽他們的故事...',
    articleDate: '2023-06-01'
  },
  {
    role: '心理諮商師',
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二步是主動尋求多元性和不同觀點。與各種不同背景和經歷的人互動，聆聽他們的故事...',
    articleDate: '2023-06-01'
  },
  {
    role: '心理諮商師',
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二步是主動尋求多元性和不同觀點。與各種不同背景和經歷的人互動，聆聽他們的故事...',
    articleDate: '2023-06-01'
  },
  {
    role: '心理諮商師',
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二步是主動尋求多元性和不同觀點。與各種不同背景和經歷的人互動，聆聽他們的故事...',
    articleDate: '2023-06-01'
  }
]
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index" class="pt-3">
        <div class="mb-3 flex items-center gap-1 px-6">
          <div class="h-4 w-4 rounded-full bg-[#D9D9D9]"></div>
          <span class="text-sm">{{ item.role }}</span>
        </div>
        <div class="flex gap-3 px-6">
          <div>
            <div class="w-5/6">
              <h3 class="mb-2 font-bold">{{ item.articleTitle }}</h3>
              <p class="mb-2 text-[#828282]">{{ item.articleSummary }}</p>
            </div>
            <div class="flex justify-between">
              <p>{{ item.articleDate }}</p>
              <div class="flex items-center gap-1">
                <Icon name="material-symbols:bookmark-outline-rounded" size="16" />
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="w-1/5 bg-[#D9D9D9]"></div>
        </div>
        <div class="my-7 w-full border"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
