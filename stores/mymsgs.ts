import { useLoading } from '~/stores/loading'
import { useToast } from '~/stores/toast'

export const useMsgs = defineStore('mymsgs', () => {
  const { setMsgLoading } = useLoading()
  const { setToast } = useToast()
  const { apiBase, userToken } = useApiConfig()

  const userMsgs = ref<UserMsg[]>([])
  const msgsNum = ref(0)
  const msgIndex = ref(0)
  const selectedMsgId = ref(0)
  const selectedMsg = ref<UserMsg | null>(null)

  const setSelectedId = (id: number) => {
    selectedMsgId.value = id
  }

  const unreadMsgs = ref(false)
  const unreadNum = ref(0)

  // 取得個人一個月內所有訊息
  const getMyMsgs = async () => {
    if (!userToken.value) {
      return
    }
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/notifications/get`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        }
      })
      console.log(res)
      if (res.StatusCode === 200) {
        userMsgs.value = res.Notification
        msgsNum.value = res.Notification.length
        if (res.UnReadNum > 0) {
          unreadMsgs.value = true
          unreadNum.value = res.UnReadNum
        } else {
          unreadMsgs.value = false
        }
        const currentMsgExists = userMsgs.value.some((msg) => msg.Id === selectedMsgId.value)

        if (!currentMsgExists && userMsgs.value.length > 0) {
          selectedMsgId.value = userMsgs.value[0].Id
          selectedMsg.value = userMsgs.value[0]
          if (res.Notification.length === 1 && !res.Notification[0].IsRead) {
            readMyMsg(res.Notification[0].Id)
          }
        }
      }
    } catch (error: any) {
      console.log(error.response)
    } finally {
      setMsgLoading(false)
    }
  }

  // 已讀訊息
  const readMyMsg = async (id: number) => {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/readnotification?notificationid=${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'PUT'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        console.log(res.Message)
        if (unreadNum.value > 0) {
          unreadNum.value -= 1
        }
        getMyMsgs()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  watchEffect(() => {
    if (unreadNum.value === 0) {
      unreadMsgs.value = false
    }
  })

  // 刪除訊息
  const delMyMsg = async (id: number) => {
    try {
      const res: ApiResponse = await $fetch(`${apiBase}/notification/delete?notificationid=${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.value}`
        },
        method: 'DELETE'
      })
      console.log(res)
      if (res.StatusCode === 200) {
        console.log(res.Message)
        setToast('刪除成功！')
        await getMyMsgs()
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  watchEffect(() => {
    if (userMsgs.value.length > 0) {
      msgIndex.value = userMsgs.value.findIndex((msg) => msg.Id === selectedMsgId.value)
      selectedMsg.value = userMsgs.value.filter((msg) => msg.Id === selectedMsgId.value)[0]
    }
  })

  return {
    userMsgs,
    msgsNum,
    msgIndex,
    selectedMsgId,
    selectedMsg,
    unreadMsgs,
    setSelectedId,
    getMyMsgs,
    readMyMsg,
    delMyMsg
  }
})
