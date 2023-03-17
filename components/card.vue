<template>
  <div
    class="flex items-start aspect-[1/1.32] overflow-hidden bg-slate-300 hover:ring-2 ring-[#3258E8] ring-offset-8 p-10 rounded-xl duration-300 ease-in-out relative"
  >
    <div
      class="absolute left-0 bottom-0 w-full h-full bg-gradient-to-t from-black to-transparent z-0 opacity-80"
    ></div>
    <div class="self-end flex flex-col z-10">
      <h3 class="text-lg font-bold text-white">{{ props.package }}</h3>
      <p>
        Start From <span>{{ props.price }}</span> Rupiah
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  package: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
