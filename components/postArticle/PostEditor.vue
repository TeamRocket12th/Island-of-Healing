<script setup>
import { StarterKit } from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Image } from '@tiptap/extension-image'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Link } from '@tiptap/extension-link'
import { Underline } from '@tiptap/extension-underline'
import { HardBreak } from '@tiptap/extension-hard-break'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import { Node } from '@tiptap/core'
import { useArticle } from '~/stores/article'

const editor = ref(null)
const articleUse = useArticle()

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

const props = defineProps({
  htmlContent: {
    type: String,
    default: ''
  },
  articleData: {
    type: Object,
    default: () => {}
  }
})

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
      Underline,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'text-p'
        }
      }),
      Text,

      Image.configure({
        allowBase64: true
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'custom-heading'
        }
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
      }),
      Placeholder.configure({
        placeholder: '開始寫作吧...'
      })
    ]
  })
  editor.value.commands.setContent(`${props.htmlContent}`)
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

// onBeforeUpdate(() => {
//   console.log(`${props.htmlContent}`)
//   editor.value.commands.setContent(`${props.htmlContent}`)
// })
</script>

<template>
  <div
    class="grid grid-cols-1 pt-0 sm:pb-96 sm:pt-[72px] md:pb-0"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <div class="relative col-span-12">
      <div class="flex flex-wrap">
        <div class="mx-0 w-full lg:mx-48 xl:mx-[280px]">
          <div>
            <div class="flex justify-end sm:gap-4">
              <div class="flex cursor-pointer items-center" @click="rulesShow(true)">
                <Icon
                  name="material-symbols:info-outline"
                  size="24"
                  class="mx-auto cursor-pointer text-sand-300"
                  @click="rulesShow(true)"
                />
              </div>
              <div class="flex justify-end">
                <button
                  class="rounded px-3 py-[7px] text-sand-300 duration-100 hover:text-secondary sm:text-secondary sm:hover:bg-secondary sm:hover:text-white"
                  @click="postSent(true)"
                >
                  發表貼文
                </button>
              </div>
            </div>
            <input
              v-model="articleUse.article.Title"
              type="text"
              class="font-weight mb-3 h-20 w-full bg-sand-100 pt-8 text-4xl font-bold text-primary outline-none placeholder:text-sand-300"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-6">
            <div v-if="editor" class="mb-6 hidden min-h-[36px] sm:flex">
              <label class="swap mr-3">
                <input type="checkbox" />
                <div class="swap-on" @click="swapOn">
                  <Icon
                    name="mdi:close-thick"
                    size="24"
                    class="rounded bg-[#E9E4D9] text-secondary"
                  />
                </div>
                <div class="swap-off" @click="swapOff">
                  <Icon
                    name="ic:round-plus"
                    size="24"
                    class="rounded bg-[#E9E4D9] text-secondary"
                  />
                </div>
              </label>
              <div
                v-if="textNavbarShow"
                class="flex gap-1 rounded border-[0.5px] border-secondary border-opacity-30 p-1 text-secondary"
              >
                <button @click="addImage">
                  <Icon
                    name="material-symbols:imagesmode-outline"
                    size="24"
                    class="rounded hover:bg-[#E9E4D9]"
                  />
                </button>
                <button :class="{ 'is-active': editor.isActive('link') }" @click="setLink">
                  <Icon
                    name="ic:twotone-insert-link"
                    size="24"
                    class="rounded hover:bg-[#E9E4D9]"
                  />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                  @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                >
                  <Icon name="ic:baseline-title" size="24" class="rounded hover:bg-[#E9E4D9]" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                  @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                >
                  <Icon name="ic:baseline-title" size="20" class="rounded hover:bg-[#E9E4D9]" />
                </button>
                <button @click="editor.chain().focus().setHorizontalRule().run()">
                  <Icon
                    name="material-symbols:align-center"
                    size="24"
                    class="rounded hover:bg-[#E9E4D9]"
                  />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().undo().run()"
                  @click="editor.chain().focus().undo().run()"
                >
                  <Icon
                    name="material-symbols:reply"
                    size="24"
                    class="cursor-pointer rounded hover:bg-[#E9E4D9]"
                  />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().redo().run()"
                  @click="editor.chain().focus().redo().run()"
                >
                  <Icon
                    name="material-symbols:forward-rounded"
                    size="24"
                    class="cursor-pointer rounded hover:bg-[#E9E4D9]"
                  />
                </button>
              </div>
              <bubble-menu
                class="hidden gap-1 rounded border-[0.5px] border-secondary bg-white text-secondary sm:flex md:flex"
                :tippy-options="{ duration: 100 }"
                :editor="editor"
              >
                <button
                  :disabled="!editor.can().chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleBold().run()"
                >
                  <Icon name="ic:baseline-format-bold" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleItalic().run()"
                >
                  <Icon name="ic:sharp-format-italic" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('blockquote') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleBlockquote().run()"
                >
                  <Icon name="material-symbols:format-quote-outline" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleStrike().run()"
                >
                  <Icon name="material-symbols:strikethrough-s" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('underline') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleUnderline().run()"
                >
                  <Icon name="material-symbols:format-underlined" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleCode().run()"
                  :class="{ 'is-active': editor.isActive('code') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleCode().run()"
                >
                  <Icon name="material-symbols:code" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('bulletList') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleBulletList().run()"
                >
                  <Icon name="material-symbols:format-list-bulleted" size="24" />
                </button>
                <button
                  :class="{ 'is-active': editor.isActive('orderedList') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleOrderedList().run()"
                >
                  <Icon name="material-symbols:format-list-numbered" size="24" />
                </button>
              </bubble-menu>
            </div>
            <div class="max-h-[400px] overflow-y-auto sm:max-h-none">
              <editor-content ref="content" :editor="editor" />
            </div>
            <!-- <div v-dompurify-html="newHtml"></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div
        v-if="editor && selectedStatus"
        class="absolute bottom-0 -mx-6 flex w-full flex-wrap justify-around bg-[#E9E4D9] py-3 text-secondary sm:hidden"
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
        class="absolute bottom-0 -mx-6 flex w-full justify-start gap-2 bg-[#E9E4D9] px-4 py-3 text-secondary sm:hidden"
      >
        <button
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          class="block h-8 w-8 rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <Icon name="material-symbols:text-fields" size="24" />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('blockquote') }"
          class="block h-8 w-8 rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <Icon name="ic:outline-format-quote" size="24" />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="block h-8 w-8 rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <Icon name="ic:twotone-format-list-bulleted" size="24" />
        </button>
        <button
          class="block h-8 w-8 rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <Icon name="material-symbols:align-center" size="24" />
        </button>
        <button class="block h-8 w-8 rounded hover:bg-secondary hover:text-white" @click="addImage">
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
  padding-left: 10px;
  border-left: 3px solid #3d1f03;
  margin-bottom: 16px;
}

