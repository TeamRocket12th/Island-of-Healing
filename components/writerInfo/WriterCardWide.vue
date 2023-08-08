<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'
const { showToast } = storeToRefs(useToast())

defineProps({
  writerInfo: {
    type: Array as () => Writer[],
    required: true
  }
})

const { handleFollowAction } = useWriterActions()

const unfollowAndCloseModal = async (id: number, writer: Writer | null) => {
  await handleFollowAction(id, false, writer!)
  showConfirmModal.value = false
}

// 取消追蹤確認Modal
const selectedId = ref(0)
const selectedWriter = ref<Writer | null>(null)
const showConfirmModal = ref(false)
const closeConfirm = (value: boolean) => {
  showConfirmModal.value = value
}

const confirmDel = (writer: Writer) => {
  showConfirmModal.value = true
  selectedId.value = writer.WriterId
  selectedWriter.value = writer
}
</script>

<template>
  <div>
    <ul v-if="writerInfo.length > 0" class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:px-28">
      <div class="fixed right-10 top-36 z-20 3xl:right-80">
        <ToastMsg v-if="showToast" />
      </div>
      <li
        v-for="writer in writerInfo"
        :key="writer.WriterId"
        class="mb-6 flex items-center justify-between border bg-white p-6 shadow-sm"
      >
        <NuxtLink :to="`/writer/${writer.WriterId}`">
          <div class="flex items-center gap-2">
            <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
              <img :src="writer.ImgUrl" alt="writer" class="h-full w-full object-cover" />
            </div>
            <div>
              <p class="font-medium text-primary">{{ writer.NickName }}</p>
              <p class="text-sm text-primary-dark">{{ writer.JobTitle }}。{{ writer.Bio }}</p>
            </div>
          </div>
        </NuxtLink>
        <button
          v-if="writer.IsFollowing"
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="confirmDel(writer)"
        >
          <Icon name="material-symbols:fitbit-check-small" size="20" />追蹤中
        </button>
        <button
          v-else
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
          @click="handleFollowAction(writer.WriterId, true, writer)"
        >
          <Icon name="ic:baseline-plus" size="20" />追蹤
        </button>
      </li>
    </ul>
    <p v-else-if="writerInfo.length === 0" class="text-center text-2xl text-primary">
      目前還沒有追蹤作家
    </p>
    <template v-if="showConfirmModal">
      <ConfirmModal @close-confirm="closeConfirm">
        <template #header>
          <h2 class="text-xl text-primary">取消追蹤?</h2>
        </template>
        <template #content>
          <p class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
            確定要取消追蹤「{{ selectedWriter?.NickName }}」嗎？
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2 p-3">
            <button
              class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
              @click="showConfirmModal = false"
            >
              取消
            </button>
            <button
              class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
              @click="unfollowAndCloseModal(selectedId, selectedWriter!)"
            >
              確定
            </button>
          </div>
        </template>
      </ConfirmModal>
    </template>
  </div>
</template>
<style scoped></style>
