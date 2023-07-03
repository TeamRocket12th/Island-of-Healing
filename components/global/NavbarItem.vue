<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useUIStore } from '~/stores/ui'

const userStore = useUserStore()
const uiStore = useUIStore()
const { isLogin, userData } = storeToRefs(userStore)
const { userLogout } = userStore
const { isWriterExpanded } = storeToRefs(uiStore)

const showCategory = ref(false)

const showMobileMenu = ref(false)
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
  if (showMobileCategory.value) {
    showMobileCategory.value = !showMobileCategory.value
  }
}

const showMobileCategory = ref(false)
const toggleMobileCategory = () => {
  showMobileCategory.value = !showMobileCategory.value
}

const route = useRoute()

const isUserPage = computed(() => {
  if (route.meta.layout === 'userlayout') {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <header>
    <nav class="bg-secondary">
      <div class="container flex h-14 items-center justify-between">
        <p class="font-serif-tc font-medium text-sand-100">提供心靈療癒的庇護所</p>
        <ul class="hidden items-center gap-6 sm:flex">
          <li v-if="!isLogin">
            <NuxtLink to="/login" class="font-serif-tc font-bold text-sand-100">登入</NuxtLink>
          </li>
          <li v-if="!isLogin">
            <NuxtLink
              to="/signup"
              class="rounded bg-sand-100 px-2 py-1 font-serif-tc font-bold text-primary"
              >註冊</NuxtLink
            >
          </li>
          <li v-if="isLogin">
            <div class="dropdown-end dropdown">
              <label tabindex="0" class="btn-ghost btn-circle avatar btn flex w-20 items-center">
                <div class="h-9 w-9 overflow-hidden rounded-full">
                  <img :src="userData.avatar" />
                </div>
                <span class="block">
                  <Icon name="ic:outline-arrow-drop-down" size="24" class="text-sand-100"
                /></span>
              </label>

              <ul
                tabindex="0"
                class="dropdown-content relative top-[108%] z-10 w-48 border-[0.5px] border-primary bg-sand-100 font-serif-tc text-base shadow"
              >
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink
                    :to="`/account/${userData.id}/profile`"
                    class="block p-[10px] font-medium"
                  >
                    <Icon
                      name="material-symbols:manage-accounts-outline-rounded"
                      size="24"
                      class="mr-2"
                    />
                    <span>會員設定</span>
                  </NuxtLink>
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink
                    :to="`/account/${userData.id}/collection`"
                    class="block p-[10px] font-medium"
                  >
                    <Icon name="material-symbols:bookmark-outline" size="24" class="mr-2" />
                    <span>我的收藏</span>
                  </NuxtLink>
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink
                    :to="`/account/${userData.id}/following`"
                    class="block p-[10px] font-medium"
                  >
                    <Icon name="ic:round-rss-feed" size="24" class="mr-2" />
                    <span>我的追蹤</span></NuxtLink
                  >
                </li>
                <li class="text-primary hover:bg-secondary hover:text-sand-100">
                  <NuxtLink
                    :to="`/account/${userData.id}/messages`"
                    class="block p-[10px] font-medium"
                  >
                    <Icon name="ic:baseline-mail-outline" size="24" class="mr-2" />
                    <span>我的訊息</span>
                  </NuxtLink>
                </li>
                <li
                  v-if="userData.role === 'writer'"
                  class="text-primary hover:bg-secondary hover:text-sand-100"
                >
                  <NuxtLink
                    :to="`/account/${userData.id}/mywork`"
                    class="block p-[10px] font-medium"
                    @click="isWriterExpanded = true"
                  >
                    <Icon name="material-symbols:clarify-outline" size="24" class="mr-2" />
                    <span>我的文章</span>
                  </NuxtLink>
                </li>
                <li class="text-primary">
                  <NuxtLink
                    :to="`/account/${userData.id}/pastorders`"
                    class="block p-[10px] font-medium hover:bg-secondary hover:text-sand-100"
                  >
                    <Icon name="ic:outline-receipt" size="24" class="mr-2" />
                    <span>歷史訂單</span>
                  </NuxtLink>
                </li>
                <li class="p-[10px] text-primary hover:bg-secondary hover:text-sand-100">
                  <button class="flex w-full items-center" @click="userLogout">
                    <Icon name="ic:outline-logout" size="24" class="mr-2" />
                    <span class="font-medium">登出</span>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div
      class="relative h-20 border-b border-primary bg-sand-100 sm:h-[142px] sm:border-none sm:pt-5"
    >
      <div class="container">
        <div class="relative py-4 sm:py-0">
          <h1 class="mb-3 text-left sm:text-center">
            <NuxtLink
              to="/"
              class="font-serif-tc text-3xl-plus font-bold text-primary sm:text-4xl-plus"
              >小島聊癒所</NuxtLink
            >
          </h1>
          <span
            class="absolute right-0 top-1/4 z-10 cursor-pointer sm:hidden"
            @click="toggleMobileMenu"
            ><Icon name="ic:outline-menu" size="32"
          /></span>
        </div>
        <ul
          class="hidden items-center justify-center gap-4 font-serif-tc sm:flex"
          :class="isUserPage ? 'border-none' : 'border-primary sm:border-b'"
        >
          <li v-if="userData.role === 'writer'" class="pb-5">
            <NuxtLink to="/newstory" class="text-xl font-semibold leading-normal text-primary"
              >發表文章</NuxtLink
            >
          </li>
          <span
            v-if="userData.role === 'writer'"
            class="flex items-center pb-5 font-serif-tc text-xl font-semibold"
            >·</span
          >
          <li
            class="relative pb-5 text-xl font-semibold leading-normal text-primary"
            @mouseover="showCategory = true"
            @mouseleave="showCategory = false"
          >
            <button>精選文章</button>
            <ul
              v-show="showCategory"
              class="absolute -left-20 top-full z-20 w-[164px] whitespace-nowrap border border-primary bg-white font-normal"
              @mouseover="showCategory = true"
              @mouseleave="showCategory = false"
            >
              <li>
                <RouterLink
                  :to="{ name: 'article', query: { category: 'personal-growth' } }"
                  class="block w-full border-b border-[#CDCDCD] bg-sand-100 p-[10px] hover:bg-secondary hover:text-sand-100"
                  >個人成長</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'article', query: { category: 'emotional-awareness' } }"
                  class="block w-full border-b border-[#CDCDCD] bg-sand-100 p-[10px] hover:bg-secondary hover:text-sand-100"
                  >情緒察覺</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'article', query: { category: 'intimate-relationships' } }"
                  class="block w-full border-b border-[#CDCDCD] bg-sand-100 p-[10px] hover:bg-secondary hover:text-sand-100"
                  >親密關係</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'article', query: { category: 'daily-practice' } }"
                  class="block w-full border-b border-[#CDCDCD] bg-sand-100 p-[10px] hover:bg-secondary hover:text-sand-100"
                  >日常練習</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'article', query: { category: 'all' } }"
                  class="block w-full bg-sand-100 p-[10px] hover:bg-secondary hover:text-sand-100"
                  >所有文章</RouterLink
                >
              </li>
            </ul>
          </li>
          <span class="flex items-center pb-5 font-serif-tc text-xl font-semibold">·</span>
          <li class="pb-5">
            <NuxtLink to="/chatroom" class="text-xl font-semibold leading-normal text-primary"
              >AI告解室</NuxtLink
            >
          </li>
          <span class="flex items-center pb-5 font-serif-tc text-xl font-semibold">·</span>
          <li class="pb-5">
            <NuxtLink to="/" class="text-xl font-semibold text-primary" leading-normal
              >論壇</NuxtLink
            >
          </li>
          <span class="flex items-center pb-5 font-serif-tc text-xl font-semibold">·</span>
          <li class="pb-5">
            <NuxtLink to="/plans" class="text-xl font-semibold leading-normal text-primary"
              >訂閱方案</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
    <!--手機版導覽列-->
    <div
      v-if="showMobileMenu"
      class="absolute top-[56px] z-10 h-screen min-h-screen w-screen overflow-auto bg-sand-100 px-4 opacity-90 sm:hidden"
    >
      <span class="block text-right" @click="toggleMobileMenu"
        ><Icon name="ic:outline-close" size="32" class="my-6 cursor-pointer text-primary" />
      </span>
      <SearchInput class="mb-3" />
      <ul>
        <li v-if="userData.role === 'writer'" class="border-b border-primary">
          <NuxtLink
            to="/newstory"
            class="block py-5 font-serif-tc font-semibold text-primary"
            @click="toggleMobileMenu"
            >發表文章</NuxtLink
          >
        </li>
        <li class="pt-5">
          <div
            class="flex items-center justify-between border-b border-primary pb-5"
            @click="toggleMobileCategory"
          >
            <p class="font-serif-tc font-semibold text-primary">精選文章</p>
            <Icon
              name="ic:outline-expand-more"
              size="24"
              class="duration-200"
              :class="{ 'rotate-180': showMobileCategory }"
            />
          </div>
          <ul
            class="overflow-hidden transition-all duration-500"
            :class="showMobileCategory ? 'max-h-96' : 'max-h-0'"
          >
            <li class="border-b border-primary">
              <NuxtLink
                :to="{ name: 'article', query: { category: 'personal-growth' } }"
                class="block py-5 font-serif-tc font-semibold text-primary"
                @click="toggleMobileMenu"
                >個人成長</NuxtLink
              >
            </li>
            <li class="border-b border-primary">
              <NuxtLink
                :to="{ name: 'article', query: { category: 'emotional-awareness' } }"
                class="block py-5 font-serif-tc font-semibold text-primary"
                @click="toggleMobileMenu"
                >情緒察覺</NuxtLink
              >
            </li>
            <li class="border-b border-primary">
              <NuxtLink
                :to="{ name: 'article', query: { category: 'intimate-relationships' } }"
                class="block py-5 font-serif-tc font-semibold text-primary"
                @click="toggleMobileMenu"
                >親密關係</NuxtLink
              >
            </li>
            <li class="border-b border-primary">
              <NuxtLink
                :to="{ name: 'article', query: { category: 'daily-practice' } }"
                class="block py-5 font-serif-tc font-semibold text-primary"
                @click="toggleMobileMenu"
                >日常練習</NuxtLink
              >
            </li>
            <li class="border-b border-primary">
              <NuxtLink
                :to="{ name: 'article', query: { category: 'all' } }"
                class="block py-5 font-serif-tc font-semibold text-primary"
                @click="toggleMobileMenu"
                >所有文章</NuxtLink
              >
            </li>
          </ul>
        </li>
        <li class="border-b border-primary">
          <NuxtLink
            to="/chatroom"
            class="block py-5 font-serif-tc font-semibold text-primary"
            @click="toggleMobileMenu"
            >AI告解室</NuxtLink
          >
        </li>
        <li class="border-b border-primary">
          <NuxtLink
            to="/chatroom"
            class="block py-5 font-serif-tc font-semibold text-primary"
            @click="toggleMobileMenu"
            >論壇</NuxtLink
          >
        </li>
        <li class="border-b border-primary">
          <NuxtLink
            to="/plans"
            class="block py-5 font-serif-tc font-semibold text-primary"
            @click="toggleMobileMenu"
            >訂閱方案</NuxtLink
          >
        </li>
        <li class="border-b border-primary">
          <NuxtLink
            to="/login"
            class="block py-5 font-serif-tc font-semibold text-primary"
            @click="toggleMobileMenu"
            >登入/註冊</NuxtLink
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped></style>
