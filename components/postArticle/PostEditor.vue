<script setup>
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import { Node } from '@tiptap/core'
import { useArticle } from '~/stores/article'
import '~/assets/css/article.css'

const userToken = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

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

const emits = defineEmits(['post-upload', 'post-rules'])
const postSent = (value) => {
  emits('post-upload', value)
  convertImagesToFormData()
  if (checkformData.value) {
    addArticleImgurl()
  }
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
const htmlOutput = ref('')
watchEffect(() => {
  if (editor.value !== null) {
    const json = editor.value.getJSON()
    const html = editor.value.getHTML()
    newJson.value = json
    htmlOutput.value = html
    articleUse.article.Content = html
  }
})

const selectedStatus = ref(false)
onMounted(() => {
  editor.value = new Editor({
    onSelectionUpdate({ editor }) {
      const isTextSelected = !editor.state.selection.empty
      selectedStatus.value = isTextSelected
    },
    extensions: [
      CustomParagraphNode,
      StarterKit.configure({
        heading: {
          levels: [2, 3],
          HTMLAttributes: {
            class: 'custom-heading'
          }
        },
        paragraph: {
          addKeyboardShortcuts: false,
          HTMLAttributes: {
            class: 'text-p'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'custom-bullet-list'
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'custom-ordered-list'
          }
        }
      }),
      Underline,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'custom-img'
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

// 拖曳圖片進入
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
  console.log(file)
}

watch(previewImage, (newValue) => {
  if (newValue) {
    console.log(newValue)
    blobUrl.value = newValue
    insertImage()
  }
})

// 偵測內容裡有圖片的
const imgTagArr = ref([])
const checkformData = ref(false)
watch(htmlOutput, (newValue) => {
  // console.log(articleUse.article.Content)
  const imgTags = newValue.match(/<img[^>]+>/g)
  // console.log(imgTags)
  imgTagArr.value = imgTags
})
// 輸出file 存到formdata
const formData = new FormData()
const convertImagesToFormData = () => {
  if (imgTagArr.value !== null) {
    imgTagArr.value.forEach((imgTag, index) => {
      const srcMatch = imgTag.match(/src=['"](.*?)['"]/)
      if (srcMatch) {
        // console.log(srcMatch)
        const src = srcMatch[1]
        const dataUrlPrefix = 'data:image'
        if (src.startsWith(dataUrlPrefix)) {
          const dataUrlParts = src.split(',')
          const mimeType = dataUrlParts[0].match(/:(.*?);/)[1]
          const base64Data = atob(dataUrlParts[1])
          const uintArray = new Uint8Array(base64Data.length)
          for (let i = 0; i < base64Data.length; i++) {
            uintArray[i] = base64Data.charCodeAt(i)
          }
          const blob = new Blob([uintArray], { type: mimeType })
          formData.append(`image_${index}`, blob, `image_${index}.png`)
          if (formData.get(`image_${index}`)) {
            checkformData.value = true
          }
        }
      }
    })
  }
}

// 新增文章圖片
const addArticleImgurl = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res = await $fetch(`${apiBase}/articlecontentimgurl/create`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'POST',
      body: formData
    })

    if (res.StatusCode === 200) {
      console.log(res)
      const imgTags = articleUse.article.Content.match(/<img[^>]+>/g)
      if (imgTags) {
        let base64Index = 0
        for (let i = 0; i < imgTags.length; i++) {
          const imgTag = imgTags[i]
          const srcMatch = imgTag.match(/src=['"](.*?)['"]/)
          // console.log(srcMatch)
          // console.log(imgTags)
          if (srcMatch) {
            const src = srcMatch[1]
            const dataUrlPrefix = 'data:image'
            if (src.startsWith(dataUrlPrefix)) {
              if (base64Index < res.ArticleContentImgData.length) {
                const updatedImgTag = imgTag.replace(src, res.ArticleContentImgData[base64Index])
                // console.log(updatedImgTag)
                articleUse.article.Content = articleUse.article.Content.replace(
                  imgTag,
                  updatedImgTag
                )
                base64Index++
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

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
</script>

<template>
  <div class="grid grid-cols-12" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
    <div class="relative col-span-12">
      <div class="flex flex-wrap">
        <div class="mx-0 w-full lg:mx-48 xl:mx-[280px]">
          <div>
            <div class="flex justify-end sm:mt-4 sm:gap-4">
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
            <textarea
              v-model="articleUse.article.Title"
              class="font-weight mb-3 h-28 w-full resize-none bg-sand-100 pt-4 text-4xl font-bold text-primary outline-none placeholder:text-sand-300"
              placeholder="請輸入標題"
            ></textarea>
          </div>
          <div class="mb-6">
            <div v-if="editor" class="mb-6 hidden min-h-[36px] sm:flex">
              <label class="swap mr-3">
                <input type="checkbox" />
                <div class="swap-on" @click="swapOn">
                  <Icon
                    name="material-symbols:close"
                    size="24"
                    class="rounded bg-[#E9E4D9] text-secondary"
                  />
                </div>
                <div class="swap-off" @click="swapOff">
                  <Icon
                    name="material-symbols:add"
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
                  <Icon name="material-symbols:link" size="24" class="rounded hover:bg-[#E9E4D9]" />
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
                    name="lucide:reply"
                    size="24"
                    class="cursor-pointer rounded hover:bg-[#E9E4D9]"
                  />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().redo().run()"
                  @click="editor.chain().focus().redo().run()"
                >
                  <Icon
                    name="lucide:forward"
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
                  <Icon name="material-symbols:format-bold" size="24" />
                </button>
                <button
                  :disabled="!editor.can().chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
                  class="block rounded hover:bg-secondary hover:text-white"
                  @click="editor.chain().focus().toggleItalic().run()"
                >
                  <Icon name="material-symbols:format-italic" size="24" />
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
          <Icon name="material-symbols:format-quote-outline" size="24" />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="block h-8 w-8 rounded hover:bg-secondary hover:text-white"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <Icon name="material-symbols:format-list-bulleted" size="24" />
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
