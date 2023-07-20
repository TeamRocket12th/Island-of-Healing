export const usePaymentStore = defineStore('payment', () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase
  const userToken = useCookie('token')

  // 顧客資料
  const customerData = ref<CustomerData>({
    nickName: '',
    email: '',
    phone: '',
    planId: 0
  })

  const getCustomerInfo = (data: CustomerData) => {
    customerData.value = data
  }

  // 付款資料
  const selectedOrder = ref({
    planName: '',
    price: null as number | null
  })

  interface PaymentData {
    MerchantID: string
    TradeInfo: string
    TradeSha: string
    Version: string
  }

  const paymentData = ref<PaymentData>({
    MerchantID: '',
    TradeInfo: '',
    TradeSha: '',
    Version: ''
  })

  // 向藍新創建訂單（未付款）
  const createOrder = async (customerData: CustomerData) => {
    if (!userToken.value) {
      return
    }
    console.log(customerData.planId)
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/NewebPay/setchargedata`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'POST',
        body: {
          ClientName: customerData?.nickName,
          ClientEmail: customerData?.email,
          ClientPhone: customerData?.phone,
          PlanId: customerData?.planId
        }
      })
      console.log(res)
      if (res.Status) {
        paymentData.value = res.PaymentData
        console.log(paymentData.value)
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  return { paymentData, customerData, selectedOrder, createOrder, getCustomerInfo }
})
