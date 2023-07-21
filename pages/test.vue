<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { userData } = storeToRefs(useUserStore())
console.log(userData.value)
</script>

<template>
  <div>
    <form action="https://island-of-healing.vercel.app/api/paymentcheck" method="POST">
      <label for="Status">Form POST測試</label>
      <input id="Status" name="Status" value="SUCCESS" />
      <button>submit</button>
    </form>
  </div>
</template>
