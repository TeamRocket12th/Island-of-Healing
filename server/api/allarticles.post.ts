export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase

  const body = await readBody(event)
  const { Page, UserId } = body

  const getAllArticles = async (Page: string, UserId: string) => {
    try {
      const res = await $fetch<ApiResponse>(`${apiBase}/readallarticles`, {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: {
          Page,
          UserId
        }
      })
      console.log(res)
      if (res.StatusCode === 200) {
        return res
      }
    } catch (error: any) {
      return error.response
    }
  }

  const response = getAllArticles(Page, UserId)

  return response
})
