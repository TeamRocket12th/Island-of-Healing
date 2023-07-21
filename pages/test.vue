<template>
  <div>
    <form action="http://localhost:3000/api/paymentcheck" method="POST">
      <label for="Status">What greeting do you want to say?</label>
      <input id="Status" name="Status" value="SUCCESS" />
      <button>submit</button>
    </form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
