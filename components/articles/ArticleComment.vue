<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const { apiBase, userToken } = useApiConfig()
const { useFormattedTime } = useDateFormat()

const props = defineProps({
  comments: {
    type: Array as () => Comment[],
    required: true
  },
  articleId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  getArticleDetail: {
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

const editArea = ref(null as any)
const emojiPicker = ref<any>(null)

const showEmojiPicker = ref(false)
const insertEmoji = (emoji: any) => {
  editingContent.value += emoji.i
  showEmojiPicker.value = false
}

const autoResizeE = () => {
  if (editArea.value[0]) {
    editArea.value[0].style.height = 'auto'
    editArea.value[0].style.height = `${editArea.value[0].scrollHeight}px`
  }
}

// 編輯文章內的留言
const updateComment = async (id: number) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/articlecomment/update`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'PUT',
      body: {
        CommentId: id,
        Comment: editingContent.value
      }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      alert(res.Message)
      editingId.value = null
      props.getArticleDetail(props.articleId, props.userId)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 刪除文章內的留言
const delComment = async (id: number) => {
  openCommentId.value = null
  if (!userToken.value) {
    return
  }
  showConfirmModal.value = false
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/articlecomment/delete/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'DELETE'
    })
    console.log(res)
    if (res.StatusCode === 200) {
      alert(res.Message)
      props.getArticleDetail(props.articleId, props.userId)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}

// 刪除留言確認Modal
const selectedId = ref(0)
const showConfirmModal = ref(false)
const closeConfirm = (value: boolean) => {
  showConfirmModal.value = value
}

const confrimDel = (id: number) => {
  showConfirmModal.value = true
  selectedId.value = id
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
        <img :src="comment.ImgUrl" alt="user" class="h-full w-full rounded-full" />
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
                  @click="confrimDel(comment.CommentId)"
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
          <div class="mb-4 grid-cols-7 gap-5 md:mb-0 md:grid">
            <div class="relative col-span-6">
              <textarea
                ref="editArea"
                v-model="editingContent"
                cols="60"
                rows="2"
                max="50"
                placeholder="留言分享你的想法吧！"
                class="h-10 w-full resize-none overflow-hidden rounded border border-secondary py-2 pl-2 pr-10 text-primary-dark outline-primary placeholder:text-sand-300"
                @input="autoResizeE"
              ></textarea>
              <span class="cursor-pointer" @click="showEmojiPicker = !showEmojiPicker"
                ><Icon
                  name="ic:outline-sentiment-satisfied-alt"
                  size="20"
                  class="absolute right-[10px] top-[10px] text-secondary hover:text-primary"
              /></span>
              <ClientOnly>
                <EmojiPicker
                  v-if="showEmojiPicker"
                  ref="emojiPicker"
                  class="absolute right-[10px] top-8 z-[60]"
                  @select="insertEmoji"
                />
              </ClientOnly>
            </div>
            <button
              class="col-span-1 h-10 whitespace-nowrap rounded bg-secondary p-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
              :disabled="!editingContent"
              @click="updateComment(comment.CommentId)"
            >
              發表留言
            </button>
          </div>
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
