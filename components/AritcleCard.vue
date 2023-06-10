<script setup>
const data = [
  {
    image: '',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    author: '李柚子',
    date: '2023-03-20'
  },
  {
    image: '',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    author: '李柚子',
    date: '2023-03-20'
  },
  {
    image: '',
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    author: '李柚子',
    date: '2023-03-20'
  }
]
</script>

<template>
  <div class="container 3xl:pl-[300px] 3xl:pr-[300px]">
    <div>
      <ul class="flex gap-6">
        <li v-for="(item, index) in data" :key="index" class="w-1/3 border">
          <div>
            <div class="relative mb-2 h-[247px] bg-[#CDCDCD]">
              <Icon
                name="material-symbols:favorite-outline-rounded"
                size="24"
                class="absolute right-0 top-0 mr-3 mt-3"
              />
            </div>
          </div>
          <div>
            <div class="mb-2">
              <p class="">{{ item.title }}</p>
            </div>
            <p>
              {{ item.author }}
            </p>
            <div class="flex justify-between">
              <p>
                {{ item.date }}
              </p>
              <div class="flex justify-end gap-2">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#CDCDCD]">
                  <Icon name="material-symbols:bookmark-outline-rounded" size="16" />
                </div>
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#CDCDCD]">
                  <Icon name="mdi:share-variant-outline" size="16" />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
