<script setup>
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'

const { characters } = storeToRefs(useChatCharacters())

const questions = [
  {
    id: '1',
    title: '1. 你會選哪一道菜當作今天的點心？',
    options: [
      { text: '成長蔬菜餡餅', category: 'personal-growth' },
      { text: '情緒巧克力慕斯', category: 'emotional-awareness' },
      { text: '親密酸甜披薩', category: 'intimate-relationships' },
      { text: '日常涮嘴餅乾', category: 'daily-practice' }
    ]
  },
  {
    id: '2',
    title: '2. 如果可以擁有一種超能力，你希望具備以下哪一項？',
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
    title: '3. 如果你的生活是一部電影，你希望它屬於以下哪一個類型？',
    options: [
      { text: '王道劇情', category: 'personal-growth' },
      { text: '浪漫愛情', category: 'intimate-relationships' },
      { text: '懸疑驚恐', category: 'emotional-awareness' },
      { text: '爆笑喜劇', category: 'daily-practice' }
    ]
  },
  {
    id: '4',
    title: '4. 如果你可以養一隻寵物，你會希望養?',
    options: [
      { text: '獅', category: 'personal-growth' },
      { text: '狼', category: 'emotional-awareness' },
      { text: '貓', category: 'intimate-relationships' },
      { text: '狗', category: 'daily-practice' }
    ]
  },
  {
    id: '5',
    title: '5. 在高雄大港橋上，有一對擁吻的情侶，你覺得他們可能的身分是?',
    options: [
      { text: '高中生', category: 'emotional-awareness' },
      { text: '表演藝術者', category: 'personal-growth' },
      { text: '老夫老妻', category: 'daily-practice' },
      { text: '新婚佳偶', category: 'intimate-relationships' }
    ]
  }
]
const router = useRouter()
const answers = ref({})
const maxCategory = ref('')
const selectedRole = ref({})

const getCharacter = (result) => {
  const charactersArr = characters.value
  const selectedRoles = charactersArr.filter((c) => c.type === result)
  return selectedRoles[0]
}

// const scrollTop = () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' })
// }

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
    router.push(`/chatroom/${selectedRole.value.id}`)
  }
}
</script>
<template>
  <section class="container flex justify-center pb-[119px] pt-20">
    <form @submit.prevent="submit">
      <div v-for="(question, index) in questions" :key="question.id" class="mb-9">
        <h3 class="mb-3 text-xl text-primary">{{ question.title }}</h3>
        <div
          v-for="(option, oIndex) in question.options"
          :key="oIndex"
          class="mb-2 flex items-center gap-1 space-x-2 text-primary-dark"
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
      <div class="mt-20 text-center">
        <button type="submit" class="rounded-md bg-primary px-4 py-2 text-white">提交</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: white;
  padding: 0;
  width: 20px;
  height: 20px;
  border: 2px solid #3d1f03;
  font-size: 0.9em;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

input[type='radio'] {
  border-radius: 50%;
}

input[type='radio']:after {
  content: '';
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #796959;
  border-radius: 50%;
  width: 0;
  height: 0;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  pointer-events: none;
}

input[type='radio']:checked:after {
  width: 0.8em;
  height: 0.8em;
  opacity: 1;
}
</style>
