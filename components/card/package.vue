<template>
  <div>
    <div class="shadow-lg py-8 px-10 rounded-lg flex flex-col gap-6 max-w-fit">
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-semibold text-slate-600">
          {{ package.attributes.packageName }}
        </h1>
        <span class="text-slate-400 text-base">{{
          package.attributes.descriptionPackage
        }}</span>

        <ClientOnly>
          <span class="text-sm text-slate-400 flex items-end gap-1">
            <span class="text-3xl font-semibold text-black">
              <span class="text-xl"> Start from </span>
              {{
                Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalPrice)
              }}
            </span>
            Rupiah</span
          >
        </ClientOnly>
      </div>

      <ul class="flex flex-col gap-4 pt-6">
        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span
            >{{ Object.keys(package.attributes.photographer).length }}
            Fotografer untuk mengabadikan momen Anda
          </span>
        </li>
        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>
            Tempat dengan kapasitas
            {{ package.attributes.venue.data?.attributes.capacity }}
            orang</span
          >
        </li>
        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>
            {{ package.attributes.make_up_artists.data?.length }} Keterampilan
            makeup ahli untuk pengantin</span
          >
        </li>
        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>
            {{ package.attributes.master_ceremonies.data?.length }} Pembawa
            acara untuk dua kali keajaiban pernikahan.</span
          >
        </li>
        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>
            {{ Object.keys(package.attributes.catering)?.length }} Katering
            pernikahan yang menggiurkan.</span
          >
        </li>

        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>
            {{ dekor.data.length }}
            dekorasi yang bisa anda pilih</span
          >
        </li>

        <li class="flex gap-4">
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>
            {{ Object.keys(package.attributes.band)?.length }}
            Band pengiring yang akan memeriahkan pernikahan anda</span
          >
        </li>
      </ul>
      <span
        >Tidak cocok dengan paketnya? <br />
        <br />
        Anda dapat menyesuaikan isi paket yang paling cocok untuk Anda <br />
        dengan harga dasar mulai dari
        <strong class="text-xl">
          {{
            Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(package.attributes.basePrice)
          }}
        </strong></span
      >

      <NuxtLink :to="`/package/${package.attributes.packageName}`">
        <button
          class="w-full bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-28 py-3"
        >
          View Package
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  package: {
    type: Object,
    required: true,
  },
  dekor: {
    type: Object,
    required: true,
  },

  catering: {
    type: Object,
    required: true,
  },
});
const totalPrice = computed(() => {
  const totalCaterings = props.catering.data?.attributes.food.reduce(
    (acc, element) => {
      return acc + element.price * element.stok;
    },
    0
  );

  const totalMC = props.package.attributes.master_ceremonies.data.reduce(
    (acc, element) => {
      return acc + element.attributes.price;
    },
    0
  );

  const totalMUA = props.package.attributes.make_up_artists.data.reduce(
    (acc, element) => {
      return acc + element.attributes.price;
    },
    0
  );

  return (
    Number(props.package.attributes.basePrice) +
    Number(totalCaterings) +
    Number(totalMC) +
    Number(totalMUA) +
    Number(props.package.attributes.photographer.data?.attributes.price) +
    Number(props.package.attributes.venue.data?.attributes.price) +
    Number(props.package.attributes.band.data.attributes.Price)
  );
});
const emit = defineEmits(["redirect"]);
</script>

<style></style>
