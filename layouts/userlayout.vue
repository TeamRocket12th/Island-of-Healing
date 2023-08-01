<script setup lang="ts"></script>

<template>
  <div id="userpage" class="bg-sand-100">
    <NavbarItem />
    <div class="flex min-h-[70vh] flex-grow">
      <SettingSidebar class="hidden md:block" />
      <main id="content" class="container relative">
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
