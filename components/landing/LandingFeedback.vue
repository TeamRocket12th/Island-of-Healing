<script setup lang="ts">
const feedBacks1 = [
  {
    id: 1,
    imgName: 'user1',
    name: '奧斯丁',
    position: '文字工作者',
    content:
      '我喜歡這個平台提供的標籤功能，讓我的讀者可以更輕鬆地找到我的文章。這個平台不僅提供了一個創作的舞台，我還在這裡與其他作家交流和分享經驗，這對我來說非常寶貴。'
  },
  {
    id: 2,
    imgName: 'user2',
    name: '章家齊',
    position: '心理諮商師',
    content:
      '我們來自四面八方，但都在 小島 相遇。友善的網路閱讀環境、多元且含金量高的閱讀內容，閱讀者付費的機制讓彼此更能珍惜所有的資源並細細品味。'
  },
  {
    id: 3,
    imgName: 'user3',
    name: '艾蜜莉',
    position: '學術工作者',
    content:
      '使用這個寫作平台已經一段時間了，它為我提供了一個完美的創作環境。我喜歡它直覺式的編輯工具和多平台同步功能，這使得我可以在不同的設備上隨時隨地進行寫作。感謝這個平台，我能夠更輕鬆地專注於我的創作。'
  },
  {
    id: 4,
    imgName: 'user4',
    name: '馬克',
    position: '社會評論者',
    content:
      '小島聊癒所幫助我建立了個人品牌，讓我能夠將我的想法和故事傳遞給更廣大的讀者。它的社群互動讓我能夠與其他部落客和讀者交流，這激發了我更多的創作靈感。'
  }
]
const feedBacks2 = [
  {
    id: 5,
    imgName: 'user5',
    name: '章家齊',
    position: '心理諮商師',
    content:
      '我喜歡這個平台提供的標籤功能，讓我的讀者可以更輕鬆地找到我的文章。這個平台不僅提供了一個創作的舞台，我還在這裡與其他作家交流和分享經驗，這對我來說非常寶貴。'
  },
  {
    id: 6,
    imgName: 'user6',
    name: '奧斯汀',
    position: '文字工作者',
    content:
      '我喜歡這個平台提供的標籤功能，讓我的讀者可以更輕鬆地找到我的文章。這個平台不僅提供了一個創作的舞台，我還在這裡與其他作家交流和分享經驗，這對我來說非常寶貴。'
  },
  {
    id: 7,
    imgName: 'user7',
    name: '莉莉安',
    position: '心理諮商師',
    content:
      '使用這個寫作平台後，我的文章得到了更多的關注和讀者反饋。它的分享和評論功能讓我的讀者能夠與我互動，這使得我的作品更有共鳴和影響力。'
  },
  {
    id: 8,
    imgName: 'user8',
    name: '卡夫卡',
    position: '文字工作者',
    content:
      '小島聊癒所讓我能夠與讀者建立更深厚的聯繫。它的社群和論壇讓我能夠與讀者進行互動，了解他們的意見和反饋。這不僅提高了我的寫作技巧，還增加了我的讀者群體和忠實粉絲。'
  },
  {
    id: 9,
    imgName: 'user9',
    name: '艾莉絲',
    position: '心理諮商師',
    content:
      '我們來自四面八方，但都在 小島 相遇。友善的網路閱讀環境、多元且含金量高的閱讀內容，閱讀者付費的機制讓彼此更能珍惜所有的資源並細細品味。'
  }
]
</script>
<template>
  <div class="bg-sand-100">
    <div class="relative py-20">
      <div class="mb-20 px-10 text-center text-primary">
        <h3 class="mb-4 text-[40px] font-bold">50,000+位人氣作家推薦</h3>
        <p class="text-2xl font-[350]">還在等什麼！快跟其他創作者一起體驗 展開內容創作之旅</p>
      </div>
      <span
        class="absolute left-0 hidden h-[500px] w-[400px] bg-gradient-to-r from-sand-100 xl:block"
      ></span>
      <span
        class="absolute right-0 hidden h-[500px] w-[400px] bg-gradient-to-l from-sand-100 xl:block"
      ></span>
      <ul
        class="line-1 mb-4 flex flex-col justify-between gap-4 overflow-hidden lg:flex-row lg:flex-wrap lg:px-10 xl:flex-nowrap xl:px-0"
      >
        <li
          v-for="item in feedBacks1"
          :key="item.id"
          class="mx-auto w-[90%] rounded-3xl border bg-white p-6 lg:w-[49%] xl:w-[560px]"
        >
          <div class="mb-4 flex items-center">
            <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
              <img
                :src="`/landing/${item.imgName}.jpg`"
                alt="作家圖片"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="ml-3 flex flex-col">
              <p class="text-lg tracking-wider text-primary">{{ item.name }}</p>
              <p class="text-secondary">{{ item.position }}</p>
            </div>
          </div>
          <p class="font-[350] leading-6 tracking-widest text-primary-dark">{{ item.content }}</p>
        </li>
      </ul>
      <ul
        class="line-2 mb-10 hidden flex-col justify-between gap-4 overflow-hidden xl:flex xl:flex-row"
      >
        <li
          v-for="item in feedBacks2"
          :key="item.id"
          class="mx-auto w-[560px] rounded-3xl border bg-white p-6"
        >
          <div class="mb-4 flex items-center">
            <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
              <img
                :src="`/landing/${item.imgName}.jpg`"
                alt="作家圖片"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="ml-3 flex flex-col">
              <p class="text-lg tracking-wider text-primary">{{ item.name }}</p>
              <p class="text-secondary">{{ item.position }}</p>
            </div>
          </div>
          <p class="font-[350] leading-6 tracking-widest text-primary-dark">{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.line-1 li {
  width: 90%;
  gap: 2rem;
}
@media (min-width: 1280px) {
  .line-1 li:first-child {
    margin-left: -100px;
  }
  .line-1 li:last-child {
    margin-right: -100px;
  }
  .line-2 li:first-child {
    margin-left: -270px;
  }
  .line-2 li:last-child {
    margin-right: -270px;
  }
}
</style>
