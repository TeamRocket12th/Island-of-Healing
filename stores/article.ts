export const postArticle = defineStore('article', () => {
  const articleDetails = ref({
    Title: '',
    Content: '',
    Pay: false,
    ArticlesClassId: 5,
    Summary: '',
    Tags: [] as string[],
    Progress: 0
  })

  return { articleDetails }
})
