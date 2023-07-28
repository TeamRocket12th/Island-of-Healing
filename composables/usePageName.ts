export const usePageName = () => {
  const nowPage = ref('')
  nowPage.value = useRoute().meta.pageName as string

  return { nowPage }
}
