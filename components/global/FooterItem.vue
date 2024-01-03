<script setup lang="ts">
const show = ref(false)
const toggleCategory = () => {
  show.value = !show.value
}

const lists = ref([
  { list: '個人成長', id: 1, url: '/article?category=personal-growth' },
  { list: '情緒察覺', id: 2, url: '/article?category=emotional-awareness' },
  { list: '親密關係', id: 3, url: '/article?category=intimate-relationships' },
  { list: '日常練習', id: 4, url: '/article?category=daily-practice' },
  { list: '所有文章', id: 5, url: '/article?category=all' }
])
</script>

<template>
  <footer class="bg-secondary">
    <div
      class="container h-auto px-7 pb-8 pt-10 sm:grid sm:h-[308px] sm:grid-cols-2 sm:py-[92px] xl:grid-cols-12"
    >
      <div class="py-10 sm:py-7 sm:pr-12 xl:col-span-5">
        <h2 class="mb-4 font-serif-tc text-4xl font-semibold tracking-[1.08px] text-sand-100">
          小島聊癒所
        </h2>
        <p class="font-light leading-normal text-sand-100">
          「小島聊癒所」陪伴人們認識自己的情緒，傾聽內在的聲音，<br class="hidden md:block" />
          希望透過閱讀我們的文章，在遇到困境時找到一點方向與慰藉。
        </p>
      </div>
      <div class="sm:py-7 sm:pl-7 xl:col-span-4 xl:col-start-9">
        <ul class="mb-6 flex flex-col justify-end sm:flex-row sm:gap-6">
          <li
            class="font-serif-tc text-base font-medium leading-normal sm:hidden sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <div
              class="flex cursor-pointer items-center justify-between border-b border-[#A09385] p-5"
              @click="toggleCategory()"
            >
              <p class="text-sand-100">精選文章</p>
              <Icon
                :name="show ? 'ic:baseline-minus' : 'ic:baseline-plus'"
                size="25"
                class="text-white ease-in"
              />
            </div>

            <div v-for="item in lists" :key="item.id">
              <NuxtLink
                :to="item.url"
                class="show flex items-center border-b border-[#A09385] px-5 text-sand-100"
                :class="show ? '  py-5 opacity-100' : 'h-0 opacity-0'"
              >
                {{ item.list }}
              </NuxtLink>
            </div>
          </li>
          <li
            class="hidden border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:block sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/article?category=all"
              ><div class="flex items-center justify-between">
                <p class="text-sand-100">精選文章</p>
              </div></NuxtLink
            >
          </li>
          <li
            class="border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/chatroom"><p class="text-sand-100">AI 相談室</p></NuxtLink>
          </li>
          <li
            class="border-b border-[#A09385] p-5 font-serif-tc text-base font-medium leading-normal sm:border-b-0 sm:p-0 sm:text-sm"
          >
            <NuxtLink to="/plans"><p class="text-sand-100">訂閱方案</p></NuxtLink>
          </li>
        </ul>
        <div class="items-center justify-end gap-4 px-5 sm:flex sm:px-0">
          <div class="hidden h-[0.5px] w-[139px] bg-sand-100 sm:block"></div>
          <p class="mb-5 font-serif-tc text-sm font-semibold text-sand-100 sm:mb-0">Follow</p>
          <div class="flex items-center gap-3">
            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-secondary"
            >
              <NuxtLink to="/">
                <NuxtImg
                  width="16"
                  height="16"
                  src="/socialmediaicons/Facebook.svg"
                  alt="ourfacebook"
                />
              </NuxtLink>
            </span>
            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-secondary"
            >
              <NuxtLink to="/">
                <NuxtImg
                  width="16"
                  height="16"
                  src="/socialmediaicons/Youtube.svg"
                  alt="ouryoutube"
              /></NuxtLink>
            </span>
            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-secondary"
            >
              <NuxtLink to="/"
                ><NuxtImg
                  width="16"
                  height="16"
                  src="/socialmediaicons/Instagram.svg"
                  alt="ourinstagram"
              /></NuxtLink>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-3 text-center">
      <span class="block text-sand-100 sm:py-0">Copyright © 2023 小島工作室</span>
    </div>
  </footer>
</template>

<style scoped>
.show {
  transition: all 0.5s;
}
.show:last-child {
  margin-bottom: 0px;
}
</style>
