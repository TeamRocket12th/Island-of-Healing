<script setup lang="ts">
definePageMeta({
  layout: 'landinglayout'
})

useHead({ title: '成為作家' })
</script>
<template>
  <div class="bg-sand-100">
    <LandingIntro />
    <LandingWriting />
    <LandingFeatures />
    <LandingFeedback />
    <LandingBrand />
  </div>
</template>

<style scoped></style>
