<script setup lang="ts">
const route = useRoute()
const email = ref(route.query.email)
const guid = ref(route.query.guid)
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

const activeTempPwd = async () => {
  try {
    const res = await fetch(`${apiBase}/resetpwdactive?email=${email.value}&guid=${guid.value}`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST'
    })
    const data = await res.json()
    console.log(data)
  } catch (error: any) {
    console.log(error)
  }
}

onMounted(() => {
  if (email.value && guid.value) {
    activeTempPwd()
  }
})
</script>
<template>
  <div class="bg-sand-100">
    <LoginForm />
  </div>
</template>

<style scoped></style>
