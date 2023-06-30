<script setup lang="ts">
const selectedImage: Ref<string> = ref('')
const fileInput: Ref<HTMLInputElement | null> = ref(null)
const articleTitle: Ref<string> = ref('')

const openFilePicker = (): void => {
  fileInput.value?.click()
}

const selectFile = (event: Event): void => {
  previewImage.value = ''
  const inputElement = event.target as HTMLInputElement
  const file = inputElement.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      selectedImage.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const selectedCategory = ref('選擇文章分類')
const toggleshowCategory = ref(false)

const selectCategory = (category: string): void => {
  selectedCategory.value = category
}
watch(selectedCategory, (newValue) => {
  console.log('category:', newValue)
})

const toggleCategory = (status: boolean): void => {
  console.log(status)
  toggleshowCategory.value = status
}

const emits = defineEmits(['post-upload', 'title-post'])
const postSent = (value: boolean) => {
  emits('post-upload', value)
}
const newTag = ref('')
const tags: Ref<string[]> = ref([])

const addTag = () => {
  if (newTag.value && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value)
    newTag.value = ''
  }
}

const removeTag = (index: number): void => {
  tags.value.splice(index, 1)
}

const summaryInput = ref('')
const maxContentCount = 30
const summaryCount = ref(`(${summaryInput.value.length}/${maxContentCount})`)

watch(summaryInput, (newValue) => {
  summaryCount.value = `(${newValue.length}/${maxContentCount})`
})

const textLengthRule = (value: string) => {
  if (value.length >= 30 || value.length === 30) {
    return '*摘要不超過30個字'
  } else {
    return true
  }
}

const previewImage = ref<string | null>(null)
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  selectedImage.value = ''
  const file = event.dataTransfer?.files[0] as File
  const reader = new FileReader()
  reader.onload = () => {
    const base64Data = reader.result as string
    previewImage.value = base64Data
  }
  reader.readAsDataURL(file)
}

onUnmounted(() => {
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
  }
})
</script>
<template>
  <div
    class="container absolute left-1/2 top-[60%] grid max-h-[750px] -translate-x-1/2 -translate-y-1/2 grid-cols-12 bg-sand-100 pb-[317px] pt-10"
  >
    <div class="col-span-5 col-start-3">
      <div class="px-[54px] py-[54px]">
        <h3 class="mb-3 text-base">文章封面</h3>
        <div>
          <div
            class="h-[200px] max-w-full overflow-hidden bg-sand-200 bg-cover bg-center"
            :style="{ backgroundImage: `url(${previewImage})` }"
            @dragover.prevent="handleDragOver"
            @drop.prevent="handleDrop"
          >
            <img
              v-if="selectedImage"
              class="pointer-events-none h-[200px] w-full"
              :src="selectedImage"
              alt="Selected Image"
            />
            <input ref="fileInput" type="file" style="display: none" @change="selectFile" />
          </div>
          <div class="flex justify-between">
            <p class="text-sm text-secondary">建議上傳尺寸680x680內</p>
            <button
              class="mb-2 mt-6 flex items-center justify-center rounded border bg-secondary p-2"
              @click="openFilePicker"
            >
              <Icon name="material-symbols:add" size="16" class="text-white" />
              <span class="text-sm text-white">新增封面</span>
            </button>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="mb-2 text-base text-primary">文章標題</h3>
          <input
            v-model="articleTitle"
            type="text"
            placeholder="請輸入文章標題"
            class="w-full rounded border border-secondary px-3 py-2 text-primary outline-none placeholder:text-sand-300"
          />
        </div>
        <div>
          <h3 class="mb-2 text-base text-primary">新增標籤</h3>
          <div
            class="flex flex-wrap items-center gap-2 rounded border border-secondary bg-white px-3 py-2"
          >
            <Icon name="material-symbols:sell-outline" size="24" class="text-secondary" />
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="relative flex items-center gap-1 rounded-sm bg-[#D9D9D9] px-3"
            >
              {{ tag }}
              <button @click="removeTag(index)">
                <Icon name="ic:baseline-close" size="12" class="absolute right-0 top-0" />
              </button>
            </span>
            <div>
              <input
                v-model="newTag"
                placeholder="請輸入文章標籤"
                class="bg-sand pl-1 text-primary outline-none placeholder:text-sand-300"
                @keyup.enter="addTag"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative col-span-3 col-start-8 mb-[54px] ml-6 pt-[54px]">
      <Icon
        name="ic:baseline-close"
        size="24"
        class="absolute right-0 top-0 cursor-pointer text-primary"
        @click="postSent(false)"
      />
      <fieldset class="mb-10 block">
        <legend class="mb-2 text-base text-primary">閱讀權限</legend>
        <div class="flex gap-3">
          <div>
            <input id="free" type="radio" name="drone" value="免費" checked />
            <label for="free" class="text-secondary">所有人觀看</label>
          </div>
          <div>
            <input id="pay" type="radio" name="drone" value="付費" />
            <label for="pay" class="text-secondary">付費會員觀看</label>
          </div>
        </div>
      </fieldset>
      <div class="dropdown mb-5 block">
        <h3 class="mb-2 text-base text-primary">文章分類</h3>
        <label
          tabindex="0"
          class="btn m-1 flex justify-between rounded border-secondary bg-white"
          @click="toggleCategory(true)"
        >
          <span class="font-normal text-sand-300">{{ selectedCategory }}</span>
          <Icon name="ic:round-arrow-drop-down" size="24" />
        </label>
        <ul
          v-show="toggleshowCategory"
          tabindex="0"
          class="dropdown-content menu rounded-box w-full bg-base-100 p-2 shadow"
          @click="toggleCategory(false)"
        >
          <li><a @click="selectCategory('個人成長')">個人成長</a></li>
          <li><a @click="selectCategory('情緒覺察')">情緒覺察</a></li>
          <li><a @click="selectCategory('親密關係')">親密關係</a></li>
          <li><a @click="selectCategory('日常練習')">日常練習</a></li>
        </ul>
      </div>
      <div>
        <VForm class="mb-10">
          <label for="userIntro" class="mb-2 block text-primary"> 內容摘要</label>
          <VField
            id="userIntro"
            v-model="summaryInput"
            name="userIntro"
            as="textarea"
            label="*內容摘要"
            :rules="textLengthRule"
            maxlength="30"
            rows="4"
            class="w-full rounded-sm border border-secondary py-[7px] pl-3 text-primary outline-none placeholder:text-sand-300"
            placeholder="輸入你的文章摘要..."
          />
          <div class="relative flex">
            <VErrorMessage name="userIntro" class="text-primary" />
            <p class="absolute right-0">{{ summaryCount }}</p>
          </div>
        </VForm>
      </div>
      <div class="absolute bottom-0 right-0">
        <button class="rounded bg-secondary px-3 py-2 text-white">確認送出</button>
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
  transform-origin: center center;
  pointer-events: none;
}

input[type='radio']:checked:after {
  width: 1em;
  height: 1em;
  opacity: 1;
}
</style>
