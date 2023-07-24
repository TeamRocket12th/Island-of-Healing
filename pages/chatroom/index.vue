<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
definePageMeta({
  layout: 'chatlayout'
})
useSeoMeta({ title: 'AI相談室' })

const { userData } = storeToRefs(useUserStore())
</script>

<template>
  <section>
    <div class="container flex items-center justify-center pb-40 pt-20 md:pb-[441px] md:pt-[180px]">
      <div class="relative mx-auto h-[400px] w-[670px] pt-[197px]">
        <div class="animate-fadein delay-1 absolute -left-24 -top-28 z-20 h-[200px] w-[200px]">
          <img
            src="~/assets/images/chatroom/bg-ball-red.png"
            alt="bg-redball"
            class="h-full w-full"
          />
        </div>

        <div
          class="animate-fadein delay-2 absolute -right-56 -top-16 z-20 hidden h-[131px] w-[131px] md:block"
        >
          <img src="~/assets/images/chatroom/bg-ball-purple.png" alt="bg-purpleball" />
        </div>

        <div
          class="animate-fadein delay-3 absolute bottom-12 left-0 z-40 h-[90px] w-[90px] md:left-10 md:h-[200px] md:w-[200px]"
        >
          <img
            src="~/assets/images/chatroom/bg-ball-bule.png"
            alt="bg-blueball"
            class="h-full w-full"
          />
        </div>
        <div
          class="animate-fadein delay-4 absolute -bottom-16 -right-12 z-40 hidden h-[155px] w-[155px] md:block"
        >
          <img
            src="~/assets/images/chatroom/bg-ball-yellow.png"
            alt="bg-yellowball"
            class="h-full w-full"
          />
        </div>
        <div
          class="animate-fadein delay-5 absolute -left-[200px] top-32 z-10 hidden max-h-28 w-[289px] md:block"
        >
          <img
            src="~/assets/images/chatroom/card-green.png"
            alt="card-green"
            class="h-full w-full object-cover"
          />
        </div>
        <div
          class="animate-fadein delay-5 absolute left-0 top-72 z-40 hidden max-h-28 w-[289px] md:block"
        >
          <img
            src="~/assets/images/chatroom/card-yellow.png"
            alt="card-yellow"
            class="card-yellow h-full w-full object-cover"
          />
          <div class="absolute -left-24 -top-[68px] z-50 h-[70px] w-16">
            <img
              src="~/assets/images/chatroom/heart.png"
              alt="heart-icon"
              class="card-yellow h-full w-full object-cover"
            />
          </div>
        </div>
        <div
          class="animate-fadein delay-5 absolute -right-40 -top-7 z-40 hidden max-h-28 w-[289px] md:block"
        >
          <img
            src="~/assets/images/chatroom/card-red.png"
            alt="card-red"
            class="card-red h-full w-full object-cover"
          />
        </div>
        <div
          class="animate-fadein delay-5 absolute -bottom-4 -right-56 z-40 hidden max-h-28 w-[289px] md:block"
        >
          <img
            src="~/assets/images/chatroom/card-blue.png"
            alt="card-blue"
            class="card-blue h-full w-full object-cover"
          />
          <div class="absolute -top-16 left-0 z-40 h-[70px] w-16">
            <img
              src="~/assets/images/chatroom/question.png"
              alt="question-icon"
              class="card-blue h-full w-full object-cover"
            />
          </div>
        </div>
        <div
          class="animate-fadein rectangle-bg absolute bottom-0 left-0 right-0 top-0 z-30 mx-auto h-[420px] w-full rounded-lg pb-11 shadow-sm md:h-full"
        >
          <div class="mb-4 ml-4 mt-4 flex items-center gap-2">
            <div class="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
              <img src="~/assets/images/chatroom/chatroomavatar.png" alt="chatroomIcon" />
            </div>
            <span class="text-xl text-primary">{{
              userData.nickName ? userData.nickName : '新島民'
            }}</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="mb-10 md:px-[106px]">
              <h2
                class="mb-4 text-center text-4xl font-bold leading-normal text-primary md:text-5xl"
              >
                歡迎來到AI 相談室！
              </h2>
              <p class="px-[30px] text-center font-light leading-relaxed text-primary-dark md:px-0">
                在以下測驗中，我們將探索您的個性特徵和心理狀態。請在開始測驗之前保持專注和放鬆，並按照問題的提示進行回答。
              </p>
            </div>
            <button
              class="btn-test absolute bottom-[100px] mb-3 flex items-center py-3 pl-4 pr-3 text-2xl font-medium text-white shadow hover:scale-110 md:block"
            >
              <NuxtLink to="/chatroom/questions">
                開始測驗
                <span>
                  <Icon name="ic:outline-arrow-right" size="32" />
                </span>
              </NuxtLink>
            </button>
            <button class="absolute bottom-[84px] transition-transform hover:scale-110 md:block">
              <NuxtLink to="/chatroom/characters" class="tracking-wide text-primary-dark underline"
                >略過測驗</NuxtLink
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-test {
  z-index: 99;
  border-radius: 100px;
  background: linear-gradient(90deg, rgba(255, 138, 0, 0.74) 0%, #ffce94 100%);
  box-shadow: -8px 0px 15px 0px rgba(255, 255, 255, 0.4) inset,
    0px -5px 10px 0px rgba(255, 255, 255, 0.4) inset,
    0px 2px 10px 0px rgba(255, 255, 255, 0.5) inset, 5px 0px 10px 0px rgba(255, 255, 255, 0.2) inset,
    0px 6px 10px 0px rgba(223, 161, 106, 0.3);
  backdrop-filter: blur(150px);
  transition: transform 0.3s ease;
}

.rectangle-bg {
  background-image: url('~/assets/images/chatroom/chatroom-bg.png');
  background-size: cover;
  background-position: center;
}
.card-yellow {
  animation: spin 4s linear infinite;
}

.card-red {
  animation: spinReverse 4s linear infinite;
}

.card-blue {
  animation: spin 4s linear infinite;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.delay-1 {
  animation-delay: 0.2s;
}
.delay-2 {
  animation-delay: 0.4s;
}
.delay-3 {
  animation-delay: 0.6s;
}
.delay-4 {
  animation-delay: 0.8s;
}
.delay-5 {
  animation-delay: 1s;
}

.animate-fadein {
  animation-name: fadein;
  animation-duration: 2s;
  animation-fill-mode: both;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translate(10px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translate(10px) rotate(-360deg);
  }
}
@keyframes spinReverse {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translate(10px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg) translate(10px) rotate(360deg);
  }
}
</style>
