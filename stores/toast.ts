export const useToast = defineStore('toast', () => {
  const isCollect = ref(false)
  const setCollect = (collect: boolean) => {
    isCollect.value = collect
  }
  const cancelCollect = ref(false)
  const setcancelCollect = (cancelcollect: boolean) => {
    cancelCollect.value = cancelcollect
  }

  const followWriterPoint = ref(true)
  const setfollowWriter = (followwriter: boolean) => {
    followWriterPoint.value = followwriter
  }
  const unFollowWriterPoint = ref(false)
  const setunFollowWriter = (unfollowwriter: boolean) => {
    unFollowWriterPoint.value = unfollowwriter
  }
  return {
    isCollect,
    setCollect,
    cancelCollect,
    setcancelCollect,
    followWriterPoint,
    setfollowWriter,
    unFollowWriterPoint,
    setunFollowWriter
  }
})
