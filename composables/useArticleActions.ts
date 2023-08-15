import { useToast } from '~/stores/toast'

export const useArticleActions = () => {
  const { apiBase, userToken } = useApiConfig()
  const { setToast } = useToast()
  // 收藏/取消收藏 文章
  const handleCollectionAction = async (
    articleId: number,
    collect: boolean,
    article?: Article | ArticleDetail,
    userId?: string,
    getArticleDetail?: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (!userToken.value) {
      setToast('請先登入！')
      return
    }

    const url = `${apiBase}/article/${collect ? 'collect' : 'cancelcollect'}/${articleId}`
    const method = collect ? 'POST' : 'PUT'
    const successMessage = collect ? '收藏成功！' : '已取消收藏！'

    try {
      const res: ApiResponse = await $fetch(url, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method
      })

      if (res.StatusCode === 200) {
        setToast(successMessage)
        if (article && 'IsCollected' in article) {
          article.IsCollected = !article.IsCollected
        }
        if (getArticleDetail && userId) {
          await getArticleDetail(articleId.toString(), userId)
        }
      }
    } catch (error: any) {
      setToast('發生錯誤！')
    }
  }

  // 給文章愛心
  const likeArticle = async (
    id: number,
    articleId: string,
    userId: string,
    getArticleDetail: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (!userToken.value) {
      setToast('請先登入！')
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/article/like/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'POST'
      })
      if (res.StatusCode === 200) {
        setToast('已給予愛心！')
        getArticleDetail(articleId, userId)
      }
    } catch (error: any) {
      setToast('發生錯誤！')
    }
  }

  // 取消文章愛心
  const unlikeArticle = async (
    id: number,
    articleId: string,
    userId: string,
    getArticleDetail: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (!userToken.value) {
      setToast('請先登入！')
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/article/cancellike/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'PUT'
      })
      if (res.StatusCode === 200) {
        setToast('已收回愛心！')
        getArticleDetail(articleId, userId)
      }
    } catch (error: any) {
      setToast('發生錯誤！')
    }
  }

  return {
    handleCollectionAction,
    likeArticle,
    unlikeArticle
  }
}
