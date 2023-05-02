<script setup>
definePageMeta({
  layout: "package",
});

let descList = ref([
  "Outdoor Wedding",
  "Around 200 People",
  "Backsound Music",
  "2 Master Ceremony",
  "1 Make up Artist",
  "Indonesian's Tribe Decoration",
]);
</script>

<template>
  <div class="flex flex-col gap-44 items-center justify-center px-44 py-44">
    <div class="flex flex-col gap-8 justify-center items-start w-full relative">
      <h1
        class="z-10 text-9xl py-4 font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-[#4568DC]/50 to-[#B06AB3]/50"
      >
        Wonderfull <br />
        Package
      </h1>
      <p class="text-left font-medium text-slate-400 text-xl w-[60%] z-10">
        Create Lasting Memories of Your Special Day with Our Wonderful Wedding
        Package - The Perfect Way to Preserve Every Moment and Cherish Your Love
        Story for Years to Come.
      </p>
      <img
        class="absolute z-0 w-1/2 -top-1/3 right-[5%] opacity-20"
        src="https://res.cloudinary.com/dxy6iowwg/image/upload/v1680512309/blob_ywloy4.svg"
        alt="bolb"
      />
    </div>
    <div class="flex gap-10 items-start flex-wrap justify-between">
      <CardPackage :type="2" :description="descList" :price="`10.000.000`" />
      <CardPackage :type="2" :description="descList" :price="`10.000.000`" />
      <CardPackage :type="3" :description="descList" :price="`10.000.000`" />
    </div>

    <FAQ />

    <div class="flex flex-col gap-6 justify-start items-start w-full">
      <h1 class="text-5xl text-slate-700 font-semibold">
        Have any questions ?
      </h1>
      <span class="text-base text-slate-400 w-[55%]"
        >If you have any questions about our team and how the customizable
        package works. our team will be happy to help you.</span
      >

      <a
        href="mailto:drigoasihombing@gmail.com?subject=Question About Package"
        class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
        >Get in touch</a
      >
    </div>
  </div>
</template>
