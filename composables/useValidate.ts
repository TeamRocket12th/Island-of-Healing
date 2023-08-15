export const useValidate = () => {
  const emailRequired = (value: string) => {
    if (value && value.trim()) {
      return true
    }
    return '*電子郵件為必填'
  }

  const emailRule = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regex.test(value)) {
      return true
    }
    return '*請輸入有效的電子郵件'
  }

  const passwordRequired = (value: string) => {
    if (value && value.trim()) {
      return true
    }
    return '*密碼 為必填'
  }

  const passwordRule = (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
    if (regex.test(value)) {
      return true
    }
    return '*請輸入 8 位以上大小寫英數字組合'
  }

  const confirmPwdSame = (pwd: Ref<string>, confirmPwd: Ref<string>) => {
    if (pwd.value === confirmPwd.value) {
      return true
    }
    return '*密碼不一致'
  }
  return { emailRequired, emailRule, passwordRequired, passwordRule, confirmPwdSame }
}
