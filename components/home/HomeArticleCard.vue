<script setup>
const data = [
  {
    type: '情緒察覺',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    description:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有...'
  },
  {
    type: '情緒察覺',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    description:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有...'
  },
  {
    type: '情緒察覺',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    description:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有...'
  }
]
</script>
<template>
  <section class="container">
    <div class="mb-[296px] border-r">
      <h2 class="border-l border-t py-9 pl-4">精選文章</h2>
      <ul class="flex border-b border-t">
        <li v-for="(item, index) in data" :key="index" class="w-1/3 border-l px-4 py-4">
          <div>
            <div class="relative mb-2 h-[247px] bg-[#CDCDCD]">
              <Icon
                name="material-symbols:favorite-outline-rounded"
                size="24"
                class="absolute right-0 top-0 mr-3 mt-3"
              />
            </div>
          </div>
          <div>
            <div class="mb-2 flex">
              <div class="flex w-[20%] items-center justify-center bg-[#CDCDCD]">
                <span class="text-sm">情緒察覺</span>
              </div>
              <p class="w-[80%] pl-2">打破 3 種常見的「認知偏見」，從自我覺察開始</p>
            </div>
            <p>
              心理學家 Amos Tversky 和 Daniel Kahneman 在 1970
              年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有...
            </p>
            <div class="flex justify-end gap-2">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#CDCDCD]">
                <Icon name="material-symbols:bookmark-outline-rounded" size="16" />
              </div>
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#CDCDCD]">
                <Icon name="mdi:share-variant-outline" size="16" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="flex justify-center border-b border-l py-9">
        <p>閱讀更多</p>
        <Icon name="ic:round-chevron-right" size="24" />
      </div>
    </div>
  </section>
</template>
