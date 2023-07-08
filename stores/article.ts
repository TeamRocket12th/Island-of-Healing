export const useArticle = defineStore('article', () => {
  const article = reactive({
    Title: '',
    Content: '',
    Tags: [] as string[],
    Pay: false,
    ArticlesClassId: 1,
    Summary: '',
    Progress: 0
  })

  return { article }
})
