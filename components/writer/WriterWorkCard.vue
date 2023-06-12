<script setup>
const data = [
  {
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二...',
    articleDate: '2023-06-01'
  },
  {
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二...',
    articleDate: '2023-06-01'
  },
  {
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二...',
    articleDate: '2023-06-01'
  },
  {
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二...',
    articleDate: '2023-06-01'
  },
  {
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二...',
    articleDate: '2023-06-01'
  },
  {
    articleTitle: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    articleSummary:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上第二...',
    articleDate: '2023-06-01'
  }
]
</script>

<template>
  <div class="w-2/3">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <div class="flex px-4">
          <div class="w-2/3">
            <div>
              <h3 class="mb-2 mt-4 font-bold">{{ item.articleTitle }}</h3>
              <p class="mb-[30px] text-[#828282]">{{ item.articleSummary }}</p>
            </div>
            <div class="flex justify-between">
              <p>{{ item.articleDate }}</p>
              <div class="flex items-center gap-1">
                <Icon name="material-symbols:bookmark-outline-rounded" size="16" />
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="ml-4 w-1/3 bg-[#D9D9D9]"></div>
        </div>
        <div class="my-7 w-full border"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
