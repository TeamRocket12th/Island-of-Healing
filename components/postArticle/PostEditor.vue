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
import { postArticle } from '~/stores/article'

const editor = ref(null)
const articleUse = postArticle()

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

const emits = defineEmits(['post-upload', 'article-content', 'post-rules'])
const postSent = (value) => {
  emits('post-upload', value)
  const html = editor.value.getHTML()
  emits('article-content', html)
}
const rulesShow = (value) => {
  emits('post-rules', value)
}

// 輸出

const newJson = ref('')
// const newHtml = ref('')
const htmlOutput = ref('')
watchEffect(() => {
  if (editor.value !== null) {
    const json = editor.value.getJSON()
    const html = editor.value.getHTML()
    newJson.value = json
    htmlOutput.value = html
    // console.log(html)
  }
})

const selectedStatus = ref(false)
onMounted(() => {
  editor.value = new Editor({
    onSelectionUpdate({ editor }) {
      // console.log(editor)
      // console.log(editor.state.selection)
      // const { from, to } = editor.state.selection
      // const selectedText = editor.state.doc.textBetween(from, to)
      // console.log(selectedText)
      const isTextSelected = !editor.state.selection.empty
      selectedStatus.value = isTextSelected
    },
    extensions: [
      CustomParagraphNode,
      HardBreak,
      Paragraph.configure({
        addKeyboardShortcuts: false
      }),
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
     <h2>開始寫作吧...</h2>
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

const previewImage = ref(null)
const blobUrl = ref(null)
const handleDragOver = (event) => {
  event.preventDefault()
}
const handleDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]

  const reader = new FileReader()
  reader.onload = () => {
    previewImage.value = reader.result
    const base64Data = previewImage.value
    const byteCharacters = atob(base64Data.split(',')[1])
    const byteArrays = []
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i))
    }
    const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)
    console.log(url)
    blobUrl.value = url
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
  const imageSrc = blobUrl.value
  if (imageSrc) {
    editor.value.commands.insertContent({
      type: 'image',
      attrs: {
        src: imageSrc
      }
    })
  }
}
// const sentHtml = () => {
//   const html = editor.value.getHTML()
//   newHtml.value = html
// }
</script>

<template>
  <div
    class="container grid grid-cols-1 pt-0 sm:pb-96 sm:pt-[72px] md:pb-0"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <div class="relative col-span-12">
      <div class="flex flex-wrap">
        <div class="order-2 mx-0 w-full sm:order-1 lg:mx-48 xl:mx-[280px]">
          <div class="relative sm:flex sm:justify-end">
            <input
              v-model="articleUse.articleDetails.Title"
              type="text"
              class="mb-3 w-full bg-sand-100 pt-8 text-4xl text-primary outline-none placeholder:text-sand-300"
              placeholder="請輸入標題"
            />
            <div class="cursor-pointer" @click="rulesShow(true)">
              <Icon
                name="material-symbols:info-outline"
                size="24"
                class="absolute -top-[30px] right-5 mr-5 text-sand-300 sm:static"
              />
            </div>
          </div>
          <div class="mb-6">
            <div v-if="editor" class="tableTextNavbar mb-6 hidden min-h-[36px] sm:flex">
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
              <bubble-menu
                class="hidden gap-1 rounded border-[0.5px] border-secondary text-secondary sm:flex md:flex"
                :tippy-options="{ duration: 100 }"
                :editor="editor"
              >
                <button
                  :disabled="!editor.can().chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleBold().run()"
                >
                  <Icon name="ic:baseline-format-bold" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleItalic().run()"
                >
                  <Icon name="ic:sharp-format-italic" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('blockquote') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleBlockquote().run()"
                >
                  <Icon name="ic:outline-format-quote" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleStrike().run()"
                >
                  <Icon name="ic:round-strikethrough-s" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('underline') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleUnderline().run()"
                >
                  <Icon name="material-symbols:format-underlined" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleCode().run()"
                  :class="{ 'is-active': editor.isActive('code') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleCode().run()"
                >
                  <Icon name="ic:baseline-code" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('bulletList') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleBulletList().run()"
                >
                  <Icon name="ic:twotone-format-list-bulleted" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('orderedList') }"
                  class="ml-auto block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleOrderedList().run()"
                >
                  <Icon name="ic:round-format-list-numbered" size="24" />
                </button>
              </bubble-menu>
            </div>
            <div>
              <editor-content ref="content" :editor="editor" />
            </div>
            <!-- <div v-dompurify-html="newHtml"></div> -->
          </div>
        </div>
        <div
          class="order-1 mb-0 flex w-full justify-end gap-0 sm:order-2 sm:mb-20 sm:gap-3 lg:mx-48 xl:mx-[280px]"
        >
          <button
            class="mr-16 rounded px-3 py-[7px] text-sand-300 duration-100 hover:text-secondary sm:mr-0 sm:text-secondary sm:hover:bg-secondary sm:hover:text-white"
            @click="postSent(true)"
          >
            發表貼文
          </button>
        </div>
      </div>
    </div>
    <div class="block">
      <div
        v-if="editor && selectedStatus"
        class="-mx-6 flex flex-wrap justify-around bg-[#E9E4D9] py-3 text-secondary sm:hidden"
      >
        <button
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bold-active': editor.isActive('bold') }"
          class="h-8 font-bold"
          @click="editor.chain().focus().toggleBold().run()"
        >
          Bold
        </button>
        <button
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'italic-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          Italic
        </button>
        <button :class="{ 'link-active': editor.isActive('link') }" @click="setLink">
          <span class="underline">Link</span>
        </button>
      </div>
      <div
        v-if="editor && !selectedStatus"
        class="-mx-6 flex justify-start gap-4 bg-[#E9E4D9] px-3 py-3 text-secondary sm:hidden"
      >
        <button
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          class="block h-8 rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <Icon name="material-symbols:text-fields" size="24" />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('blockquote') }"
          class="block rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <Icon name="ic:outline-format-quote" size="24" />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="block rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <Icon name="ic:twotone-format-list-bulleted" size="24" />
        </button>
        <button
          class="block rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <Icon name="material-symbols:align-center" size="24" />
        </button>
        <button class="block rounded hover:bg-secondary hover:text-white" @click="addImage">
          <Icon name="material-symbols:add-photo-alternate-outline" size="24" />
        </button>
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
}
h3 {
  font-size: 20px;
  color: #4e2a09;
  font-family: 'Noto Sans TC';
}

.text-p {
  font-size: 16px;
  color: #3d1f03;
  font-family: 'Noto Sans TC';
  font-weight: 300;
  min-height: 24px;
}

.myButton {
  border: solid 1px black;
  font-size: 20px;
}

.bold-active,
.italic-active,
.link-active {
  color: white;
  background-color: #796959;
  border-radius: 10%;
  width: 50px;
}
</style>
