<script setup>
const data = [
  {
    id: 1,
    Classification: '個人成長',
    date: '2023.6.31',
    title: '重拾自我價值：探索內在的力量',
    content:
      '在這個忙碌、要求和競爭的世界中，我們常常忽略了最重要的一個人──自己。愛自己並不是自私或自戀，而是一種對自己的尊重和關懷。當我們學會愛自己時，我們能夠建立健康的自尊心、提高生活質量',
    imgUrl: 'https://picsum.photos/392/247'
  },
  {
    id: 2,
    Classification: '情緒察覺',
    date: '2023.6.30',
    title: '認識自我與擁抱內在小孩的旅程',
    content:
      '人生是一個不斷成長和發展的旅程，而認識自我是這個旅程中至關重要的一部分。我們每個人都有一個內在的小孩，那個純真、好奇和無憂無慮的自己。',
    imgUrl: 'https://picsum.photos/392/247'
  },
  {
    id: 3,
    Classification: '親密關係',
    date: '2023.6.30',
    title: '別離與成長：好好道別的力量',
    content:
      '在人生的旅程中，我們常常面對各種離別和告別。不論是和摯愛的人分手、離開一個熟悉的環境，或是告別已逝的親友，說再見總是一個不可避免的過程。然而，我們可以選擇以一種全新的角度來看待這些告別，並學會好好說再見。',
    imgUrl: 'https://picsum.photos/392/247'
  },
  {
    id: 4,
    Classification: '個人成長',
    date: '2023.6.20',
    title: '獨處的力量：發現內在寧靜與成長的時刻',
    content:
      '在人生的旅程中，我們常常面對各種離別和告別。不論是和摯愛的人分手、離開一個熟悉的環境，或是告別已逝的親友，說再見總是一個不可避免的過程。然而，我們可以選擇以一種全新的角度來看待這些告別，並學會好好說再見。',
    imgUrl: 'https://picsum.photos/392/247'
  },
  {
    id: 5,
    Classification: '親密關係',
    date: '2023.5.30',
    title: '擺脫不健康的家庭關係，重塑心理平衡的五個關鍵方法',
    content:
      '家庭關係對我們的心理健康和幸福感有著深遠的影響。然而，有時候我們可能陷入不健康的家庭關係中，這可能帶來壓力、焦慮和情緒困擾。',
    imgUrl: 'https://picsum.photos/392/247'
  },
  {
    id: 6,
    Classification: '日常練習',
    date: '2023.6.19',
    title: '照顧身心的力量：分享三個簡單的實踐方法',
    content:
      '在現代快節奏的生活中，照顧好我們的身心健康變得至關重要。無論是面對工作壓力、人際關係或其他挑戰，學會照顧自己的身心可以幫助我們保持平衡、增強抵抗力，並享受更充實的生活。',
    imgUrl: 'https://picsum.photos/392/247'
  }
]
</script>
<template>
  <section class="container mb-6">
    <div class="mb-6 flex items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <h2 class="font-serif-tc text-4xl font-bold text-primary">最新文章</h2>
        <div class="h-[0.5px] w-[150px] bg-primary"></div>
      </div>
      <SearchInput class="hidden sm:block" />
    </div>
    <ul class="mb-3 gap-4 sm:grid sm:grid-cols-12">
      <li
        v-for="item in data"
        :key="item.id"
        class="mb-3 flex h-auto grow flex-col p-4 sm:h-[517px] md:col-span-6 lg:col-span-4"
      >
        <div class="flex w-full justify-between">
          <div class="flex flex-col">
            <div class="mb-1 flex">
              <h3 class="font-serif-tc font-semibold text-primary">{{ item.Classification }}</h3>
            </div>
            <p class="mb-3 font-serif-tc text-sm font-light text-[#828282] sm:text-primary-dark">
              {{ item.date }}
            </p>
          </div>
        </div>
        <NuxtLink :to="`article/${item.id}`">
          <div class="mb-3 h-[267px] max-w-full">
            <img :src="item.imgUrl" alt="article-cover" class="h-full w-full" />
          </div>
          <h4 class="mb-3 font-serif-tc text-xl font-bold text-primary">{{ item.title }}</h4>
          <p class="font-light text-primary-dark">{{ item.content }}</p>
        </NuxtLink>
      </li>
    </ul>
    <div class="flex justify-center">
      <NuxtLink to="/article" class="font-serif-tc text-xl font-semibold text-primary">
        <div class="flex items-center">
          <span class="border-b border-primary">更多文章</span>
          <Icon name="ic:outline-keyboard-arrow-right" size="24" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
