<template>
  <div class="w-auto">
    <button
      v-if="type === 1"
      class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
    >
      {{ buttonText }}
    </button>
    <button
      v-if="type === 2"
      class="px-6 py-3 bg-transparent duration-300 ease-in-out text-[#7B7B7B] focus:text-black hover:ring-2 ring-[#3258E8] rounded-xl w-auto"
    >
      {{ buttonText }}
    </button>
    <button
      v-if="type === 3"
      class="hover:scale-105 px-6 py-3 bg-transparent duration-300 ease-in-out text-[#7B7B7B] focus:text-black w-auto ring-2 ring-[#7B7B7B] rounded-full"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: Number,
    required: true,
  },
  buttonText: {
    type: String,
    requried: true,
  },
});
</script>

<style></style>
