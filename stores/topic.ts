export const useTopic = defineStore('topic', () => {
  const topic = reactive({
    Title: '',
    Content: '',
    Tags: [] as string[],
    Anonymous: true,
    ConversationsCategoryId: 1,
    Summary: ''
  })
  const previewImage = ref('')
  const selectedImage = ref('')
  const nowPage = ref(1)
  return { topic, previewImage, selectedImage, nowPage }
})
