<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})

const modalUse = ref(false)
const showCancelModal = (value: boolean) => {
  modalUse.value = value
}
const hideCancelModal = (value: boolean) => {
  modalUse.value = value
}

const hideCancelCheck = (value: boolean) => {
  modalUse.value = value
}
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = modalUse.value ? 'hidden' : 'auto'
    document.body.style.paddingRight = modalUse.value ? '15px' : '0'
  }
})

const renewMembership = ref(false)
const endDate = ref('')

const getUserOrder = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/userorderdetail/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      endDate.value = res.EndDate
      renewMembership.value = res.RenewMembership
      userData.value.myPlan = res.Plan
    }
  } catch (error: any) {
    console.log(error)
  }
}
onMounted(getUserOrder)
</script>
<template>
  <div>
    <PlanManagement
      class="relative"
      :renew-membership="renewMembership"
      :end-date="endDate"
      @plan-cancel="showCancelModal"
    />
    <Teleport to="body">
      <Transition>
        <CancelPlan
          v-if="modalUse"
          :user-order="getUserOrder"
          @plan-cancel="hideCancelModal"
          @cancel-check="hideCancelCheck"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
