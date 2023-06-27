<script setup>
import { StarterKit } from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Link } from '@tiptap/extension-link'
import { Highlight } from '@tiptap/extension-highlight'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'

const articleTitle = ref('')

const emits = defineEmits(['post-upload', 'article-title'])
const postSent = (value) => {
  emits('post-upload', value)
  const title = articleTitle.value
  emits('article-title', title)
}
const editor = ref(null)
onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Underline,
      Image,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph']
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
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
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
const newHtml = ref('')
const sentBtn = () => {
  const html = editor.value.getHTML()
  // const json = editor.value.getJSON()
  console.log(html)
  // console.log(json)
  newHtml.value = html
}

const newJson = ref('')
const htmlOutput = ref('')
watchEffect(() => {
  if (editor.value !== null) {
    const json = editor.value.getJSON()
    const html = editor.value.getHTML()
    newJson.value = json
    // console.log(newJson.value)
    htmlOutput.value = html
    console.log(htmlOutput.value)
    const content = newJson.value.content
    // console.log(content)
  }
})
</script>

<template>
  <div class="container grid grid-cols-12 pt-[100px]">
    <div class="col-span-8 col-start-3">
      <input
        v-model="articleTitle"
        type="text"
        class="mb-10 w-full bg-sand-100 text-4xl text-primary outline-none placeholder:text-sand-300"
        placeholder="請輸入標題"
      />
      <div class="mb-6">
        <div v-if="editor" class="flex">
          <label class="swap">
            <input type="checkbox" />
            <div class="swap-on" @click="swapOn">
              <Icon name="mdi:close-thick" size="24" />
            </div>
            <div class="swap-off" @click="swapOff">
              <Icon name="ic:round-plus" size="24" />
            </div>
          </label>
          <div v-if="textNavbarShow" class="border">
            <button @click="addImage">
              <Icon name="material-symbols:add-photo-alternate-outline" size="24" />
            </button>
            <button :class="{ 'is-active': editor.isActive('link') }" @click="setLink">
              <Icon name="ic:twotone-insert-link" size="24" />
            </button>
            <button
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            >
              <Icon name="ic:baseline-title" size="24" />
            </button>
            <button
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            >
              <Icon name="ic:baseline-title" size="20" />
            </button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">
              <Icon name="ic:round-horizontal-rule" size="24" />
            </button>
            <button @click="editor.chain().focus().setHardBreak().run()">
              <Icon name="material-symbols:wrap-text" size="24" />
            </button>
            <button
              :disabled="!editor.can().chain().focus().undo().run()"
              @click="editor.chain().focus().undo().run()"
            >
              <Icon name="material-symbols:undo-rounded" size="24" />
            </button>
            <button
              :disabled="!editor.can().chain().focus().redo().run()"
              @click="editor.chain().focus().redo().run()"
            >
              <Icon name="material-symbols:redo" size="24" />
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
          <editor-content
            id="container"
            ref="content"
            :editor="editor"
            class="relative h-[600px] p-2"
          />
        </div>
      </div>
    </div>
    <div class="col-span-8 col-start-3 mb-80 flex justify-end gap-3">
      <button class="bg-[#828282] px-3 py-[7px] text-white" @click="sentBtn">儲存草稿</button>
      <button class="bg-[#828282] px-3 py-[7px] text-white" @click="postSent(true)">
        發表貼文
      </button>
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
  color: blue;
  cursor: pointer;
}

h2 {
  font-size: 36px;
}
h3 {
  font-size: 24px;
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
