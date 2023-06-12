<script setup lang="ts"></script>

<template>
  <footer class="bg-[#CDCDCD]">
    <div class="container grid h-[582px] grid-cols-12 py-52">
      <div class="col-span-5 border-r border-gray-500 py-7 pr-12">
        <h2 class="mb-4 text-4xl font-bold">小島聊癒所</h2>
        <p>
          「小島聊癒所」陪伴人們認識自己的情緒，傾聽內在的聲音，<br />
          希望透過閱讀我們的文章，在遇到困境時找到一點方向與慰藉。
        </p>
      </div>
      <div class="col-span-7 py-7 pl-7">
        <div class="flex gap-11">
          <div class="text-sm font-medium">
            <h3 class="mb-3">關於我們</h3>
            <ul>
              <li class="mb-3 font-normal"><RouterLink to="/">我們的使命</RouterLink></li>
              <li class="mb-3 font-normal"><RouterLink to="/">我們的服務</RouterLink></li>
            </ul>
          </div>
          <div class="text-sm font-medium"><h3>精選文章</h3></div>
          <div class="text-sm font-medium"><h3>AI 告解室</h3></div>
          <div class="text-sm font-medium"><h3>留言板</h3></div>
          <div class="text-sm font-medium"><h3>訂閱方案</h3></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
