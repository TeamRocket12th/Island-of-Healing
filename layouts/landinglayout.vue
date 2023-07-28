<script setup lang="ts">
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
}
</script>
<template>
  <div>
    <nav class="bg-sand-100">
      <div class="container flex h-14 items-center justify-between border-b-[0.5px] border-primary">
        <div class="flex gap-9">
          <NuxtLink to="/" class="font-serif-tc text-2xl font-bold text-primary"
            >小島聊癒所</NuxtLink
          >
          <div class="hidden items-center gap-6 sm:flex">
            <NuxtLink to="/" class="rounded bg-sand-100 px-2 py-1 text-primary">文章首頁</NuxtLink>
            <NuxtLink to="/plans" class="rounded bg-sand-100 px-2 py-1 text-primary"
              >訂閱服務</NuxtLink
            >
          </div>
        </div>
        <div class="relative py-4 sm:py-0">
          <span
            class="absolute right-0 top-1/4 z-10 cursor-pointer sm:hidden"
            @click="toggleMobileMenu"
            ><Icon name="ic:outline-menu" size="32"
          /></span>
        </div>
        <div class="hidden items-center gap-6 sm:flex">
          <NuxtLink
            to="/become_creater/steps"
            class="rounded bg-secondary px-2 py-1 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            >開始使用</NuxtLink
          >
        </div>
      </div>
    </nav>

    <!--手機版導覽列-->
    <div
      v-if="showMobileMenu"
      class="absolute top-[56px] z-10 h-screen min-h-screen w-screen overflow-auto bg-sand-100 px-4 opacity-90 sm:hidden"
    >
      <span class="block text-right" @click="toggleMobileMenu"
        ><Icon name="ic:outline-close" size="32" class="my-6 cursor-pointer text-primary" />
      </span>
      <ul>
        <li class="border-b border-primary">
          <NuxtLink to="/login" class="block py-5 font-serif-tc font-semibold text-primary"
            >開始使用</NuxtLink
          >
        </li>
        <li class="border-b border-primary">
          <NuxtLink to="/" class="block py-5 font-serif-tc font-semibold text-primary"
            >文章首頁</NuxtLink
          >
        </li>
        <li class="border-b border-primary">
          <NuxtLink to="/plans" class="block py-5 font-serif-tc font-semibold text-primary"
            >訂閱服務</NuxtLink
          >
        </li>
      </ul>
    </div>
    <main>
      <slot />
    </main>
    <FooterItem />
  </div>
</template>
<style scoped></style>
