<script setup lang="ts">
import { storeToRefs } from 'pinia'
// import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'
import { useTopic } from '~/stores/topic'
const { showToast } = storeToRefs(useToast())
const { setToast } = useToast()

// const { userData } = storeToRefs(useUserStore())
const { apiBase, userToken } = useApiConfig()

const topicUse = useTopic()
const route = useRoute()
const router = useRouter()

const selectedCategory = ref('解憂相談室')
const toggleshowCategory = ref(false)

const selectCategory = (category: string) => {
  selectedCategory.value = category
  switch (category) {
    case '解憂相談室':
      topicUse.topic.ConversationsCategoryId = 1
      break
    case '愛情相談室':
      topicUse.topic.ConversationsCategoryId = 2
      break
    case '靈魂相談室':
      topicUse.topic.ConversationsCategoryId = 3
      break
    case '職場相談室':
      topicUse.topic.ConversationsCategoryId = 4
      break
    default:
      topicUse.topic.ConversationsCategoryId = 1
      break
  }
}

const toggleCategory = (status: boolean) => {
  toggleshowCategory.value = status
}

const emits = defineEmits(['post-upload', 'title-post'])
const postSent = (value: boolean) => {
  emits('post-upload', value)
}
const newTag = ref<string>('')

const addTag = () => {
  if (newTag.value && !topicUse.topic.Tags.includes(newTag.value)) {
    topicUse.topic.Tags.push(newTag.value)

    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  topicUse.topic.Tags.splice(index, 1)
}

const maxContentCount = 30
const summaryCount = ref(`(${topicUse.topic.Summary.length}/${maxContentCount})`)

watch(
  () => topicUse.topic.Summary,
  (newSummary) => {
    summaryCount.value = `(${newSummary.length}/${maxContentCount})`
  }
)

const textLengthRule = (value: string) => {
  if (value.length >= 30 || value.length === 30) {
    return '*摘要不超過30個字'
  } else {
    return true
  }
}

const formData = new FormData()
const fileInput = ref<HTMLInputElement | null>(null)

// 點擊取得本機圖片
const openFilePicker = (): void => {
  fileInput.value?.click()
}

const selectFile = (event: Event) => {
  topicUse.previewImage = ''
  const file: any = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      topicUse.selectedImage = reader.result as string
    }
    reader.readAsDataURL(file)
  }
  if (formData.get('topicCover')) {
    formData.set('topicCover', file)
  } else {
    formData.append('topicCover', file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}
// 拖曳取得本機圖片
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  topicUse.selectedImage = ''
  const file: File = event.dataTransfer!.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    topicUse.previewImage = reader.result as string
  }
  reader.readAsDataURL(file)
  if (formData.get('topicCover')) {
    formData.set('topicCover', file)
  } else {
    formData.append('topicCover', file)
  }
}

