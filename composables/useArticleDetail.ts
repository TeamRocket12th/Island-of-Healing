// 取得單篇文章資訊
import { useLoading } from '~/stores/loading'

export const useArticleDetail = () => {
  const { setLoading } = useLoading()
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const articleDetail = ref<ArticleDetail | null>(null)
  const writerInfo = ref<DetailWriter | null>(null)
  const isCollecting = ref(false)
  const isLiking = ref(false)
  const isRead = ref(false)
  const comments = ref<Comment[]>([])
  const haveCover = ref(false)
  const isLock = ref(true)

  const getArticleDetail = async (articleId: string, userId: string) => {
    const { data, error } = await useFetch<ApiResponse>(
      `${apiBase}/readarticle/${articleId}/${userId}`
    )
    console.log(data.value)
    if (data.value?.StatusCode === 200) {
      articleDetail.value = data.value.ArticleData
      writerInfo.value = data.value.WriterData
      isCollecting.value = data.value.Collect
      isLiking.value = data.value.Like
      comments.value = data.value.Comment
      isLock.value = data.value.ArticleData.Pay
      isRead.value = data.value.ArticleData.IsRead
      setLoading(false)
      if (data.value.ArticleData.IsRead) {
        isLock.value = false
      }
      if (data.value.ArticleData.ImgUrl !== '') {
        haveCover.value = true
      }
    }

    if (error.value) {
      console.log(error.value)
      setLoading(false)
    }
  }
  return {
    articleDetail,
    writerInfo,
    isCollecting,
    isLiking,
    comments,
    haveCover,
    isLock,
    isRead,
    getArticleDetail
  }
}
