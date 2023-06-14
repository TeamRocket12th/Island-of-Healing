<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div>
    <BannerArea />
    <LatestArticleCard />
    <TrendingCreater />
    <HomeArticleCard />
  </div>
</template>
