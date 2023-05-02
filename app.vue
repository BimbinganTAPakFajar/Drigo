<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Blissful Beginning`
      : "Blissful Beginning";
  },
});

// useServerSeoMeta({
//   description:
//     "Discover the perfect wedding experience with our customizable atomic packages. Our wedding organizer website helps you plan your dream wedding with ease. From venue selection to catering and decorations, we've got you covered. Start planning your special day today!",
//   ogDescription:
//     "Discover the perfect wedding experience with our customizable atomic packages. Our wedding organizer website helps you plan your dream wedding with ease. From venue selection to catering and decorations, we've got you covered. Start planning your special day today!",
//   ogImage:
//     "https://ik.imagekit.io/drigoalexander/cardOG_k0ToF7Dkx.png?updatedAt=1681992218604",
//   twitterCard: "summary_large_image",
// });
</script>

<style>
.v-enter-active {
  transition: all 1.5s ease-in-out;
}

.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
