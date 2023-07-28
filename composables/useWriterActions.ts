// 追蹤/取消追蹤作家
import { useToast } from '~/stores/toast'

export const useWriterActions = () => {
  const { setToast } = useToast()

  const { apiBase, userToken } = useApiConfig()

  // SecondId 在重新取得文章時，帶入文章ID
  // SecondId 在重新取得作家資訊時，帶入作家ID

  const followWriter = async (
    id: number,
    secondId: string,
    userId: string,
    refresh: (secondId: string, userId: string) => Promise<void>
  ) => {
    if (!userToken.value) {
      setToast('請先登入！')
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
      if (res.StatusCode === 200) {
        setToast('追蹤成功！')
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
      setToast('請先登入！')
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
      if (res.StatusCode === 200) {
        setToast('已取消追蹤！')
        refresh(secondId, userId)
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  return { followWriter, unFollowWriter }
}
