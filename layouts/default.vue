<template>
  <div class="flex min-h-screen flex-col">
    <NavbarItem />
    <main class="flex-grow bg-sand-100">
      <slot />
    </main>
    <FooterItem />
  </div>
</template>
