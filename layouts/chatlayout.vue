<template>
  <div class="chatroom-bg flex min-h-screen flex-col">
    <NavbarItem class="bg-transparent" />
    <main class="flex-grow">
      <slot />
    </main>
    <FooterItem />
  </div>
</template>

<style scoped>
.chatroom-bg {
  background-image: url('~/assets/images/chatroom/AI-chatroom-desktop-bg.jpg');
  background-position: center;
  background-size: cover;
  background-color: #fef3ed;
}
</style>
