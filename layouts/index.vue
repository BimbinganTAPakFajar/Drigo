<template>
  <div class="w-[90%] bg-white flex flex-col mx-auto">
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
definePageMeta({});
</script>
