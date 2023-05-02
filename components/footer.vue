<template>
  <div class="w-full mx-auto w-full bg-white py-10 h-auto flex gap-4">
    <div class="w-[50%] flex flex-col gap-6">
      <div class="flex flex-col gap-4">
        <h1 class="font-light text-slate-600 tracking-wide">Blog</h1>
        <div
          class="w-full h-[1px] bg-gradient-to-tr from-[#4568DC]/50 to-[#B06AB3]/50"
        ></div>
      </div>

      <NuxtLink
        v-for="(el, idx) in footer.data.attributes.blogs.data"
        :key="idx"
        class="flex gap-2 text-slate-500 items-center cursor-pointer"
        :to="`/blogs/${el.attributes.Slug}`"
      >
        <StopIcon class="w-6 stroke-[#B06AB3]/50" />

        {{ el.attributes.title }}
      </NuxtLink>
    </div>

    <div class="w-[25%] flex flex-col gap-6">
      <div class="flex flex-col gap-4">
        <h1 class="font-light text-slate-600 tracking-wide">Package</h1>
        <div
          class="w-full h-[1px] bg-gradient-to-tr from-[#4568DC]/50 to-[#B06AB3]/50"
        ></div>
      </div>

      <div v-for="(el, idx) in footer.data.attributes.packages.data" :key="idx">
        <NuxtLink
          :to="`/package/${el.attributes.Slug}`"
          class="flex gap-2 text-slate-500 items-center cursor-pointer"
        >
          <StopIcon class="w-6 stroke-[#B06AB3]/50" />
          {{ el.attributes.packageName }}
        </NuxtLink>
      </div>
    </div>

    <div class="w-[25%] flex flex-col gap-6">
      <div class="flex flex-col gap-4">
        <h1 class="font-light text-slate-600 tracking-wide">Social Media</h1>
        <div
          class="w-full h-[1px] bg-gradient-to-tr from-[#4568DC]/50 to-[#B06AB3]/50"
        ></div>
      </div>

      <div
        v-for="(el, idx) in footer.data.attributes.socialMedia"
        :key="idx"
        class="flex gap-2 text-slate-500 items-center cursor-pointer"
      >
        <StopIcon class="w-6 stroke-[#B06AB3]/50" />

        {{ el.socialMedia }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { StopIcon } from "@heroicons/vue/24/outline";

let footer = ref();
const config = useRuntimeConfig();
footer.value = await $fetch(`${config.strapiEndpoint}/footer?populate=*`, {
  method: "GET",
});
</script>
