export const useLoading = defineStore('loading', () => {
  const isLoading = ref(false)
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const chatLoading = ref(false)
  const setChatLoading = (loading: boolean) => {
    chatLoading.value = loading
  }

  const msgLoading = ref(false)
  const setMsgLoading = (loading: boolean) => {
    msgLoading.value = loading
  }
  return { isLoading, setLoading, chatLoading, setChatLoading, msgLoading, setMsgLoading }
})
