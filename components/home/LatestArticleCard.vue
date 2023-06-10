<script setup>
const data = [
  {
    Classification: '個人成長',
    date: '2023.6.31',
    title: '一起面對並再次茁壯！創傷後成長的 5 種面向',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有邏輯的判斷事件並做出決定。',
    img: ''
  },
  {
    Classification: '情緒察覺',
    date: '2023.6.30',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有邏輯的判斷事件並做出決定。',
    img: ''
  },
  {
    Classification: '親密關係',
    date: '2023.6.30',
    title: '面對不健康家庭關係，讓自己更好過的 5 個調適方式',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有邏輯的判斷事件並做出決定。',
    img: ''
  },
  {
    Classification: '情緒察覺',
    date: '2023.6.20',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有邏輯的判斷事件並做出決定。',
    img: ''
  },
  {
    Classification: '個人成長',
    date: '2023.5.30',
    title: '一起面對並再次茁壯！創傷後成長的 5 種面向',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有邏輯的判斷事件並做出決定。',
    img: ''
  },
  {
    Classification: '親密關係',
    date: '2023.6.19',
    title: '面對不健康家庭關係，讓自己更好過的 5 個調適方式',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有邏輯的判斷事件並做出決定。',
    img: ''
  }
]
</script>
<template>
  <div class="container mb-6 3xl:px-[300px]">
    <h2 class="mb-4 text-[24px] font-bold">最新文章</h2>
    <ul class="flex flex-wrap gap-4">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="flex h-[500px] w-[30%] grow flex-col border p-4 shadow-md"
      >
        <div class="mb-7 flex w-full justify-between">
          <div class="flex flex-col">
            <div class="mb-1 flex">
              <h4 class="font-bold">{{ item.Classification }}</h4>
            </div>
            <p class="text-[12px] text-[#828282]">{{ item.date }}</p>
          </div>
          <div><Icon name="material-symbols:favorite-outline-rounded" size="24" class="" /></div>
        </div>
        <div class="mb-3 text-[16px] font-bold">{{ item.title }}</div>
        <div class="mb-3 text-[14px] text-[#828282]">{{ item.content }}</div>

        <div class="mb-5 h-full w-full bg-[#D9D9D9]"></div>

        <div class="flex items-end justify-end gap-2">
          <div
            class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#CDCDCD]"
          >
            <Icon name="material-symbols:bookmark-outline-rounded" size="16" />
          </div>
          <div
            class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#CDCDCD]"
          >
            <Icon name="mdi:share-variant-outline" size="16" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
