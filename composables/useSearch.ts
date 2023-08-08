export const useSearch = () => {
  const router = useRouter()

  // 搜尋文章
  const searchArticle = (searchKeyWord: string) => {
    router.push({ path: '/search/articles', query: { q: searchKeyWord, c: '0' } })
  }

  // 搜尋話題
  const searchTopic = (searchKeyWord: string) => {
    router.push({ path: '/search/topics', query: { q: searchKeyWord, c: '0' } })
  }
  return {
    searchArticle,
    searchTopic
  }
}
