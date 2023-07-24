<script setup lang="ts">
const route = useRoute()
const email = ref(route.query.email)
const guid = ref(route.query.guid)
const { apiBase } = useApiConfig()

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
  <section>
    <LoginForm />
  </section>
</template>

<style scoped></style>
