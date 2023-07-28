export const useUIStore = defineStore('ui', () => {
  // 作家後台選單狀態
  const isWriterExpanded = ref(false)
  const toggleWriterSettings = () => {
    isWriterExpanded.value = !isWriterExpanded.value
  }

  return { isWriterExpanded, toggleWriterSettings }
})
