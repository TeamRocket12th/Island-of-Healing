<script setup lang="ts">
definePageMeta({
  layout: 'landinglayout'
})

useHead({ title: '成為作家' })

const writerRulesShow = ref(false)
const ruleShow = (value: boolean) => {
  writerRulesShow.value = value
}
const ruleCancel = (value: boolean) => {
  writerRulesShow.value = value
}
</script>
<template>
  <div class="bg-sand-100">
    <LandingIntro @writer-rules="ruleShow" />
    <LandingWriting />
    <LandingFeatures />
    <LandingFeedback />
    <LandingBrand />
    <BewriterRules v-if="writerRulesShow" @writer-rules="ruleCancel" />
  </div>
</template>

<style scoped></style>
