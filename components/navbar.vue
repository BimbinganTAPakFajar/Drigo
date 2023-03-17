<template>
  <div class="flex items-center justify-between w-[90%] mx-auto">
    <p>Wedding Organizer</p>

    <div class="flex items-center justify-center gap-6">
      <p
        v-for="(el, idx) in listBar"
        :key="idx"
        class="text-[#9C9C9C] hover:text-[#466BF3] duration-300 ease-in-out cursor-pointer"
      >
        {{ el.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
const listBar = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Package",
    url: "/",
  },
  {
    name: "About Us",
    url: "/",
  },
  {
    name: "Contact Us",
    url: "/",
  },
];
</script>
