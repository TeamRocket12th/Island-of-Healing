<script setup>
const showCategory = ref(false)
const toggleshowCategory = () => {
  showCategory.value = !showCategory.value
}

const isHeaderSticky = ref(false)
const scrollPosition = ref(0)

const handleScroll = () => {
  const header = document.querySelector('header')
  header.classList.toggle('sticky', window.scrollY > 0)
  isHeaderSticky.value = window.scrollY > 0
  scrollPosition.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const headerClasses = computed(() => {
  return {
    sticky: isHeaderSticky.value,
    'nav-aos': isHeaderSticky.value
  }
})
const iconClasses = computed(() => {
  return {
    sticky: isHeaderSticky.value,
    'icon-aos': isHeaderSticky.value
  }
})
</script>

<template>
  <header class="fixed top-0 z-50 w-full bg-[#CDCDCD] duration-300 ease-in" :class="headerClasses">
    <div class="container 3xl:pl-[300px] 3xl:pr-[300px]">
      <nav class="relative flex h-16 items-center justify-between duration-300 ease-in">
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/">
            <div class="text-[32px] duration-100 ease-in" :class="iconClasses">小島聊癒所</div>
            <!-- <p>Scroll position: {{ scrollPosition }}</p> -->
          </NuxtLink>
        </h1>
        <ul class="flex gap-6 text-xl font-medium">
          <li>
            <button @click="toggleshowCategory">
              精選文章 <Icon name="ic:round-arrow-drop-down" size="24" />
            </button>
            <ul
              v-if="showCategory"
              class="absolute top-full z-10 w-36 whitespace-nowrap border border-[#CDCDCD] bg-white font-normal"
            >
              <li>
                <RouterLink to="/" class="block w-full border-b border-[#CDCDCD] p-[10px]"
                  >個人成長</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/" class="block w-full border-b border-[#CDCDCD] p-[10px]"
                  >情緒覺察</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/" class="block w-full border-b border-[#CDCDCD] p-[10px]"
                  >親密關係</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/" class="block w-full p-[10px]">日常練習</RouterLink>
              </li>
            </ul>
          </li>
          <li><NuxtLink to="/">AI告解室</NuxtLink></li>
          <li><NuxtLink to="/">留言板</NuxtLink></li>
          <li><NuxtLink to="/">訂閱方案</NuxtLink></li>
          <li><NuxtLink to="/login">登入</NuxtLink></li>
          <li><NuxtLink to="/signup">註冊</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-aos {
  padding: 25px 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}
.icon-aos {
  font-size: 24px;
}
</style>
