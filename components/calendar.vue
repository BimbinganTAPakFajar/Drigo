<template>
  <div class="flex gap-20 items-center">
    <div class="w-28 aspect-square overflow-hidden rounded-full">
      <img :src="`${image}`" :alt="`${customerName} Profile Picture`" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-black">{{ customerName }}</h2>
      <div class="flex gap-20 items-center">
        <div class="flex gap-3 items-center justify-center">
          <CalendarIcon class="w-8 aspect-square stroke-black" />
          <p class="text-black text-lg font-medium">
            {{ new Date(date).toLocaleDateString("en-US", options) }}
          </p>
        </div>

        <div class="h-6 w-[1px] bg-slate-400"></div>
        <h4 class="text-black font-semi">{{ packageName }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon } from "@heroicons/vue/24/outline";
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const props = defineProps({
  customerName: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
