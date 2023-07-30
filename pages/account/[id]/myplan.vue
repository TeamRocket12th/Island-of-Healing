<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

const { apiBase, userToken } = useApiConfig()
const { userData } = storeToRefs(useUserStore())

const { setLoading } = useLoading()

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '變更訂閱' })

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
  setLoading(true)
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/userorderdetail/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      endDate.value = res.EndDate
      renewMembership.value = res.RenewMembership
      userData.value.myPlan = res.Plan
      setLoading(false)
    }
  } catch (error: any) {
    console.log(error)
  }
}
onMounted(getUserOrder)
</script>
<template>
  <div>
    <div class="mb-[147px] grid grid-cols-12 border border-primary bg-sand-100">
      <h2 class="col-span-2 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">變更訂閱</h2>
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
