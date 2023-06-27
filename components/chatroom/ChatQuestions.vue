<script setup>
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'

const { characters } = storeToRefs(useChatCharacters())

const questions = [
  {
    id: '1',
    title: '你會選哪一道菜當作今天的點心？',
    options: [
      { text: '成長蔬菜餡餅', category: 'personal-growth' },
      { text: '情緒巧克力慕斯', category: 'emotional-awareness' },
      { text: '親密酸甜披薩', category: 'intimate-relationships' },
      { text: '日常涮嘴餅乾', category: 'daily-practice' }
    ]
  },
  {
    id: '2',
    title: '如果可以擁有一種超能力，你希望具備以下哪一項？',
    options: [
      {
        text: '時空凍結：能夠暫停時間，讓你有更多時間陪伴親人或愛人，享受片刻寧靜',
        category: 'intimate-relationships'
      },
      { text: '心靈導航：能夠洞察他人的情緒和需求', category: 'emotional-awareness' },
      { text: '超人：擁有超人的速度和力量', category: 'personal-growth' },
      { text: '量子穿越：能夠來一場說走就走，隨心所欲的旅行', category: 'daily-practice' }
    ]
  },
  {
    id: '3',
    title: '如果你的生活是一部電影，你希望它屬於以下哪一個類型？',
    options: [
      { text: '王道劇情', category: 'personal-growth' },
      { text: '浪漫愛情', category: 'intimate-relationships' },
      { text: '懸疑驚恐', category: 'emotional-awareness' },
      { text: '爆笑喜劇', category: 'daily-practice' }
    ]
  },
  {
    id: '4',
    title: '如果你可以養一隻寵物，你會希望養?',
    options: [
      { text: '獅', category: 'personal-growth' },
      { text: '狼', category: 'emotional-awareness' },
      { text: '貓', category: 'intimate-relationships' },
      { text: '狗', category: 'daily-practice' }
    ]
  },
  {
    id: '5',
    title: '在高雄大港橋上，有一對擁吻的情侶，你覺得他們可能的身分是?',
    options: [
      { text: '高中生', category: 'emotional-awareness' },
      { text: '表演藝術者', category: 'personal-growth' },
      { text: '老夫老妻', category: 'daily-practice' },
      { text: '新婚佳偶', category: 'intimate-relationships' }
    ]
  }
]

const answers = ref({})
const maxCategory = ref('')
const selectedRole = ref({})

const getCharacter = (result) => {
  const charactersArr = characters.value
  const selectedRoles = charactersArr.filter((c) => c.type === result)
  return selectedRoles[0]
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const submit = () => {
  if (answers.value['4']) {
    const valuesArray = Object.values(answers.value)
    const countObj = {}
    let maxCount = 0
    for (const val of valuesArray) {
      if (countObj[val]) {
        countObj[val]++
      } else {
        countObj[val] = 1
      }
      if (countObj[val] > maxCount) {
        maxCount = countObj[val]
        maxCategory.value = val
      }
    }
    selectedRole.value = getCharacter(maxCategory.value)
    scrollTop()
  }
}
</script>
<template>
  <section v-if="maxCategory === ''" class="container py-12">
    <h2 class="mb-20 text-center text-3xl font-bold text-primary">請先回答以下問題</h2>
    <form class="space-y-8" @submit.prevent="submit">
      <div v-for="(question, index) in questions" :key="question.id" class="mb-20">
        <h3 class="mb-5 text-2xl font-semibold">{{ question.title }}</h3>
        <div
          v-for="(option, oIndex) in question.options"
          :key="oIndex"
          class="mb-2 flex items-center space-x-2"
        >
          <input
            :id="option.text"
            v-model="answers[index]"
            type="radio"
            :name="'question' + index"
            :value="option.category"
            class="form-radio cursor-pointer text-primary"
          />
          <label :for="option.text" class="cursor-pointer text-xl">{{ option.text }}</label>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="rounded-md bg-primary px-4 py-2 text-white">提交</button>
      </div>
    </form>
  </section>
  <section v-else class="container pb-80 pt-10">
    <h3 class="mb-12 text-center text-3xl font-bold text-primary">嘿! 我們真是有緣</h3>
    <div class="mx-auto max-w-[30%]">
      <CharacterCard :c="selectedRole" />
    </div>
  </section>
</template>
