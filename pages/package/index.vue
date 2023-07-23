<script setup>
definePageMeta({
  layout: "index",
  middleware: ["partner", "is-logged"],
});
const config = useRuntimeConfig();

const { data: dataPackage, pending } = await useLazyFetch(
  `${config.public.strapiEndpoint}/packages?populate=*`
);

const { data: dataDekor, pending: pendingDekor } = await useLazyFetch(
  `${config.public.strapiEndpoint}/decoration-vendors?populate=*`
);

console.log(dataPackage.value);
</script>

<template>
  <div class="flex flex-col gap-44 items-center justify-center py-44 w-full">
    <div
      class="flex flex-col gap-8 justify-center items-start w-full relative px-44"
    >
      <h1
        class="z-10 text-9xl py-4 font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-[#4568DC]/50 to-[#B06AB3]/50"
      >
        Wonderfull <br />
        Package
      </h1>
      <p class="text-left font-medium text-slate-400 text-xl w-[60%] z-10">
        Ciptakan Kenangan Abadi Hari Spesial Anda dengan Paket Pernikahan Kami
        yang Luar Biasa - Cara Sempurna untuk Melestarikan Setiap Momen dan
        Menghargai Kisah Cinta Anda untuk Bertahun-tahun yang Akan Datang.
      </p>
      <img
        class="absolute z-0 w-1/2 -top-1/3 right-[5%] opacity-20"
        src="https://res.cloudinary.com/dxy6iowwg/image/upload/v1680512309/blob_ywloy4.svg"
        alt="bolb"
      />
    </div>

    <div
      v-if="pending"
      class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 px-44"
    >
      <div
        class="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64"
      ></div>
    </div>

    <div
      v-else
      class="flex flex-row gap-10 items-start justify-center w-full flex-wrap"
    >
      <CardPackage
        v-if="dataPackage.data.length > 0"
        v-for="el in dataPackage.data"
        :key="el.id"
        :package="el"
        :dekor="dataDekor"
        :catering="el.attributes.catering"
      />

      <div
        class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
        v-else
      >
        No Package Available right now.
      </div>
    </div>

    <div class="px-44">
      <FAQ />
    </div>

    <div class="flex flex-col gap-6 justify-start items-start w-full px-44">
      <h1 class="text-5xl text-slate-700 font-semibold">
        Masih punya pertanyaan ?
      </h1>
      <span class="text-base text-slate-400 w-[55%]"
        >Jika Anda memiliki pertanyaan tentang tim kami dan bagaimana paket yang
        dapat disesuaikan bekerja. Tim kami akan dengan senang hati membantu
        Anda.</span
      >

      <a
        href="mailto:drigoasihombing@gmail.com?subject=Pertanyaan tentang paket"
        class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
        >Hubungi kami</a
      >
    </div>
  </div>
</template>
