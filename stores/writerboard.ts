export const useWriterBoard = defineStore('writerboard', () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const userToken = useCookie('token')

  const selectedArticleIds = ref<number[]>([])
  const postedArticles = ref<ArticleSummary[]>([])
  const allMyArticles = ref<ArticleSummary[]>([])

  // 取得作家後台文章列表
  const getMyArticles = async () => {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/writer/articles`, {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
      })
      console.log(res.Data)
      if (res.StatusCode === 200) {
        postedArticles.value = res.Data.filter(
          (article: ArticleSummary) => article.Progress !== '草稿'
        )
        allMyArticles.value = res.Data
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  // 刪除單篇文章
  const delArticle = async (id: number) => {
    if (!userToken.value) {
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/article/delete/${id}`, {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
        method: 'DELETE'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        console.log(res.Message)
        getMyArticles()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  return { selectedArticleIds, postedArticles, allMyArticles, getMyArticles, delArticle }
})
