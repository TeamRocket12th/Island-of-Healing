export function usePageName() {
  const route = useRoute()
  const nowPage = ref('')

  nowPage.value = route.meta.pageName as string

  return { nowPage }
}
