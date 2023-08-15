export const useFadeUpOnMobile = () => {
  const isMobile = ref(false)

  const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768
  }

  return {
    isMobile,
    checkIsMobile
  }
}