.ProseMirror {
  outline: none;
  overflow-y: scroll;
  padding: 8px;
}

.custom-bullet-list {
  list-style-type: disc;
  margin: auto;
  padding: 12px;
}
.custom-bullet-list li {
  margin-bottom: 40px;
}

.custom-ordered-list {
  list-style-type: numbered;
  margin: auto;
  padding: 12px;
}

.custom-ordered-list li {
  margin-bottom: 40px;
}

.custom-link {
  text-decoration: underline;
  color: #1e40af;
  cursor: pointer;
}

h2.custom-heading {
  font-size: 24px;
  color: #4e2a09;
  font-family: 'Noto Sans TC';
  font-weight: 700;
  margin-bottom: 16px;
}
h3.custom-heading {
  font-size: 20px;
  color: #4e2a09;
  font-family: 'Noto Sans TC';
  font-weight: 500;
  margin-bottom: 16px;
}

.text-p {
  font-size: 16px;
  color: #3d1f03;
  font-family: 'Noto Sans TC';
  font-weight: 300;
  min-height: 24px;
  letter-spacing: 2px;
  line-height: 150%;
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

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #c1b6a4;
  pointer-events: none;
  height: 0;
}

.text-p.is-empty.is-editor-empty {
  font-size: 20px;
}

hr {
  border-top-width: 0.5px;
  border-color: #4e2a09;
  margin-bottom: 20px;
  margin-top: 5px;
}
</style>
