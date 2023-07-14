export const useArticleActions = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const userToken = useCookie('token')

  // 收藏文章
  const AddToCollection = async (
    id: number,
    articleId: string,
    userId: string,
    getArticleDetail: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (userToken.value) {
      try {
        const res: ApiResponse = await $fetch(`${apiBase}/article/collect/${id}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userToken.value}`
          },
          method: 'POST'
        })
        console.log(res)
        if (res.StatusCode === 200) {
          alert(res.Message)
          getArticleDetail(articleId, userId)
        }
      } catch (error: any) {
        console.log(error.response)
      }
    }
  }

  // 取消收藏文章
  const cancelCollection = async (
    id: number,
    articleId: string,
    userId: string,
    getArticleDetail: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (userToken.value) {
      try {
        const res: ApiResponse = await $fetch(`${apiBase}/article/cancelcollect/${id}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userToken.value}`
          },
          method: 'PUT'
        })
        console.log(res)
        if (res.StatusCode === 200) {
          alert(res.Message)
          await getArticleDetail(articleId, userId)
        }
      } catch (error: any) {
        console.log(error.response)
      }
    }
  }

  // 給文章愛心
  const likeArticle = async (
    id: number,
    articleId: string,
    userId: string,
    getArticleDetail: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (userToken.value) {
      try {
        const res: ApiResponse = await $fetch(`${apiBase}/article/like/${id}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userToken.value}`
          },
          method: 'POST'
        })
        console.log(res)
        if (res.StatusCode === 200) {
          alert(res.Message)
          getArticleDetail(articleId, userId)
        }
      } catch (error: any) {
        console.log(error.response)
      }
    }
  }

  // 取消文章愛心
  const unlikeArticle = async (
    id: number,
    articleId: string,
    userId: string,
    getArticleDetail: (articleId: string, userId: string) => Promise<void>
  ) => {
    if (userToken.value) {
      try {
        const res: ApiResponse = await $fetch(`${apiBase}/article/cancellike/${id}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userToken.value}`
          },
          method: 'PUT'
        })
        console.log(res)
        if (res.StatusCode === 200) {
          alert(res.Message)
          getArticleDetail(articleId, userId)
        }
      } catch (error: any) {
        console.log(error.response)
      }
    }
  }

  return {
    AddToCollection,
    cancelCollection,
    likeArticle,
    unlikeArticle
  }
}
