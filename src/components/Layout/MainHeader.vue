<template>
  <header class="flex relative w-full justify-center py-2 px-4 bg-purple-700 shadow-lg text-white">
    <nav class="flex w-full relative justify-center gap-2">
      <RouterLink class="nav-item" to="/">Home</RouterLink>
      <RouterLink class="nav-item" to="/about">About</RouterLink>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'MainHeader'
}
</script>
<style scoped>
.nav-item.router-link-active {
  @apply bg-purple-800 shadow-md shadow-inner;
}

.nav-item {
  @apply px-3 py-1 my-2
  hover:bg-purple-900 rounded-md
  transition duration-500;
}
</style>