export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase

  const body = await readBody(event)
  const { articleId, userId } = body

  const getAllArticles = async (articleId: string, userId: string) => {
    const { data } = await useFetch<ApiResponse>(`${apiBase}/readarticle/${articleId}/${userId}`)
    if (data.value) {
      console.log(data.value)
    }
  }

  const response = getAllArticles(articleId, userId)

  return response
})
