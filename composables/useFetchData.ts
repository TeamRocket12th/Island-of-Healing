// MockAPI
export const getMockData = <T>(baseRoute: string, endpoint?: string) => {
  const runtimeConfig = useRuntimeConfig()
  const mockApiBase = runtimeConfig.public.mockApiBase
  const route = useRoute()

  const data = ref<T[]>([])
  const error = ref<any>(null)

  const fetchData = async () => {
    let apiUrl = `${mockApiBase}/${baseRoute}`
    if (endpoint) {
      apiUrl += `/${route.params.id}/${endpoint}`
    }
    try {
      const res: ApiResponse = await $fetch(apiUrl)
      if (res.statusCode === 200) {
        data.value = res.data
      } else {
        throw new Error(`HTTP status code is ${res.statusCode}`)
      }
    } catch (err) {
      error.value = err
    }
  }

  onMounted(fetchData)

  return { data, error, fetchData }
}
