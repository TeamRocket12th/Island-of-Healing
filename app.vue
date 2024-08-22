<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { version } from './package.json'
onMounted(() => {
  console.log(
    `%cVersion：${version} %cCopyright © 2023 小島工作室 `,
    'background:#4E2A09;color:#ffffff;border:1px solid #4E2A09;border-right:0;border-radius:5px 0 0 5px;padding:5px 0 5px 10px;font-size:12px;letter-spacing:1px',
    'background:#ffffff;color:#4E2A09;border:1px solid #4E2A09;border-left:0;padding:5px 5px;border-radius:0 5px 5px 0;font-size:12px'
  )

  console.log(
    '\n%c🎉 12梯火箭隊爆肝製作 🎉 \n\n%c3...%c2...%c1...%c火箭隊 12 梯發射 🚀 🚀 🚀',
    'color:#4E2A09;font-size:14px',
    'color:#4E2A09;font-size:12px',
    'color:#4E2A09;font-size:14px',
    'color:#4E2A09;font-size:16px',
    'color:#4E2A09;font-size:18px'
  )
})
</script>
