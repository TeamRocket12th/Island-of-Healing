<script setup lang="ts">
const selectedImage: Ref<string> = ref('')
const fileInput: Ref<HTMLInputElement | null> = ref(null)
const articleTitle: Ref<string> = ref('')

const openFilePicker = (): void => {
  fileInput.value?.click()
}

const selectFile = (event: Event): void => {
  const inputElement = event.target as HTMLInputElement
  const file = inputElement.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      selectedImage.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const selectedCategory = ref('選擇文章分類')
const toggleshowCategory = ref(false)

const selectCategory = (category: string): void => {
  selectedCategory.value = category
}
watch(selectedCategory, (newValue) => {
  console.log('category:', newValue)
})

const toggleCategory = (status: boolean): void => {
  console.log(status)
  toggleshowCategory.value = status
}

const emits = defineEmits(['post-upload', 'title-post'])
const postSent = (value: boolean) => {
  emits('post-upload', value)
}
const newTag = ref('')
const tags: Ref<string[]> = ref([])

const addTag = () => {
  if (newTag.value && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value)
    newTag.value = ''
  }
}

const removeTag = (index: number): void => {
  tags.value.splice(index, 1)
}
</script>
<template>
  <div class="container grid grid-cols-12 border pt-10">
    <div class="relative col-span-10 col-start-3 pt-60">
      <Icon
        name="ic:baseline-close"
        size="24"
        class="absolute right-0 top-0"
        @click="postSent(false)"
      />
      <h2 class="mb-10">文章設定</h2>
    </div>
    <div class="col-span-5 col-start-3 border">
      <div class="border px-14 py-28">
        <h3 class="mb-3">文章封面</h3>
        <div>
          <div class="h-[200px] max-w-full overflow-hidden bg-[#D9D9D9]">
            <img
              v-if="selectedImage"
              class="pointer-events-none h-[200px] w-full"
              :src="selectedImage"
              alt="Selected Image"
            />
            <input ref="fileInput" type="file" style="display: none" @change="selectFile" />
          </div>
          <div class="flex justify-end">
            <button class="mb-4 border p-2" @click="openFilePicker">新增封面</button>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="mb-2">文章標題</h3>
          <input
            v-model="articleTitle"
            type="text"
            placeholder="請輸入文章標題"
            class="w-full border px-3 py-2 outline-none"
          />
        </div>
        <div>
          <h3 class="mb-2">新增標籤</h3>
          <div class="flex flex-wrap items-center border p-2">
            <div class="flex gap-1">
              <span
                v-for="(tag, index) in tags"
                :key="index"
                class="relative flex items-center rounded-sm bg-[#D9D9D9] p-1"
              >
                {{ tag }}
                <button @click="removeTag(index)">
                  <Icon name="ic:baseline-close" size="12" class="absolute right-0 top-0" />
                </button>
              </span>
            </div>
            <input
              v-model="newTag"
              placeholder="請新增文章標籤"
              class="pl-1 outline-none"
              @keyup.enter="addTag"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-3 col-start-8 ml-6 pt-28">
      <fieldset class="mb-10 block">
        <legend class="mb-2">閱讀權限</legend>
        <div class="flex gap-3">
          <div>
            <input id="free" type="radio" name="drone" value="免費" checked />
            <label for="free">免費文章</label>
          </div>
          <div>
            <input id="pay" type="radio" name="drone" value="付費" />
            <label for="pay">付費文章</label>
          </div>
        </div>
      </fieldset>
      <div class="dropdown mb-10 block">
        <p class="mb-2">文章分類</p>
        <label tabindex="0" class="btn m-1 flex justify-between" @click="toggleCategory(true)">
          <span>{{ selectedCategory }}</span>
          <Icon name="ic:round-arrow-drop-down" size="24" />
        </label>
        <ul
          v-show="toggleshowCategory"
          tabindex="0"
          class="dropdown-content menu rounded-box w-full bg-base-100 p-2 shadow"
          @click="toggleCategory(false)"
        >
          <li><a @click="selectCategory('個人成長')">個人成長</a></li>
          <li><a @click="selectCategory('情緒覺察')">情緒覺察</a></li>
          <li><a @click="selectCategory('親密關係')">親密關係</a></li>
          <li><a @click="selectCategory('日常練習')">日常練習</a></li>
        </ul>
      </div>
      <div>
        <VForm>
          <label for="userIntro" class="mb-2 block">內容摘要</label>
          <VField
            id="userIntro"
            name="userIntro"
            as="textarea"
            label="*內容摘要"
            rules="max:100"
            rows="6"
            class="w-full rounded-sm border border-[#D9D9D9] py-[7px] pl-3 text-[#7B7B7B] outline-none"
            placeholder="讓更多人了解你的文章..."
          />
          <VErrorMessage name="userIntro" class="text-red-500" />
        </VForm>
      </div>
    </div>
    <div class="col-span-8 col-start-3">
      <div class="flex justify-end">
        <button class="border bg-[#9F9F9F] px-3 py-2 text-white">確認送出</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
