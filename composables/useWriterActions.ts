// 追蹤/取消 追蹤作家
import { useToast } from '~/stores/toast'

export const useWriterActions = () => {
  const { setToast } = useToast()
  const { apiBase, userToken } = useApiConfig()

  // secondId 在重新取得文章時，帶入文章ID
  // secondId 在重新取得作家資訊時，帶入作家ID
  const handleFollowAction = async (
    id: number,
    follow: boolean,
    writer?: Writer | WriterInfo | DetailWriter | TrendingCreater,
    secondId?: string,
    userId?: string,
    refresh?: (secondId: string, userId: string) => Promise<void>
  ) => {
    if (!userToken.value) {
      setToast('請先登入！')
      return
    }
    const url = `${apiBase}/writer/${follow ? 'follow' : 'cancelfollow'}/${id}`
    const method = follow ? 'POST' : 'DELETE'
    const successMessage = follow ? '追蹤成功！' : '已取消追蹤！'

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
        if (writer && 'IsFollowing' in writer) {
          writer.IsFollowing = !writer.IsFollowing
        } else if (writer && 'Follow' in writer) {
          writer.Follow = !writer.Follow
        } else if (writer && 'IsFollowed' in writer) {
          writer.IsFollowed = !writer.IsFollowed
        }
        if (refresh && secondId && userId) {
          refresh(secondId, userId)
        }
      }
    } catch (error: any) {
      setToast('發生錯誤！')
    }
  }

  return { handleFollowAction }
}
