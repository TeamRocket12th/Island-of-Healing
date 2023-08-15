export const useToast = defineStore('toast', () => {
  const toastText = ref('')
  const showToast = ref(false)
  const setToast = (msg: string) => {
    toastText.value = msg
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 1500)
  }

  return {
    showToast,
    toastText,
    setToast
  }
})
