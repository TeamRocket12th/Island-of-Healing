<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/stores/toast'
const { followWriterPoint, unFollowWriterPoint } = storeToRefs(useToast())
const { userData } = storeToRefs(useUserStore())

defineProps({
  writerId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  writerInfo: {
    type: Object as () => WriterInfo,
    default: () => {},
    required: true
  },
  getWriterInfo: {
    type: Function as unknown as () => (articleId: string, userId: string) => Promise<void>,
    required: true
  }
})

const { followWriter, unFollowWriter } = useWriterActions()
</script>
<template>
  <div class="relative mb-10 h-[511px] bg-white px-[68px] py-[58px] shadow-sm md:mb-0">
    <Teleport to="#point">
      <p
        v-if="followWriterPoint"
        data-aos="fade-left"
        class="fade-element absolute right-0 top-2 w-[322px] rounded bg-secondary py-3 pl-2 text-[14px] text-white duration-700 md:right-0 lg:top-2 lg:h-[44px] lg:w-[348px]"
      >
        追蹤成功！
      </p>
      <p
        v-else-if="unFollowWriterPoint"
        data-aos="fade-left"
        class="fade-element absolute right-0 top-2 w-[322px] rounded bg-secondary py-3 pl-2 text-[14px] text-white duration-700 md:right-0 lg:top-2 lg:h-[44px] lg:w-[348px]"
      >
        取消追蹤成功！
      </p>
    </Teleport>
    <div class="mx-auto mb-6 h-[95px] w-[95px]">
      <img :src="writerInfo.ImgUrl" alt="writer-pic" class="h-full w-full rounded-full" />
    </div>
    <h2 class="text-center font-serif-tc text-2xl font-bold text-primary">
      {{ writerInfo.NickName }}
    </h2>
    <p class="mb-6 text-center text-primary">{{ writerInfo.JobTitle }}</p>
    <p class="my-6 text-center font-light text-primary-dark">{{ writerInfo.Bio }}</p>
    <div class="mb-6 border-y-[0.5px] border-secondary">
      <ul class="flex justify-center gap-[72px] py-2 text-primary">
        <li class="flex flex-col items-center">
          <span class="text-2xl font-medium leading-normal">{{ writerInfo.ArticlesNum }}</span>
          <p class="whitespace-nowrap">篇文章</p>
        </li>
        <li class="flex flex-col items-center">
          <span class="text-2xl font-medium leading-normal">{{ writerInfo.FanNum }}</span>
          <p class="whitespace-nowrap">追蹤者</p>
        </li>
        <li class="flex flex-col items-center">
          <span class="text-2xl font-medium leading-normal">{{ writerInfo.FollowNum }}</span>
          <p class="whitespace-nowrap">追蹤中</p>
        </li>
      </ul>
    </div>
    <button
      v-if="!writerInfo.Follow && writerInfo.Id !== userData.id"
      class="mb-16 flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
      @click="followWriter(writerInfo.Id, writerId, userId, getWriterInfo)"
    >
      <Icon name="ic:round-plus" size="24" />
      <span>追蹤</span>
    </button>
    <button
      v-else-if="writerInfo.Follow && writerInfo.Id !== userData.id"
      class="mb-16 flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
      @click="unFollowWriter(writerInfo.Id, writerId, userId, getWriterInfo)"
    >
      <Icon name="material-symbols:fitbit-check-small" size="24" />
      <span>追蹤中</span>
    </button>
  </div>
</template>

<style scoped></style>
