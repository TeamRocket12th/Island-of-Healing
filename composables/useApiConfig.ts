export const useApiConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const userToken = useCookie('token')

  return { apiBase, userToken }
}
