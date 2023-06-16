<script setup lang="ts">
interface TableData {
  [property: string]: string | number
}
defineProps<{ tableData: TableData[] }>()
</script>
<template>
  <div class="border-l border-r border-[#D9D9D9]">
    <div class="border-b border-[#D9D9D9] pb-11">
      <table class="w-full">
        <thead>
          <tr class="bg-[#F5F5F5]">
            <th class="py-[10px] font-normal">選取</th>
            <th class="py-[10px] font-normal">文章名稱</th>
            <th class="py-[10px] font-normal">收藏次數</th>
            <th class="py-[10px] font-normal">發佈時間</th>
            <th class="py-[10px] font-normal">留言次數</th>
            <th class="py-[10px] font-normal">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id" class="text-center">
            <td class="w-[10%] px-11 py-[10px]">
              <input type="checkbox" class="mt-1 h-4 w-4 cursor-pointer" />
            </td>
            <td class="w-[31%] py-[10px]">{{ item.title }}</td>
            <td class="w-[14%] py-[10px]">{{ item.collectNum }}</td>
            <td class="w-[14%] py-[10px]">{{ item.publishDate }}</td>
            <td class="w-[14%] py-[10px]">{{ item.commentNum }}</td>
            <td class="w-[17%] py-[10px]">
              <button type="button">
                <Icon name="material-symbols:edit-outline" size="24" class="mr-6" /></button
              ><button type="button">
                <Icon name="material-symbols:delete-outline" size="24" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #f5f5f5;
}
</style>
