<template>
  <div id="userpage" class="bg-[#F5F5F5]">
    <NavbarItem class="mb-10" />
    <div class="flex flex-grow">
      <SettingSidebar />
      <main id="content" class="conatinaer">
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
