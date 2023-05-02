<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  excerpt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h1 class="font-semibold italic text-4xl">
      <span class="font-bold not-italic">Blog : </span>{{ title }}
    </h1>
    <span class="text-gray-500 font-light text-xl">
      {{ new Date(date).toLocaleDateString("id-ID", { dateStyle: "full" }) }}
    </span>
    <p class="line-clamp-3">
      {{ excerpt }}
    </p>

    <NuxtLink
      :to="`/blogs/${slug}`"
      class="cursor-pointer flex gap-2 font-light text-xs p-3 rounded-md border-[1px] border-gradient-pink/50 w-fit items-center group"
    >
      Read More
      <ArrowRightIcon
        class="w-4 group-hover:translate-x-[2px] ease-in-out duration-200"
      />
    </NuxtLink>
  </div>
</template>
