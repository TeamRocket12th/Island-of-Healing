export const useFadeUpOnMobile = () => {
  const isMobile = ref(false)

  const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768 // 假設手機尺寸為 768px 或更小，您可以根據需要調整此值
  }

  onMounted(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIsMobile)
  })

  return {
    isMobile,
    checkIsMobile
  }
}
