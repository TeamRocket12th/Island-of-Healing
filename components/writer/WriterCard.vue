<script setup>
const data = {
  writerName: '張家齊',
  introduction:
    '我的文章致力於探索心理學和自我察覺的奧秘，希望能啟發讀者思考、增進心理健康和提升自我成長。透過深入研究心理學和自我察覺，我努力將...',
  articleNum: 6,
  followersNum: 30
}
</script>
<template>
  <div class="w-1/3 border px-7 pt-[60px]">
    <div class="m-auto mb-6 h-[100px] w-[100px] rounded-full bg-[#CDCDCD]"></div>
    <h2 class="text-center text-2xl">{{ data.writerName }}</h2>
    <p class="my-6 text-[#9F9F9F]">{{ data.introduction }}</p>
    <div class="w-full border border-[#CDCDCD]"></div>
    <div class="my-6 flex justify-center gap-[84px] text-center">
      <div>
        <h3 class="text-2xl">{{ data.articleNum }}</h3>
        <p>篇文章</p>
      </div>
      <div>
        <h3 class="text-2xl">{{ data.followersNum }}</h3>
        <p>追蹤者</p>
      </div>
    </div>
    <div class="mb-6 w-full border border-[#CDCDCD]"></div>
    <button class="m-auto mb-16 flex gap-2 rounded-md border border-[#CDCDCD] px-7 py-[10px]">
      <Icon name="ic:round-plus" size="24" />
      <span>追蹤</span>
    </button>
  </div>
</template>

<style scoped></style>
