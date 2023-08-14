export const useUIStore = defineStore('ui', () => {
  // 手機版導覽選單
  const showMobileMenu = ref(false)
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  // 作家後台選單狀態
  const isWriterExpanded = ref(false)
  const toggleWriterSettings = () => {
    isWriterExpanded.value = !isWriterExpanded.value
  }

  const showAccountMenu = ref(false)
  const toggleAccountMenu = (event: MouseEvent) => {
    showAccountMenu.value = !showAccountMenu.value
    event.stopPropagation()
  }

  return {
    isWriterExpanded,
    toggleWriterSettings,
    showAccountMenu,
    toggleAccountMenu,
    showMobileMenu,
    toggleMobileMenu
  }
})
