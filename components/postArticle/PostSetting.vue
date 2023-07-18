<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticle } from '~/stores/article'
import { useUserStore } from '~/stores/user'
const articleUse = useArticle()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

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

const addTag = () => {
  if (newTag.value && !articleUse.article.Tags.includes(newTag.value)) {
    articleUse.article.Tags.push(newTag.value)

    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  articleUse.article.Tags.splice(index, 1)
}

const maxContentCount = 30
const summaryCount = ref(`(${articleUse.article.Summary.length}/${maxContentCount})`)

watch(
  () => articleUse.article.Summary,
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
  articleUse.previewImage = ''
  const file: any = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      articleUse.selectedImage = reader.result as string
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

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}
// 拖曳取得本機圖片
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  articleUse.selectedImage = ''
  const file: File = event.dataTransfer!.files[0]
  const reader = new FileReader()
  // sentArticleCoverImg(formData)
  reader.onload = () => {
    articleUse.previewImage = reader.result as string
  }
  reader.readAsDataURL(file)
  if (formData.get('articleCover')) {
    formData.set('articleCover', file)
  } else {
    formData.append('articleCover', file)
  }
  // console.log(formData.get('articleCover'))
}

//  新增文章
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
      console.log(res)
      console.log(res.ArticleId)
      alert('新增成功')
      const articleId = res.ArticleId

      articleUse.article.Title = ''
      articleUse.article.Content = ''
      articleUse.article.Summary = ''
      selectedCategory.value = '個人成長'
      selectedOption.value = '免費'
      articleUse.selectedImage = ''
      articleUse.article.Tags.splice(0, articleUse.article.Tags.length)

      if (formData.get('articleCover')) {
        updateArticleCover(articleId)
      }
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
// 更新文章
const updateArticle = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/article/update/${route.params.id}`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      method: 'PUT',
      body: articleUse.article
    })

    if (res.StatusCode === 200) {
      console.log(res)
      alert('更新成功')
      console.log(articleUse.article.ArticlesClassId)
      articleUse.article.Title = ''
      articleUse.article.Content = ''
      articleUse.article.Summary = ''
      articleUse.article.ArticlesClassId = 1
      selectedOption.value = '免費'
      articleUse.selectedImage = ''
      articleUse.article.Tags.splice(0, articleUse.article.Tags.length)

      if (formData.get('articleCover')) {
        const id = Number(route.params.id)
        updateArticleCover(id)
      } else {
        articleUse.selectedImage = '/default-article-cover.jpg'
      }
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 新增草稿按鈕
const saveDraft = () => {
  articleUse.article.Progress = 0
  console.log(articleUse.article)
  if (route.params.id) {
    updateArticle()
  } else {
    postArticle()
  }
  postSent(false)
  setTimeout(() => {
    router.push(`/account/${userData.value.id}/drafts`)
  }, 1000)
}

// 新增文章按鈕
const createPost = () => {
  articleUse.article.Progress = 1
  if (route.params.id) {
    updateArticle()
  } else {
    postArticle()
  }
  postSent(false)
  setTimeout(() => {
    router.push(`/account/${userData.value.id}/mywork`)
  }, 1000)
}

const selectedOption = ref('免費')
watch(selectedOption, (newValue) => {
  if (newValue === '付費') {
    articleUse.article.Pay = true
  } else {
    articleUse.article.Pay = false
  }
})

// 更新圖片封面
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
const props = defineProps({
  articleData: {
    type: Object,
    default: () => {}
  }
})

onMounted(() => {
  if (route.params.id) {
    selectedCategory.value = props.articleData.Category
    selectCategory(selectedCategory.value)
    console.log(props.articleData.Tags)
    articleUse.article.Tags = props.articleData.Tags
    if (props.articleData.Pay) {
      selectedOption.value = '付費'
    } else {
      selectedOption.value = '免費'
    }
    // console.log(props.articleData.ImgUrl)
    if (props.articleData.ImgUrl !== '') {
      articleUse.selectedImage = props.articleData.ImgUrl
    } else {
      articleUse.selectedImage = ''
    }
  }
})

const photoAlert = ref(true)
watchEffect(() => {
  if (articleUse.selectedImage === '' && articleUse.previewImage === '') {
    photoAlert.value = true
  } else {
    photoAlert.value = false
  }
})
</script>
<template>
  <div
    class="container absolute left-1/2 top-1/2 mt-[200px] grid -translate-x-1/2 -translate-y-1/2 grid-cols-12 bg-sand-100 pt-12 md:mt-16 md:h-screen md:pt-0"
  >
    <div class="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
      <div class="block">
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
              <h3 class="mb-3 text-base text-primary">文章封面</h3>
              <div>
                <div
                  class="relative h-[200px] max-w-full overflow-hidden bg-sand-200 bg-cover bg-center"
                  :style="{ backgroundImage: `url(${articleUse.previewImage})` }"
                  @dragover.prevent="handleDragOver"
                  @drop.prevent="handleDrop"
                >
                  <img
                    v-if="articleUse.selectedImage"
                    class="pointer-events-none h-[200px] w-full"
                    :src="articleUse.selectedImage"
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
                    <span class="text-sm text-white">新增封面</span>
                  </button>
                </div>
              </div>
              <div class="mb-4">
                <label for="articleTitle" class="mb-2 block text-base text-primary">文章標題</label>
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
              </div>
              <div class="mb-5 md:mb-0">
                <h3 class="mb-2 text-base text-primary">新增標籤</h3>
                <div
                  class="flex flex-wrap items-center gap-2 rounded border border-secondary bg-white px-3 py-2"
                >
                  <Icon name="material-symbols:sell-outline" size="24" class="text-secondary" />
                  <span
                    v-for="(tag, index) in articleUse.article.Tags"
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
                      placeholder="請輸入文章標籤"
                      class="bg-sand pl-1 text-primary outline-none placeholder:text-sand-300"
                      @keydown.enter.prevent="addTag"
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
                    <input
                      id="pay"
                      v-model="selectedOption"
                      type="radio"
                      name="drone"
                      value="付費"
                    />
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
                      @click="selectCategory('個人成長')"
                      >個人成長</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('情緒察覺')"
                      >情緒察覺</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('親密關係')"
                      >親密關係</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-primary hover:bg-secondary hover:text-white"
                      @click="selectCategory('日常練習')"
                      >日常練習</a
                    >
                  </li>
                </ul>
              </div>
              <div>
                <div class="mb-10">
                  <label for="userIntro" class="mb-2 block text-primary"> 內容摘要</label>
                  <VField
                    id="userIntro"
                    v-model="articleUse.article.Summary"
                    name="userIntro"
                    as="textarea"
                    label="*內容摘要"
                    :rules="textLengthRule"
                    maxlength="30"
                    rows="4"
                    class="w-full rounded border border-secondary p-3 py-[7px] text-primary outline-none placeholder:text-sand-300"
                    placeholder="輸入你的文章摘要..."
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
                @click.prevent="saveDraft"
              >
                儲存草稿
              </button>
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
