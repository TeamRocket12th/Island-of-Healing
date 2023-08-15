<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import isWriter from '~/middleware/isWriter'
import { useArticle } from '~/stores/article'

definePageMeta({
  layout: 'postlayout',
  middleware: [isWriter],
  requiredAuth: true
})
useSeoMeta({ title: '編輯文章' })

const articleUse = useArticle()

const settingShow = ref(false)
const rulesShow = ref(false)

const settingUse = (value: boolean) => {
  settingShow.value = value
}
const contentUse = (content: string) => {
  articleUse.article.Content = content
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}

const userStore = useUserStore()
const { isLogin, userData } = storeToRefs(userStore)
const { apiBase } = useApiConfig()

const route = useRoute()

const htmlContent = ref('')
const articleData = ref({})
// 取得單篇文章資訊
const getArticleDetail = async () => {
  const userId = isLogin.value ? userData.value.id : '0'
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/readarticle/${route.params.id}/${userId}`)
    if (res.StatusCode === 200) {
      htmlContent.value = res.ArticleData.Content
      articleData.value = res.ArticleData
      articleUse.article.Title = res.ArticleData.Title
      articleUse.article.Tags = res.ArticleData.Tags
      articleUse.article.Summary = res.ArticleData.Summary
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(getArticleDetail)

const handleResize = () => {
  if (typeof document !== 'undefined') {
    if (window.innerWidth > 767) {
      document.body.style.overflow = settingShow.value ? 'hidden' : 'auto'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
}

watch(settingShow, handleResize)

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div>
    <template v-if="htmlContent !== ''">
      <PostEditor
        :html-content="htmlContent"
        :article-data="articleData"
        @post-upload="settingUse"
        @post-rules="ruleUse"
        @article-content="contentUse"
      />
      <PostSetting v-if="settingShow" :article-data="articleData" @post-upload="settingUse" />
      <Transition>
        <PostRules v-if="rulesShow" @post-rules="ruleUse" />
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
