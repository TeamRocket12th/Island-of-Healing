<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { isLogin } = storeToRefs(useUserStore())
const router = useRouter()
defineProps({
  c: {
    type: Object,
    default: () => {}
  }
})
const showDesc = ref(false)

const checkIsLogin = (roleId: string) => {
  if (!isLogin.value) {
    alert('請先登入才能聊天喔')
    router.push('/login')
  } else {
    router.push(`/chatroom/${roleId}`)
  }
}
</script>

<template>
  <div
    class="card-bg flex h-[468px] w-full flex-col items-center rounded-2xl px-11 pt-20 shadow-xl transition-all duration-700 hover:scale-105"
    @mouseenter="showDesc = true"
    @mouseleave="showDesc = false"
  >
    <div class="mb-3 flex items-center justify-center">
      <img :src="c.imgUrl" alt="chat-role" class="h-[100px] w-[100px] rounded-full" />
    </div>
    <div class="flex flex-col items-center transition-all duration-700">
      <h2 class="mb-3 font-serif-tc text-xl font-bold text-primary">{{ c.name }}</h2>
      <p class="desc items-center text-center font-light text-primary">
        {{ c.desc }}
      </p>
      <div class="pt-6">
        <button
          type="button"
          class="btn-orange px-4 py-3 text-xl font-medium text-white hover:scale-110"
          @click="checkIsLogin(c.id)"
        >
          開始聊天
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-orange {
  border-radius: 100px;
  background: linear-gradient(90deg, rgba(255, 138, 0, 0.74) 0%, #ffce94 100%);
  box-shadow: -8px 0px 15px 0px rgba(255, 255, 255, 0.4) inset,
    0px -5px 10px 0px rgba(255, 255, 255, 0.4) inset,
    0px 2px 10px 0px rgba(255, 255, 255, 0.5) inset, 5px 0px 10px 0px rgba(255, 255, 255, 0.2) inset,
    0px 6px 10px 0px rgba(223, 161, 106, 0.3);
  backdrop-filter: blur(150px);
  transition: transform 0.3s ease;
}
.card-bg {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.16) 100%,
    rgba(255, 255, 255, 0.16) 100%
  );
  box-shadow: 3px 5px 4px 1px #fff inset, -4px -4px 34px 0px #fcf2ec inset,
    0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1);
}
</style>
