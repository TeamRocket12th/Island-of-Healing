<script setup lang="ts">
const props = defineProps({
  editingContent: {
    type: String,
    default: ''
  }
})

const inputText = ref('')

watchEffect(() => {
  if (props.editingContent) {
    inputText.value = props.editingContent
  }
})

const emits = defineEmits(['sendInputTxt'])
const sendInputTxt = (inputTxt: string) => {
  emits('sendInputTxt', inputTxt)
  inputText.value = ''
}

const textarea = ref<HTMLTextAreaElement | null>(null)
const emojiPicker = ref<any>(null)

const autoResize = () => {
  textarea.value!.style.height = '40px'
  textarea.value!.style.height = textarea.value!.scrollHeight + 'px'
}
const showEmojiPicker = ref(false)

const insertEmoji = (emoji: any) => {
  inputText.value += emoji.i
  showEmojiPicker.value = false
}
</script>

<template>
  <div class="grid-cols-7 gap-6 text-right md:grid md:text-left">
    <div class="relative col-span-5 mb-4 md:mb-0 xl:col-span-6">
      <textarea
        ref="textarea"
        v-model="inputText"
        cols="60"
        rows="2"
        max="50"
        placeholder="留言分享你的想法吧！"
        class="focus: h-10 w-full resize-none overflow-hidden rounded border border-secondary py-2 pl-2 pr-10 text-primary-dark outline-primary placeholder:text-sand-300"
        @input="autoResize"
      ></textarea>
      <span class="cursor-pointer" @click="showEmojiPicker = !showEmojiPicker"
        ><Icon
          name="ic:outline-sentiment-satisfied-alt"
          size="20"
          class="absolute right-[10px] top-[10px] z-50 text-secondary hover:text-primary"
      /></span>
      <ClientOnly>
        <EmojiPicker
          v-if="showEmojiPicker"
          ref="emojiPicker"
          class="absolute right-[10px] top-8 z-[999]"
          @select="insertEmoji"
        />
      </ClientOnly>
    </div>
    <div class="col-span-2 xl:col-span-1">
      <button
        class="h-10 whitespace-nowrap rounded bg-secondary p-2 text-right text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white xl:w-full"
        :disabled="!inputText"
        @click="sendInputTxt(inputText)"
      >
        發表留言
      </button>
    </div>
  </div>
</template>

<style scoped></style>
