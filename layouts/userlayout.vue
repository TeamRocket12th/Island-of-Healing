<script setup lang="ts"></script>

<template>
  <div id="userpage" class="bg-sand-100">
    <NavbarItem />
    <div class="flex flex-grow">
      <SettingSidebar />
      <main id="content" class="container">
        <slot />
      </main>
    </div>
    <FooterItem />
  </div>
</template>

<style scoped>
#userpage {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
