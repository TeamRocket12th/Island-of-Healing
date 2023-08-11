<script setup lang="ts">
const props = defineProps({
  searchPlaceHolder: {
    type: String,
    default: '搜尋'
  },
  searchFn: {
    type: Function,
    required: true
  }
})
const keyWord = ref('')
const isInputVisible = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const onClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    hideInput()
  }
}

const inputRef = ref<HTMLInputElement | null>(null)

const showInput = () => {
  isInputVisible.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
  document.addEventListener('click', onClickOutside)
}

const hideInput = () => {
  isInputVisible.value = false
  document.removeEventListener('click', onClickOutside)
}

const handleSearch = (keyword: string) => {
  if (!keyword) {
    return
  }
  props.searchFn(keyword)
  keyWord.value = ''
  hideInput()
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (isInputVisible.value) {
    document.addEventListener('click', onClickOutside)
  }
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  document.removeEventListener('click', onClickOutside)
})
</script>
<template>
  <div ref="containerRef" class="relative">
    <input
      ref="inputRef"
      v-model="keyWord"
      type="text"
      class="transition-width block h-10 rounded border-none border-primary bg-transparent pl-[38px] text-primary placeholder-sand-300 focus:outline-none"
      :class="isInputVisible ? 'input-expanded' : 'input-collapsed pointer-events-none'"
      :placeholder="searchPlaceHolder"
      @keypress.enter="handleSearch(keyWord)"
    />
    <span class="absolute left-2 top-1/2 z-10 block translate-y-[-50%] cursor-pointer text-primary">
      <Icon name="mdi:magnify" size="24" @click="showInput" />
    </span>
  </div>
</template>
<style scoped>
.transition-width {
  transition: width 0.2s ease-in-out;
  overflow: hidden;
}

.input-expanded {
  width: 200px;
}

.input-collapsed {
  width: 0;
}
</style>
