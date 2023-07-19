import { useToast } from '~/stores/toast'

// 追蹤/取消追蹤作家
export const useWriterActions = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const userToken = useCookie('token')
  const { setfollowWriter, setunFollowWriter } = useToast()
  // SecondId 在重新取得文章時，帶入文章ID
  // SecondId 在重新取得作家資訊時，帶入作家ID

  const followWriter = async (
    id: number,
    secondId: string,
    userId: string,
    refresh: (secondId: string, userId: string) => Promise<void>
  ) => {
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
        setunFollowWriter(false)
        setfollowWriter(true)
        setTimeout(() => {
          setfollowWriter(false)
        }, 2000)
        refresh(secondId, userId)
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  const unFollowWriter = async (
    id: number,
    secondId: string,
    userId: string,
    refresh: (secondId: string, userId: string) => Promise<void>
  ) => {
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
        setfollowWriter(false)
        setunFollowWriter(true)
        setTimeout(() => {
          setunFollowWriter(false)
        }, 2000)
        refresh(secondId, userId)
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  return { followWriter, unFollowWriter }
}
