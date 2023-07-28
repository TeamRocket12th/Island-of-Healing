export const useTogglePassword = () => {
  const passwordType = ref('password')
  const pwdEyeOpen = ref(false)

  const togglePasswordType = () => {
    passwordType.value = passwordType.value === 'text' ? 'password' : 'text'
    pwdEyeOpen.value = !pwdEyeOpen.value
  }

  return { passwordType, pwdEyeOpen, togglePasswordType }
}
