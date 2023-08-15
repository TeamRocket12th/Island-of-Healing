// 取得單篇話題資訊
import { useLoading } from '~/stores/loading'

export const useTopicDetail = () => {
  const { setLoading } = useLoading()
  const { apiBase } = useApiConfig()
  const topicDetail = ref<TopicDetail | null>(null)
  const posterInfo = ref<PosterData | null>(null)
  const topicComments = ref<TopicComment[]>([])

  const getTopic = async (topicId: string) => {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/readconversation/${topicId}`)
      if (res.StatusCode === 200) {
        topicDetail.value = res.ConversationData
        topicComments.value = res.Comments
        posterInfo.value = res.PosterData
      }
    } catch (error: any) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  return {
    topicDetail,
    posterInfo,
    topicComments,
    getTopic
  }
}
