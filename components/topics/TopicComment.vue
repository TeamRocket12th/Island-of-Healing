<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'

const { userData } = storeToRefs(useUserStore())
const { apiBase, userToken } = useApiConfig()
const { useFormattedTime } = useDateFormat()
const { setToast } = useToast()

const props = defineProps({
  comments: {
    type: Array as () => TopicComment[],
    required: true
  },
  topicId: {
    type: String,
    required: true
  },
  getTopic: {
    type: Function,
    required: true
  }
})

const openCommentId = ref(null as number | null)
const toggleEditBtns = (id: number) => {
  openCommentId.value = openCommentId.value === id ? null : id
}

const editingId = ref(null as number | null)
const editingContent = ref('')
const startToEdit = (id: number, content: string) => {
  editingId.value = id
  editingContent.value = content
  toggleEditBtns(id)
}

// 編輯話題內的留言
const updateComment = async (id: string, inputTxt: string) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversationcomment/update`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'PUT',
      body: {
        CommentId: id,
        Comment: inputTxt
      }
    })
    if (res.StatusCode === 200) {
      setToast('編輯成功！')
      editingId.value = null
      props.getTopic(props.topicId)
    }
  } catch (error: any) {
    setToast('發生錯誤！')
  }
}

const handleUpdateComment = (inputTxt: string) => {
  updateComment(String(editingId.value), inputTxt)
}

// 刪除話題內的留言
const delComment = async (id: string) => {
  openCommentId.value = null
  if (!userToken.value) {
    return
  }
  showConfirmModal.value = false
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversationcomment/delete/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'DELETE'
    })
    if (res.StatusCode === 200) {
      setToast('已刪除！')
      props.getTopic(props.topicId)
    }
  } catch (error: any) {
    setToast('發生錯誤！')
  }
}

// 刪除留言確認Modal
const selectedId = ref('')
const showConfirmModal = ref(false)
const closeConfirm = (value: boolean) => {
  showConfirmModal.value = value
}

const confirmDel = (id: number) => {
  showConfirmModal.value = true
  selectedId.value = String(id)
  openCommentId.value = null
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = showConfirmModal.value ? 'hidden' : 'auto'
    document.body.style.paddingRight = showConfirmModal.value ? '15px' : '0'
  }
})
</script>

<template>
  <ul class="mb-4">
    <li v-for="comment in comments" :key="comment.CommentId" class="mb-6 flex">
      <div class="mr-3 mt-3 h-9 w-9 sm:mt-0">
        <NuxtImg :src="comment.ImgUrl" alt="user" class="h-full w-full rounded-full" />
      </div>
      <div class="w-full">
        <div class="flex justify-between">
          <p class="mb-1 font-medium text-primary">{{ comment.NickName }}</p>
          <div class="relative w-20 text-right">
            <span v-if="!editingId" class="cursor-pointer text-primary"
              ><Icon
                name="material-symbols:more-horiz"
                class="h-6 w-6"
                @click="toggleEditBtns(comment.CommentId)"
              />
            </span>
            <div
              v-if="openCommentId === comment.CommentId"
              class="absolute top-6 z-10 w-full rounded border border-primary bg-white text-center"
            >
              <div v-if="comment.UserId === userData.id" class="flex flex-col">
                <button
                  class="cursor-pointer border-b border-primary py-1 text-primary hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
                  @click="startToEdit(comment.CommentId, comment.Comment)"
                >
                  編輯
                </button>
                <button
                  class="py-1 text-primary hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
                  @click="confirmDel(comment.CommentId)"
                >
                  刪除
                </button>
              </div>
              <div
                v-else
                class="text-primary hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
              >
                <button class="cursor-pointer py-1" @click="toggleEditBtns(comment.CommentId)">
                  檢舉留言
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="comment.UserId === userData.id && editingId === comment.CommentId">
          <CommentInput :editing-content="editingContent" @send-input-txt="handleUpdateComment" />
          <button class="text-sm text-[#1E40AF] underline" @click="editingId = null">取消</button>
        </div>
        <div v-else class="flex justify-between">
          <p class="mb-2 w-4/5 font-light text-primary-dark md:mb-0">
            {{ comment.Comment }}
          </p>
          <span
            class="font-sm self-end justify-self-end whitespace-nowrap font-light text-[#3D1F03]"
            >{{ useFormattedTime(comment.LatestDate) }}</span
          >
        </div>
      </div>
    </li>
  </ul>
  <div>
    <template v-if="showConfirmModal">
      <ConfirmModal @close-confirm="closeConfirm">
        <template #header>
          <h2 class="text-xl text-primary">刪除留言?</h2>
        </template>
        <template #content>
          <p class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
            確定要刪除這則留言嗎？
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
              @click="delComment(selectedId)"
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
