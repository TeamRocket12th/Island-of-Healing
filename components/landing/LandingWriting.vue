<script setup lang="ts"></script>
<template>
  <section class="container mb-10 lg:mb-[66px]">
    <h3 class="mb-5 text-center text-4xl font-bold text-primary-dark lg:mb-4 lg:text-4xl-plus">
      強大而直觀的寫作工具
    </h3>
    <p class="mb-12 text-center text-base font-[350px] text-primary-dark lg:mb-[100px] lg:text-2xl">
      讓您專注於創作，輕鬆實現您的想法和故事。
    </p>
    <div class="flex flex-wrap gap-[37px] lg:flex-nowrap">
      <div class="order-2 w-full lg:order-1 lg:w-1/3">
        <div
          class="produce1 mb-11 w-full gap-4 rounded-2xl lg:flex lg:border-[0.5px] lg:border-sand-300 lg:px-4 lg:py-3"
        >
          <div class="flex justify-center lg:block">
            <div
              class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[2px] border-secondary bg-sand-200"
            >
              <Icon name="material-symbols:draw" size="27" class="text-secondary" />
            </div>
          </div>
          <div>
            <h4 class="mb-2 text-center text-2xl font-bold text-primary lg:text-left">
              專注於寫作的編輯器
            </h4>
            <p class="font-light leading-8 text-primary-dark lg:leading-7 xl:leading-8">
              文字編輯器專為創作者而設計，旨在提供一個無干擾的寫作的空間。讓您能夠全神貫注地表達您的思想和創意。
            </p>
          </div>
        </div>
        <div
          class="produce2 mb-11 w-full gap-4 rounded-2xl lg:flex lg:border-[0.5px] lg:border-sand-300 lg:px-4 lg:py-3"
        >
          <div class="flex justify-center lg:block">
            <div
              class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[2px] border-secondary bg-sand-200"
            >
              <Icon name="ic:outline-grid-view" size="27" class="text-secondary" />
            </div>
          </div>
          <div>
            <h4 class="mb-2 text-center text-2xl font-bold text-primary lg:text-left">
              乾淨直觀的介面
            </h4>
            <p class="font-light leading-8 text-primary-dark lg:leading-7 xl:leading-8">
              我們的文字編輯器採用了乾淨且直觀的用戶界面，以提供無壓力的寫作體驗。沒有繁瑣的功能和複雜的選項，只有您真正需要的工具，讓您的寫作流程更加順暢。
            </p>
          </div>
        </div>
        <div
          class="produce3 mb-11 w-full gap-4 rounded-2xl lg:flex lg:border-[0.5px] lg:border-sand-300 lg:px-4 lg:py-3"
        >
          <div class="flex justify-center lg:block">
            <div
              class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[2px] bg-sand-200"
            >
              <img src="~/assets/images/landingpage/markdown-icon.svg" alt="" class="" />
            </div>
          </div>
          <div>
            <h4 class="mb-2 text-center text-2xl font-bold text-primary lg:text-left">
              支援Markdown 語法
            </h4>
            <p class="font-light leading-8 text-primary-dark lg:leading-7 xl:leading-8">
              內置了強大的Markdown語法支援，讓您可以通過快捷鍵和簡單的指令，輕鬆編輯和格式化您的內容。
            </p>
          </div>
        </div>
      </div>
      <div
        class="relative order-1 w-full rounded border-[0.5px] border-sand-300 py-4 shadow-md lg:order-2 lg:w-2/3"
      >
        <video class="video1 w-full" autoplay loop>
          <source src="~/assets/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>
</template>

<style>
@media (min-width: 1024px) {
  .produce1 {
    animation: highlight-1 5s infinite;
  }

  .produce2 {
    animation: highlight-2 5s infinite;
    animation-delay: 1s;
  }

  .produce3 {
    animation: highlight-3 5s infinite;
    animation-delay: 1s;
  }

  @keyframes highlight-1 {
    0% {
      box-shadow: 0px 0px 0px 0px;
    }

    25% {
      box-shadow: 0px 4px 8px -4px;
      background-color: #eeeae1;
    }

    75% {
      box-shadow: 0px 0px 0px 0px;
    }

    100% {
      box-shadow: 0px 0px 0px 0px;
    }
  }

  @keyframes highlight-2 {
    0% {
      box-shadow: 0px 0px 0px 0px;
    }

    25% {
      box-shadow: 0px 4px 8px -4px;
      background-color: #eeeae1;
    }

    75% {
      box-shadow: 0px 0px 0px 0px;
    }

    100% {
      box-shadow: 0px 0px 0px 0px;
    }
  }

  @keyframes highlight-3 {
    0% {
      box-shadow: 0px 0px 0px 0px;
    }

    25% {
      box-shadow: 0px 0px 0px 0px;
    }

    75% {
      box-shadow: 0px 4px 8px -4px;
      background-color: #eeeae1;
    }

    100% {
      box-shadow: 0px 4px 8px -4px;
      background-color: #eeeae1;
    }
  }
}

/* @keyframes fade {
  0% {
    opacity: 1;
  }
  33.33% {
    opacity: 0;
  }
  66.66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.video1 {
  animation: fade 20s infinite;
}

.video2 {
  animation: fade 15s infinite 10s;
}

.video3 {
  animation: fade 15s infinite 6s;
}

.video2,
.video3 {
  opacity: 0;
} */
</style>
