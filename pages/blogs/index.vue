<script setup>
definePageMeta({
  layout: "index",

  middleware: ["is-logged"],
});
const config = useRuntimeConfig();
const Blogs = await $fetch(`${config.public.strapiEndpoint}/blogs?populate=*`);

console.log(Blogs);
</script>

<template>
  <div
    class="flex items-center justify-center flex-col flex-grow w-[50%] mx-auto gap-24"
  >
    <div class="flex flex-col gap-2 text-center">
      <h1 class="font-bold text-4xl">Blissful Blogs.</h1>
      <h4 class="text-lg font-normal text-gray-400">
        Writed for You, Curated Blogs for a Flawless Wedding
      </h4>
    </div>

    <div
      class="flex flex-col gap-14 [&>*:last-child_section]:hidden"
      v-if="Blogs.data.length > 0"
    >
      <div class="flex flex-col gap-14" v-for="el in Blogs.data" :key="el.id">
        <CardBlog
          :title="el.attributes.title"
          :date="el.attributes.date"
          :slug="el.attributes.Slug"
          :excerpt="el.attributes.excerpt"
        />

        <section class="w-full h-[1px] bg-gray-300 rounded-sm"></section>
      </div>
    </div>
    <div v-else>No Blogs Yet</div>
  </div>
</template>
