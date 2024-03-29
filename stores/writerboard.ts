import { useLoading } from './loading'
import { useToast } from './toast'

export const useWriterBoard = defineStore('writerboard', () => {
  const { apiBase } = useApiConfig()
  const { setLoading } = useLoading()
  const { setToast } = useToast()

  const selectedArticleIds = ref<number[]>([])
  const postedArticles = ref<ArticleSummary[]>([])
  const allMyArticles = ref<ArticleSummary[]>([])

  // 取得作家後台文章列表
  const getMyArticles = async () => {
    const userToken = useCookie('token')
    if (!userToken.value) {
      return
    }

    try {
      const res: ApiResponse = await $fetch(`${apiBase}/writer/articles`, {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` }
      })
      if (res.StatusCode === 200) {
        postedArticles.value = res.Data.filter(
          (article: ArticleSummary) => article.Progress !== '草稿'
        )
        allMyArticles.value = res.Data
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      console.log(error.response)
    }
  }

  // 刪除單篇文章
  const delArticle = async (id: number) => {
    const userToken = useCookie('token')
    if (!userToken.value) {
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/article/delete/${id}`, {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${userToken.value}` },
        method: 'DELETE'
      })
      if (res.StatusCode === 200) {
        setToast('已刪除！')
        getMyArticles()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  return { selectedArticleIds, postedArticles, allMyArticles, getMyArticles, delArticle }
})
