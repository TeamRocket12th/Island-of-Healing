<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
import { useToast } from '~/stores/toast'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()
const { setToast } = useToast()

const { apiBase, userToken } = useApiConfig()
const { formatDate } = useDateFormat()
const router = useRouter()

const mytopicList = ref<MyTopic[]>([])

// 取得個人話題
const getMyTopic = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/user/conversations`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      mytopicList.value = res.Data
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    setLoading(false)
  }
}

const topicWithCheckbox = ref<MyTopic[]>([])
watchEffect(() => {
  topicWithCheckbox.value = mytopicList.value.map((item) => ({ ...item, isChecked: false }))
})

const selectedTopicIds = ref<number[]>([])

const collectTopic = (topicId: number) => {
  if (selectedTopicIds.value.includes(topicId)) {
    selectedTopicIds.value = selectedTopicIds.value.filter((id) => id !== topicId)
  } else {
    selectedTopicIds.value.push(topicId)
  }
  selectedTopic.value = null
}

setLoading(true)
onMounted(getMyTopic)

const showConfirmModal = ref(false)
const selectedTopic = ref<MyTopic | null>(null)

const confirmDel = (topic: MyTopic) => {
  showConfirmModal.value = true
  selectedTopicIds.value = []
  selectedTopic.value = topic
}

const closeConfirm = (value: boolean) => {
  showConfirmModal.value = value
}

// 刪除個人話題
const delMyTopic = async (id: number) => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/conversation/delete/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'DELETE'
    })
    if (res.StatusCode === 200) {
      setToast('已刪除！')
      getMyTopic()
    }
  } catch (error: any) {
    setToast('發生錯誤！')
    console.log(error.response)
  }
}

// 刪除單篇話題
const handleDel = () => {
  showConfirmModal.value = false
  delMyTopic(selectedTopic.value!.Id)
}

// 刪除多篇話題
const handleDelAll = async () => {
  showConfirmModal.value = false
  try {
    await Promise.all(selectedTopicIds.value.map((id: number) => delMyTopic(id)))
    selectedTopicIds.value = []
    await getMyTopic()
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <div class="text-right">
    <button
      type="button"
      class="mb-3 rounded bg-secondary px-2 py-1 text-sm text-sand-100 hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white md:h-8"
      :disabled="selectedTopicIds.length === 0"
      @click="showConfirmModal = true"
    >
      全部刪除
    </button>
  </div>
  <div class="overflow-x-auto">
    <table class="w-[1240px] md:w-full">
      <thead>
        <tr class="bg-sand-200 text-primary">
          <th class="py-[10px] font-medium">選取</th>
          <th class="py-[10px] font-medium">話題名稱</th>
          <th class="py-[10px] font-medium">發佈時間</th>
          <th class="py-[10px] font-medium">留言次數</th>
          <th class="py-[10px] font-medium">操作</th>
        </tr>
      </thead>
      <tbody v-if="mytopicList.length > 0 && !isLoading">
        <tr v-for="topic in topicWithCheckbox" :key="topic.Id" class="text-center">
          <td class="px-11 py-[10px] md:w-[10%]">
            <div class="h-6">
              <input
                :id="`checkbox${topic.Id}`"
                v-model="topic.isChecked"
                type="checkbox"
                class="hidden"
                @change="collectTopic(topic.Id)"
              />
              <label
                :for="`checkbox${topic.Id}`"
                class="inline-block h-6 w-6 cursor-pointer rounded border border-secondary"
              >
                <Icon
                  v-if="topic.isChecked"
                  name="ic:outline-check"
                  class="pb-[6px] text-primary"
                  size="24"
                />
              </label>
            </div>
          </td>
          <td class="w-[31%] py-[10px] text-primary-dark">
            <NuxtLink :to="`/forum/${topic.Id}`">{{ topic.Title }}</NuxtLink>
          </td>
          <td class="w-[14%] py-[10px] text-primary-dark">{{ formatDate(topic.Initdate) }}</td>
          <td class="w-[17%] py-[10px] text-primary-dark">{{ topic.CommentsNum }}</td>
          <td class="py-[10px] text-primary-dark md:w-[17%]">
            <button
              type="button"
              class="text-scondary disabled:text-btn-disabled"
              @click="router.push(`/edittopic/${topic.Id}`)"
            >
              <Icon name="material-symbols:edit-outline" size="24" class="mr-3" />
            </button>
            <button type="button" class="disabled:text-btn-disabled" @click="confirmDel(topic)">
              <Icon name="material-symbols:delete-outline" size="24" />
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="mytopicList.length === 0 && !isLoading">
        <tr>
          <td colspan="6" class="pt-10 text-center text-2xl font-medium text-primary">
            找不到話題
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <template v-if="showConfirmModal">
    <ConfirmModal @close-confirm="closeConfirm">
      <template #header>
        <h2 class="text-xl text-primary">刪除話題?</h2>
      </template>
      <template #content>
        <p
          v-if="selectedTopicIds.length === 0"
          class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark"
        >
          確定要刪除這則話題嗎？
        </p>
        <p v-else class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
          確定要刪除這{{ selectedTopicIds.length }}則話題嗎？
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2 p-3">
          <button
            type="button"
            class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="showConfirmModal = false"
          >
            取消
          </button>

          <button
            v-if="selectedTopicIds.length === 0"
            type="button"
            class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="handleDel"
          >
            確定
          </button>
          <button
            v-else
            type="button"
            class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="handleDelAll"
          >
            確定
          </button>
        </div>
      </template>
    </ConfirmModal>
  </template>
</template>