//  新增話題
const ConversationId = ref(null as number | null)
const postTopic = async () => {
  if (!userToken.value) {
    return
  }

  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversation/create`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'POST',
      body: topicUse.topic
    })
    if (res.StatusCode === 200) {
      const id = res.ConversationId
      ConversationId.value = id
      topicUse.topic.Title = ''
      topicUse.topic.Content = ''
      topicUse.topic.Summary = ''
      selectedCategory.value = '解憂相談室'
      selectedOption.value = '是'
      topicUse.selectedImage = ''
      topicUse.previewImage = ''
      topicUse.topic.Tags.splice(0, topicUse.topic.Tags.length)
      console.log(id)
      setToast('新增成功!')
      if (formData.get('topicCover')) {
        updateTopicCover(id)
      }
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
// 更新話題
const updateTopic = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversation/update/${route.params.id}`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'PUT',
      body: topicUse.topic
    })

    if (res.StatusCode === 200) {
      topicUse.topic.Title = ''
      topicUse.topic.Content = ''
      topicUse.topic.Summary = ''
      topicUse.topic.ConversationsCategoryId = 1
      selectedOption.value = '是'
      topicUse.selectedImage = ''
      topicUse.previewImage = ''
      topicUse.topic.Tags.splice(0, topicUse.topic.Tags.length)
      setToast('更新成功!')
      if (formData.get('topicCover')) {
        const id = Number(route.params.id)
        updateTopicCover(id)
      }
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 新增話題按鈕
const createPost = () => {
  if (route.params.id) {
    updateTopic()
    setTimeout(() => {
      router.push(`/forum/${route.params.id}`)
      postSent(false)
    }, 1500)
  } else {
    postTopic()
    setTimeout(() => {
      router.push(`/forum/${ConversationId.value}`)
      postSent(false)
    }, 1500)
  }
}

const selectedOption = ref('是')
watch(selectedOption, (newValue) => {
  if (newValue === '是') {
    topicUse.topic.Anonymous = true
  } else {
    topicUse.topic.Anonymous = false
  }
})

// 更新話題圖片封面
const updateTopicCover = async (id: number) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversation/updateconversationimg/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'PUT',
      body: formData
    })
    if (res.StatusCode === 200) {
      console.log(res)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

onMounted(() => {
  if (topicUse.topic.ConversationsCategoryId === 2) {
    selectedCategory.value = '愛情相談室'
  } else if (topicUse.topic.ConversationsCategoryId === 3) {
    selectedCategory.value = '靈魂相談室'
  } else if (topicUse.topic.ConversationsCategoryId === 4) {
    selectedCategory.value = '職場相談室'
  }
  if (topicUse.topic.Anonymous === false) {
    selectedOption.value = '否'
  }
})

const photoAlert = ref(true)
watchEffect(() => {
  if (topicUse.selectedImage === '' && topicUse.previewImage === '') {
    photoAlert.value = true
  } else {
    photoAlert.value = false
  }
})
</script>
<template>
  <div
    class="container absolute left-1/2 top-1/2 mt-[240px] grid -translate-x-1/2 -translate-y-1/2 grid-cols-12 bg-sand-100 pt-12 md:mt-16 md:h-screen md:pt-0"
  >
    <div class="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
      <div class="block">
        <div class="fixed right-10 top-12 z-20 3xl:right-80">
          <ToastMsg v-if="showToast" />
        </div>
        <div class="flex w-full justify-end">
          <Icon
            name="ic:baseline-close"
            size="24"
            class="cursor-pointer text-primary md:top-0"
            @click="postSent(false)"
          />
        </div>
        <VForm v-slot="{ meta }">
          <div class="relative block md:flex">
            <div class="w-full md:py-[54px] xl:px-[54px]">
              <h3 class="mb-3 text-base text-primary">貼文封面</h3>
              <div>
                <div
                  class="relative h-[200px] max-w-full overflow-hidden bg-sand-200 bg-cover bg-center"
                  :style="{ backgroundImage: `url(${topicUse.previewImage})` }"
                  @dragover.prevent="handleDragOver"
                  @drop.prevent="handleDrop"
                >
                  <img
                    v-if="topicUse.selectedImage"
                    class="pointer-events-none h-[200px] w-full"
                    :src="topicUse.selectedImage"
                    alt="Selected Image"
                  />
                  <input ref="fileInput" type="file" style="display: none" @change="selectFile" />
                  <p
                    v-if="photoAlert"
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl tracking-[0.6px] text-sand-300"
                  >
                    照片拖曳上傳
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-sm text-secondary">建議上傳尺寸820x312內</p>
                  <button
                    type="button"
                    class="mb-2 mt-6 flex items-center justify-center rounded border bg-secondary p-2 disabled:bg-btn-disabled disabled:text-white"
                    @click="openFilePicker"
                  >
                    <Icon name="material-symbols:add" size="16" class="text-white" />
                    <span class="text-sm text-white">貼文封面</span>
                  </button>
                </div>
              </div>
              <div class="mb-4">
                <label for="topicTitle" class="mb-2 block text-base text-primary">貼文標題</label>
                <VField
                  id="topicTitle"
                  v-model="topicUse.topic.Title"
                  name="topicTitle"
                  type="text"
                  placeholder="請輸入貼文標題"
                  label="*貼文標題"
                  class="w-full rounded border border-secondary px-3 py-2 text-primary outline-none placeholder:text-sand-300"
                  rules="required"
                />
                <VErrorMessage name="topicTitle" class="text-sm text-primary" />
              </div>
              <div class="mb-5 md:mb-0">
                <h3 class="mb-2 text-base text-primary">新增標籤</h3>
                <div
                  class="flex flex-wrap items-center gap-2 rounded border border-secondary bg-white px-3 py-2"
                >
                  <Icon name="material-symbols:sell-outline" size="24" class="text-secondary" />
                  <span
                    v-for="(tag, index) in topicUse.topic.Tags"
                    :key="index"
                    class="relative flex items-center gap-1 rounded border-[0.5px] border-primary bg-sand-200 px-3 text-primary"
                  >
                    {{ tag }}
                    <button @click="removeTag(index)">
                      <Icon name="ic:baseline-close" size="12" class="text-primary" />
                    </button>
                  </span>
                  <div>
                    <input
                      v-model="newTag"
                      placeholder="請輸入貼文標籤"
                      class="bg-sand pl-1 text-primary outline-none placeholder:text-sand-300"
                      @keydown.enter.prevent="addTag"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="md:mb-[54px] md:ml-6 md:w-2/3 md:pt-[54px]">
              <fieldset class="mb-10 block">
                <legend class="mb-2 text-base text-primary">是否匿名發表貼文</legend>
                <div class="flex items-center gap-3">
                  <div>
                    <input
                      id="true"
                      v-model="selectedOption"
                      type="radio"
                      name="drone"
                      value="是"
                      checked
                    />
                    <label for="true" class="text-secondary">是</label>
                  </div>
                  <div>
                    <input
                      id="false"
                      v-model="selectedOption"
                      type="radio"
                      name="drone"
                      value="否"
                    />
                    <label for="false" class="text-secondary">否</label>
                  </div>
                </div>
              </fieldset>
              <div class="dropdown mb-5 block">
                <h3 class="mb-2 text-base text-primary">相談室分類</h3>
                <label
                  tabindex="0"
                  class="btn flex justify-between rounded border-secondary bg-white"
                  @click="toggleCategory(true)"
                >
                  <span class="font-normal text-primary">{{ selectedCategory }}</span>
                  <Icon name="material-symbols:arrow-drop-down" size="24" class="text-primary" />
                </label>
                <ul
                  v-if="toggleshowCategory"
                  tabindex="0"
                  class="dropdown-content menu rounded-box w-full border-secondary bg-base-100 p-2 shadow"
                  @click="toggleCategory(false)"
                >
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('解憂相談室')"
                      >解憂相談室</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('愛情相談室')"
                      >愛情相談室</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('靈魂相談室')"
                      >靈魂相談室</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('職場相談室')"
                      >職場相談室</a
                    >
                  </li>
                </ul>
              </div>
              <div>
                <div class="mb-10">
                  <label for="userIntro" class="mb-2 block text-primary">內容摘要</label>
                  <VField
                    id="userIntro"
                    v-model="topicUse.topic.Summary"
                    name="userIntro"
                    as="textarea"
                    label="*內容摘要"
                    :rules="textLengthRule"
                    maxlength="30"
                    rows="4"
                    class="w-full rounded border border-secondary p-3 py-[7px] text-primary outline-none placeholder:text-sand-300"
                    placeholder="輸入你的貼文摘要..."
                  />
                  <div class="relative flex">
                    <VErrorMessage name="userIntro" class="text-primary" />
                    <p class="absolute right-0 text-primary-dark">{{ summaryCount }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end md:absolute md:bottom-0 md:right-0">
              <button
                class="mb-6 rounded px-3 py-2 text-secondary duration-100 hover:bg-secondary hover:text-white disabled:text-sand-300 disabled:hover:bg-[#cfccc9] md:mb-0"
                :disabled="!meta.valid"
                @click.prevent="createPost"
              >
                確認送出
              </button>
            </div>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: -0.3em 0.25em 0 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
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
  width: 1em;
  height: 1em;
  opacity: 1;
}
</style>
