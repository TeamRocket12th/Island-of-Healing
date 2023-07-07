<script setup lang="ts">
import { useArticle } from '~/stores/article'
const articleUse = useArticle()

const selectedCategory = ref('個人成長')
const toggleshowCategory = ref(false)
const userToken = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

const selectCategory = (category: string) => {
  selectedCategory.value = category
  if (category === '個人成長') {
    articleUse.article.ArticlesClassId = 1
  } else if (category === '情緒察覺') {
    articleUse.article.ArticlesClassId = 2
  } else if (category === '親密關係') {
    articleUse.article.ArticlesClassId = 3
  } else if (category === '日常練習') {
    articleUse.article.ArticlesClassId = 4
  } else {
    articleUse.article.ArticlesClassId = 1
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
const tags = ref<string[]>([])

const addTag = () => {
  if (newTag.value && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value)
    articleUse.article.Tags = tags.value
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}

const summaryInput = ref('')
const maxContentCount = 30
const summaryCount = ref(`(${summaryInput.value.length}/${maxContentCount})`)

watch(summaryInput, (newValue) => {
  summaryInput.value = articleUse.article.Summary
  summaryCount.value = `(${newValue.length}/${maxContentCount})`
})

const textLengthRule = (value: string) => {
  if (value.length >= 30 || value.length === 30) {
    return '*摘要不超過30個字'
  } else {
    return true
  }
}

const formData = new FormData()
const selectedImage = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

// 點擊取得本機圖片
const openFilePicker = (): void => {
  fileInput.value?.click()
}

const selectFile = (event: Event) => {
  previewImage.value = ''
  const file: any = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      selectedImage.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
  if (formData.get('articleCover')) {
    formData.set('articleCover', file)
  } else {
    formData.append('articleCover', file)
  }
  // console.log(formData.get('articleCover'))
}

const previewImage = ref<string | null>(null)
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}
// 拖曳取得本機圖片
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  selectedImage.value = ''
  const file: File = event.dataTransfer!.files[0]
  const reader = new FileReader()
  // sentArticleCoverImg(formData)
  reader.onload = () => {
    previewImage.value = reader.result as string
  }
  reader.readAsDataURL(file)
  if (formData.get('articleCover')) {
    formData.set('articleCover', file)
  } else {
    formData.append('articleCover', file)
  }
  // console.log(formData.get('articleCover'))
}

const postArticle = async () => {
  if (!userToken.value) {
    return
  }

  try {
    const res: ApiResponse = await $fetch(`${apiBase}/article/create`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'POST',
      body: articleUse.article
    })
    if (res.StatusCode === 200) {
      console.log(res.ArticleId)
      const articleId = res.ArticleId
      updateArticleCover(articleId)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

onUnmounted(() => {
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
  }
})

const saveDraft = () => {
  articleUse.article.Progress = 0
  console.log(articleUse.article)
  postArticle()
}

const createPost = () => {
  articleUse.article.Progress = 1
  console.log(articleUse.article)
  postArticle()
}

const selectedOption = ref('免費')
watch(selectedOption, (newValue) => {
  if (newValue === '付費') {
    articleUse.article.Pay = true
  } else {
    articleUse.article.Pay = false
  }
})

const updateArticleCover = async (id: number) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/article/updatearticleimg/${id}`, {
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
</script>
<template>
  <div
    class="container absolute left-1/2 top-1/2 mt-48 grid -translate-x-1/2 -translate-y-1/2 grid-cols-12 bg-sand-100 pt-10 md:fixed md:mt-0 md:pt-0"
  >
    <div class="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
      <div class="relative block md:flex">
        <Icon
          name="ic:baseline-close"
          size="24"
          class="absolute -top-4 right-0 cursor-pointer text-primary md:top-0"
          @click="postSent(false)"
        />
        <div class="w-full md:py-[54px] xl:px-[54px]">
          <h3 class="mb-3 text-base text-primary">文章封面</h3>
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
              <p class="text-sm text-secondary">建議上傳尺寸820x312內</p>
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
            <label for="articleTitle" class="mb-2 block text-base text-primary">文章標題</label>
            <VForm>
              <VField
                id="articleTitle"
                v-model="articleUse.article.Title"
                name="articleTitle"
                type="text"
                placeholder="請輸入文章標題"
                label="*文章標題"
                class="w-full rounded border border-secondary px-3 py-2 text-primary outline-none placeholder:text-sand-300"
                rules="required"
              />
              <VErrorMessage name="articleTitle" class="text-sm text-primary" />
            </VForm>
          </div>
          <div class="mb-5 md:mb-0">
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
        <div class="md:mb-[54px] md:ml-6 md:w-2/3 md:pt-[54px]">
          <fieldset class="mb-10 block">
            <legend class="mb-2 text-base text-primary">閱讀權限</legend>
            <div class="flex items-center gap-3">
              <div>
                <input
                  id="free"
                  v-model="selectedOption"
                  type="radio"
                  name="drone"
                  value="免費"
                  checked
                />
                <label for="free" class="text-secondary">所有人觀看</label>
              </div>
              <div>
                <input id="pay" v-model="selectedOption" type="radio" name="drone" value="付費" />
                <label for="pay" class="text-secondary">付費會員觀看</label>
              </div>
            </div>
          </fieldset>
          <div class="dropdown mb-5 block">
            <h3 class="mb-2 text-base text-primary">文章分類</h3>
            <label
              tabindex="0"
              class="btn flex justify-between rounded border-secondary bg-white"
              @click="toggleCategory(true)"
            >
              <span class="font-normal text-sand-300">{{ selectedCategory }}</span>
              <Icon name="ic:round-arrow-drop-down" size="24" />
            </label>
            <ul
              v-if="toggleshowCategory"
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
                class="w-full rounded border border-secondary py-[7px] pl-3 text-primary outline-none placeholder:text-sand-300"
                placeholder="輸入你的文章摘要..."
              />
              <div class="relative flex">
                <VErrorMessage name="userIntro" class="text-primary" />
                <p class="absolute right-0 text-primary-dark">{{ summaryCount }}</p>
              </div>
            </VForm>
          </div>
        </div>
        <div class="flex justify-end md:absolute md:bottom-0 md:right-0">
          <button
            class="md:mb-0text-secondary mb-6 rounded px-3 py-2 text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="saveDraft"
          >
            儲存草稿
          </button>
          <button
            class="md:mb-0text-secondary mb-6 rounded px-3 py-2 text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="createPost"
          >
            確認送出
          </button>
        </div>
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
