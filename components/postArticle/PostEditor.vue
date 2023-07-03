<script setup>
import { StarterKit } from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import { Image } from '@tiptap/extension-image'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Link } from '@tiptap/extension-link'
import { HardBreak } from '@tiptap/extension-hard-break'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import { Node } from '@tiptap/core'

const articleTitle = ref('')

// 新增節點
const CustomParagraphNode = Node.create({
  name: 'custom_paragraph',
  group: 'block',
  parseHTML: () => [{ type: 'custom_paragraph' }],
  renderHTML: () => ['p', {}, []],
  addKeyboardShortcuts: () => {
    return {
      handleKeyDown: ({ event, editor }) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          editor.commands.setHardBreak()
        }
      }
    }
  }
})

const emits = defineEmits(['post-upload', 'article-title', 'post-rules'])
const postSent = (value) => {
  emits('post-upload', value)
  const title = articleTitle.value
  emits('article-title', title)
}
const rulesShow = (value) => {
  emits('post-rules', value)
}

const editor = ref(null)
onMounted(() => {
  editor.value = new Editor({
    extensions: [
      CustomParagraphNode,
      HardBreak,
      StarterKit,
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'text-p'
        }
      }),
      Text,
      Underline,
      Image.configure({
        allowBase64: true
      }),
      Heading.configure({
        levels: [2, 3]
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'custom-bullet-list'
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'custom-ordered-list'
        }
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'custom-link'
        }
      })
    ],

    content: `
     <blockquote><h2>前言</h2></blockquote><p>情緒是我們內在世界的一部分，影響著我們的思想、行為和日常生活。然而，對於情緒的理解往往被一些迷思所混淆。這些迷思使我們對情緒產生誤解，可能導致負面的影響，影響我們的心理健康和人際關係。本文將探索情緒的常見迷思，幫助我們更深入地理解和處理情緒的重要性。</p><h3>以下是關於情緒的四個迷思，提供了一些觀點來重新理解情緒：</h3><h3>迷思一：情緒是弱點</h3><p>許多人認為情緒表達是一種脆弱的表現，它們認為情緒使人變得脆弱和無力。然而，這是一個錯誤的觀點。情緒是我們人類的自然反應，它們提供了對外界和內在狀態的敏感度和反應能力。情緒能夠幫助我們連結他人，感受生活的豐富性，並提供指導我們行動和做出決策的線索。</p>
    `
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})

const addImage = () => {
  const url = window.prompt('URL')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}
const setLink = () => {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  if (url === null) {
    return
  }
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const textNavbarShow = ref(false)

const swapOn = () => {
  textNavbarShow.value = true
}

const swapOff = () => {
  textNavbarShow.value = false
}

// 輸出
const newJson = ref('')
const newHtml = ref('')
const htmlOutput = ref('')
watchEffect(() => {
  if (editor.value !== null) {
    const json = editor.value.getJSON()
    const html = editor.value.getHTML()
    newJson.value = json
    htmlOutput.value = html
  }
})

// 圖片拖曳
const previewImage = ref(null)
const handleDragOver = (event) => {
  event.preventDefault()
}
const handleDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]

  const reader = new FileReader()
  reader.onload = () => {
    const base64Data = reader.result
    previewImage.value = base64Data
    // console.log(previewImage.value)
  }
  reader.readAsDataURL(file)
}
onUnmounted(() => {
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
  }
})
watch(previewImage, (newValue) => {
  if (newValue) {
    insertImage()
  }
})

const insertImage = () => {
  const imageSrc = previewImage.value
  if (imageSrc) {
    editor.value.commands.insertContent({
      type: 'image',
      attrs: {
        src: imageSrc
      }
    })
  }
}
const sentHtml = () => {
  const html = editor.value.getHTML()
  newHtml.value = html
}
</script>

