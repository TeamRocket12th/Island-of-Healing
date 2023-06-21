export const getMockData = <T>(endpoint: string) => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const route = useRoute()

  const data = ref<T[]>([])
  const error = ref<any>(null)

  const fetchData = async () => {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/account/${route.params.id}/${endpoint}`)
      if (res.statusCode === 200) {
        data.value = res.data
        console.log(res)
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
