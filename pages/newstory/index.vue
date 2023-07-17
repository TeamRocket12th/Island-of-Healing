<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

import { useArticle } from '~/stores/article'

definePageMeta({
  layout: 'postlayout',
  middleware: [isWriter],
  requiredAuth: true
})

useHead({ title: '新增文章' })
const articleUse = useArticle()

const settingShow = ref(false)
const rulesShow = ref(false)

const settingUse = (value: boolean) => {
  settingShow.value = value
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}
onMounted(() => {
  articleUse.article.Title = ''
  articleUse.article.Tags = []
  articleUse.article.Summary = ''
})

// const handleResize = () => {
//   if (typeof document !== 'undefined') {
//     if (window.innerWidth > 767) {
//       document.body.style.overflow = settingShow.value ? 'hidden' : 'auto'
//     } else {
//       document.body.style.overflow = 'auto'
//     }
//   }
// }

// watch(settingShow, handleResize)

// onMounted(() => {
//   handleResize()
//   window.addEventListener('resize', handleResize)
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', handleResize)
// })
</script>

<template>
  <div class="bg-sand-100 sm:h-[1100px] md:h-fit">
    <PostEditor @post-upload="settingUse" @post-rules="ruleUse" />
    <PostSetting v-if="settingShow" @post-upload="settingUse" />
    <Transition>
      <PostRules v-if="rulesShow" @post-rules="ruleUse" />
    </Transition>
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
