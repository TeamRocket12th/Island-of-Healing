<script setup lang="ts">
const myMsgs = ref<MyMsg[]>([
  {
    email: 'mou12345',
    imgUrl: 'https://picsum.photos/48',
    name: '告解室基哥',
    canMessage: '哈囉，我們是好物研究社團隊，謝謝您的支持和參與！',
    date: '2023-05-25',
    id: 1,
    read: false
  },
  {
    email: 'mou12345',
    imgUrl: 'https://picsum.photos/48',
    name: '告解室Ting',
    canMessage: '哈囉，我們是好物研究社團隊，祝您度過美好的一天！',
    date: '2023-06-01',
    id: 2,
    read: false
  },
  {
    email: 'mou12345',
    imgUrl: 'https://picsum.photos/48',
    name: '告解室Nancy',
    canMessage: '哈囉，我們是好物研究社團隊，我們已收到您的詢問，將盡快回覆。',
    date: '2023-06-03',
    id: 3,
    read: false
  },
  {
    email: 'mou12345',
    imgUrl: 'https://picsum.photos/48',
    name: '告解室Benson',
    canMessage: '哈囉，我們是好物研究社團隊，感謝您的耐心等待，我們正在處理中。',
    date: '2023-06-09',
    id: 4,
    read: false
  },
  {
    email: 'mou12345',
    imgUrl: 'https://picsum.photos/48',
    name: '告解室Ben爸',
    canMessage: '哈囉，我們是好物研究社團隊，希望您擁有愉快的使用體驗！',
    date: '2023-06-16',
    id: 5,
    read: false
  }
])

const sortedMsgs = ref<MyMsg[]>(myMsgs.value.slice())
const msgsNum = ref(0)
const msgIndex = ref(0)

const sortByDate = () => {
  sortedMsgs.value.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

const defaultMsg = ref<MyMsg>({
  email: '',
  imgUrl: '',
  name: '',
  canMessage: '',
  date: '2023-06-16',
  id: 5,
  read: false
})

sortByDate()
defaultMsg.value = sortedMsgs.value[0]
msgsNum.value = Number(sortedMsgs.value.length)

const selectedMsg = ref<MyMsg | null>(null)

const getMsg = (id: number) => {
  selectedMsg.value = myMsgs.value.filter((msg) => msg.id === id)[0]
  msgIndex.value = sortedMsgs.value.findIndex((msg) => msg.id === id)
}

const showMobileMsg = ref(false)

const toggleSmwindow = (value: boolean) => {
  showMobileMsg.value = value
}
</script>

<template>
  <div class="grid-cols-12 lg:grid">
    <MsgList
      class="col-span-4"
      :messages="sortedMsgs"
      @get-msg="getMsg"
      @toggle-smwindow="toggleSmwindow"
    />
    <MsgWindow
      class="col-span-8 hidden lg:block"
      :message="selectedMsg || defaultMsg"
      :msgs-num="msgsNum"
      :msg-no="msgIndex"
    />
    <client-only>
      <Teleport to="main">
        <SingleMsg
          v-if="showMobileMsg"
          class="absolute left-0 right-0 top-0 h-full w-full lg:hidden"
          :message="selectedMsg || defaultMsg"
          @back-to-list="toggleSmwindow"
        />
      </Teleport>
    </client-only>
  </div>
</template>
