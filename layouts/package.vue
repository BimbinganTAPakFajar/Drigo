<template>
  <div class="w-full flex flex-col mx-auto">
    <Navbar class="px-44" />
    <slot />
    <Footer class="px-44" />
  </div>
</template>

<script setup>
definePageMeta({});
</script>
