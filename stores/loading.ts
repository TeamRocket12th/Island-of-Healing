export const useLoading = defineStore('loading', () => {
  const isLoading = ref(false)
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  return { isLoading, setLoading }
})
