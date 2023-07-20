export const useLoading = defineStore('loading', () => {
  const isLoading = ref(false)
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const chatLoading = ref(false)
  const setChatLoading = (loading: boolean) => {
    chatLoading.value = loading
  }

  return { isLoading, setLoading, chatLoading, setChatLoading }
})
