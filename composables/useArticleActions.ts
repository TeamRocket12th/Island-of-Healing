import { useToast } from '~/stores/toast'

export const useArticleActions = () => {
  const { apiBase, userToken } = useApiConfig()
  const { setToast } = useToast()

  // 收藏文章
  const AddToCollection = async (
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
      const res: ApiResponse = await $fetch(`${apiBase}/article/collect/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'POST'
      })
      if (res.StatusCode === 200) {
        setToast('收藏成功！')
        getArticleDetail(articleId, userId)
      }
    } catch (error: any) {
      setToast('發生錯誤！')
    }
  }

  // 取消收藏文章
  const cancelCollection = async (
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
      const res: ApiResponse = await $fetch(`${apiBase}/article/cancelcollect/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'PUT'
      })
      if (res.StatusCode === 200) {
        setToast('取消收藏成功！')
        await getArticleDetail(articleId, userId)
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
    AddToCollection,
    cancelCollection,
    likeArticle,
    unlikeArticle
  }
}
