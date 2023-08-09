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

  return { topic, previewImage, selectedImage }
})