<template>
  <div
    class="container grid grid-cols-1 pb-80 pt-[72px] sm:pb-96 md:pb-0"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <div class="col-span-12">
      <div class="flex flex-wrap">
        <div class="relative order-2 mx-0 md:order-1 xl:mx-[280px]">
          <div class="absolute right-0 cursor-pointer" @click="rulesShow(true)">
            <Icon name="material-symbols:info-outline" size="24" class="text-sand-300" />
          </div>
          <input
            v-model="articleTitle"
            type="text"
            class="mb-3 w-full bg-sand-100 pt-0 pt-8 text-4xl text-primary outline-none placeholder:text-sand-300"
            placeholder="請輸入標題"
          />
          <div class="mb-6">
            <div v-if="editor" class="flex min-h-[36px]">
              <label class="swap mr-3">
                <input type="checkbox" />
                <div class="swap-on" @click="swapOn">
                  <Icon
                    name="mdi:close-thick"
                    size="24"
                    class="rounded bg-[#E9E4D9] text-primary"
                  />
                </div>
                <div class="swap-off" @click="swapOff">
                  <Icon name="ic:round-plus" size="24" class="rounded bg-[#E9E4D9] text-primary" />
                </div>
              </label>
              <div
                v-if="textNavbarShow"
                class="flex gap-1 rounded border-[0.5px] border-secondary border-opacity-30 p-1 text-primary"
              >
                <button @click="addImage">
                  <Icon
                    name="material-symbols:add-photo-alternate-outline"
                    size="24"
                    class="hover:bg-[#E9E4D9]"
                  />
                </button>
                <button :class="{ 'is-active': editor.isActive('link') }" @click="setLink">
                  <Icon name="ic:twotone-insert-link" size="24" class="hover:bg-[#E9E4D9]" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                  @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                >
                  <Icon name="ic:baseline-title" size="24" class="hover:bg-[#E9E4D9]" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                  @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                >
                  <Icon name="ic:baseline-title" size="20" class="hover:bg-[#E9E4D9]" />
                </button>
                <button @click="editor.chain().focus().setHorizontalRule().run()">
                  <Icon name="material-symbols:align-center" size="24" class="hover:bg-[#E9E4D9]" />
                </button>
                <button @click="editor.chain().focus().setHardBreak().run()">
                  <Icon name="material-symbols:wrap-text" size="24" class="hover:bg-[#E9E4D9]" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().undo().run()"
                  @click="editor.chain().focus().undo().run()"
                >
                  <Icon
                    name="material-symbols:undo-rounded"
                    size="24"
                    class="cursor-pointer hover:bg-[#E9E4D9]"
                  />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().redo().run()"
                  @click="editor.chain().focus().redo().run()"
                >
                  <Icon
                    name="material-symbols:redo"
                    size="24"
                    class="cursor-pointer hover:bg-[#E9E4D9]"
                  />
                </button>
              </div>
              <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
                <button
                  :disabled="!editor.can().chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleBold().run()"
                >
                  <Icon name="ic:baseline-format-bold" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleItalic().run()"
                >
                  <Icon name="ic:sharp-format-italic" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('blockquote') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleBlockquote().run()"
                >
                  <Icon name="ic:outline-format-quote" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleStrike().run()"
                >
                  <Icon name="ic:round-strikethrough-s" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('underline') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleUnderline().run()"
                >
                  <Icon name="material-symbols:format-underlined" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleCode().run()"
                  :class="{ 'is-active': editor.isActive('code') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleCode().run()"
                >
                  <Icon name="ic:baseline-code" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('bulletList') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleBulletList().run()"
                >
                  <Icon name="ic:twotone-format-list-bulleted" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('orderedList') }"
                  class="ml-auto block"
                  @click="editor.chain().focus().toggleOrderedList().run()"
                >
                  <Icon name="ic:round-format-list-numbered" size="24" />
                </button>
              </bubble-menu>
            </div>
            <div>
              <editor-content ref="content" :editor="editor" class="p-2" />
            </div>
            <div v-dompurify-html="newHtml"></div>
          </div>
        </div>
        <div
          class="order-1 mb-0 flex w-full justify-end gap-0 md:order-2 md:mb-20 md:gap-3 xl:px-[280px]"
        >
          <button
            class="rounded px-3 py-1 text-sand-300 duration-100 hover:text-secondary md:text-secondary md:hover:bg-secondary md:hover:text-white"
            @click="sentHtml()"
          >
            儲存草稿
          </button>
          <button
            class="mr-4 rounded px-3 py-[7px] text-sand-300 duration-100 hover:text-secondary md:mr-0 md:text-secondary md:hover:bg-secondary md:hover:text-white"
            @click="postSent(true)"
          >
            發表貼文
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}
blockquote {
  padding-left: 1rem;
  border-left: 3px solid black;
  margin-bottom: 16px;
}

.ProseMirror {
  outline: none;
}

.custom-bullet-list {
  list-style-type: disc;
  margin: auto;
  padding: 12px;
}

.custom-ordered-list {
  list-style-type: numbered;
  margin: auto;
  padding: 12px;
}

.custom-link {
  text-decoration: underline;
  color: #1e40af;
  cursor: pointer;
}

h2 {
  font-size: 24px;
  color: #4e2a09;
  font-family: 'Noto Sans TC';
  margin-bottom: 10px;
}
h3 {
  font-size: 20px;
  color: #4e2a09;
  font-family: 'Noto Sans TC';
  margin-bottom: 10px;
}

.text-p {
  font-size: 16px;
  color: #3d1f03;
  font-family: 'Noto Sans TC';
  font-weight: 300;
  min-height: 24px;
}

.bubble-menu {
  display: flex;
  background-color: white;
  padding: 0.2rem;
  border-radius: 0.5rem;
}

.myButton {
  border: solid 1px black;
  font-size: 20px;
}
</style>
