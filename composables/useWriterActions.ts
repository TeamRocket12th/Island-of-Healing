export const useWriterActions = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const userToken = useCookie('token')

  const followWriter = async (id: number, refresh: () => Promise<void>) => {
    if (!userToken.value) {
      alert('請先登入')
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/writer/follow/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'POST'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        alert(res.Message)
        refresh()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  const unFollowWriter = async (id: number, refresh: () => Promise<void>) => {
    if (!userToken.value) {
      alert('請先登入')
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/writer/cancelfollow/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'DELETE'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        alert(res.Message)
        refresh()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  return { followWriter, unFollowWriter }
}
