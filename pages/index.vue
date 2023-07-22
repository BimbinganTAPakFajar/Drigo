<template>
  <div
    class="flex items-center justify-center h-screen w-full"
    v-if="errCode === 1"
  >
    Oops, our service for this page isn't ready yet
  </div>
  <div
    v-else
    class="text-white mx-auto flex flex-col gap-24 items-center justify-center bg- w-full py-10"
  >
    <!-- Card First  -->

    <div class="flex gap-20 rounded-2xl ]">
      <div class="flex flex-col gap-10 xl:p-10 2xl:p-20 w-1/2">
        <h1 class="titleCard font-bold text-black">
          {{ data.headerTitle }}
        </h1>
        <p class="text-[#7B7B7B] text-lg text-justify">
          {{ data.headerDescription }}
        </p>
      </div>

      <img
        class="w-1/2 max-lg:shrink-0"
        :src="data.jumbotronImage.data.attributes.url"
        alt="Wedding Image"
      />
    </div>
    <!-- End Card First  -->

    <!-- Second Card -->
    <div
      class="flex gap-20 rounded-2xl items-center bg-[#FAFAFA] px-20 py-28 w-full justify-between"
    >
      <div class="flex flex-col gap-2 p-10 w-2/3">
        <p class="text-lg text-[#3258E8]">Our Service</p>
        <h2 class="font-semibold text-black text-5xl inline w-full">
          We Offer <br />Best Service
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-20">
        <div
          class="col-span-1 flex items-center justify-center gap-10"
          v-for="(el, idx) in data.organizerStrength"
          :key="idx"
        >
          <div class="bg-white aspect-square rounded-xl p-6" v-if="idx === 0">
            <img
              src="https://ik.imagekit.io/drigoalexander/list-check_NftA8X5f7.png?updatedAt=1688413220645"
              alt="icon"
              class="w-14"
            />
          </div>

          <div class="bg-white aspect-square rounded-xl p-6" v-if="idx === 1">
            <img
              src="https://ik.imagekit.io/drigoalexander/trophy_C5p8zAQek.png?updatedAt=1688413220868"
              alt="icon"
              class="w-32"
            />
          </div>

          <div class="bg-white aspect-square rounded-xl p-6" v-if="idx === 2">
            <img
              src="https://ik.imagekit.io/drigoalexander/mind-share_fSV5DZ8Lm.png?updatedAt=1688413220858"
              alt="icon"
              class="w-32"
            />
          </div>
          <div class="bg-white aspect-square rounded-xl p-6" v-if="idx === 3">
            <img
              src="https://ik.imagekit.io/drigoalexander/users-alt_KIcghXZsE.png?updatedAt=1688413220634"
              alt="icon"
              class="w-32"
            />
          </div>
          <div
            class="flex flex-col gap-2 justify-start items-start text-black tracking-wider pr-10"
          >
            <h2 class="text-2xl font-semibold">
              {{ el.title }}
            </h2>
            <p class="text-base text-[#7B7B7B]">
              {{ el.description }}
            </p>
          </div>
        </div>
      </div>
      <!-- End Second Card -->
    </div>
    <!-- Choose Package -->
    <div class="flex items-center justify-evenly gap-20">
      <div class="flex gap-10"></div>

      <div class="flex flex-col gap-6 items-start">
        <h4 class="text-base text-[#3258E8] font-semibold">Our Package</h4>
        <h2 class="text-5xl font-bold text-black">Popular Wedding Packages</h2>
        <p class="text-base text-[#7B7B7B] w-2/3 tracking-wide">
          If you're looking for the ultimate wedding experience, look no further
          than our popular wedding package.
        </p>
        <div class="flex gap-10 items-start">
          <div
            v-for="(el, idx) in data.weddingStats"
            :key="idx"
            class="flex flex-col gap-4 w-44"
          >
            <h1
              v-if="idx === 0 && dataPackage"
              class="text-black font-semibold text-2xl"
            >
              {{ dataPackage.data.length }} Variants
            </h1>
            <h1
              v-else-if="idx === 0 && !dataPackage"
              class="text-black font-semibold text-2xl"
            >
              None Variants
            </h1>
            <h1
              v-else-if="idx === 1 && dataOrder"
              class="text-black font-semibold text-2xl"
            >
              {{ dataOrder.data.length }} Valued
            </h1>
            <h1
              v-else-if="idx === 1 && dataOrder.length"
              class="text-black font-semibold text-2xl"
            >
              None People
            </h1>
            <h1
              v-else-if="idx === 2 && dataCrew"
              class="text-black font-semibold text-2xl"
            >
              {{
                dataCrew?.data.attributes.photographers.data.length +
                dataCrew?.data.attributes.venues.data.length +
                dataCrew?.data.attributes.master_ceremonies.data.length +
                dataCrew?.data.attributes.make_up_artists.data.length +
                dataCrew?.data.attributes.caterings.data.length
              }}
              Person
            </h1>
            <h1
              v-else-if="idx === 2 && !dataCrew"
              class="text-black font-semibold text-2xl"
            >
              None Person
            </h1>
            <p class="text-[#7B7B7B] font-regular text-base">
              {{ el.description }}
            </p>
          </div>
        </div>
        <div class="flex gap-6 items-start">
          <NuxtLink
            to="/package"
            class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
          >
            Choose Package
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- End Choose Package -->

    <!-- Schedule Calender -->
    <ClientOnly>
      <div class="flex flex-col gap-36 w-full" v-if="dataCal.data[0]">
        <div class="flex flex-col gap-3 text-center">
          <h2 class="text-black font-bold text-3xl">Our Schedule</h2>
          <p class="text-[#7B7B7B] font-medium text-base">
            Get to know our schedule for you to prepare
          </p>
        </div>

        <vue-cal
          style="height: 600px; color: #6b7280"
          :selected-date="dataCal.data[0].attributes.Date"
          :events="events"
          class="vuecal--blue-theme vuecal__event-time"
          active-view="week"
          :disable-views="['years', 'year', 'month']"
        />
      </div>

      <div v-else>
        <div class="alert animate-bounce my-10 bg-neutral-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="text-xl">We held no event right now!</span>
        </div>
      </div>
    </ClientOnly>

    <div class="flex w-full items-center justify-center flex-col gap-10">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
      >
        Keberkahan dalam Setiap Jepretan:
        <span
          class="underline underline-offset-3 decoration-8 decoration-blue-400"
          >Galeri Pesona</span
        >
      </h1>

      <div class="carousel w-full aspect-[21/9]">
        <div
          v-for="(el, idx) in data.Gallery.data"
          :id="idx + 1"
          class="carousel-item w-full aspect-video"
          :key="el.id"
        >
          <img :src="el.attributes.url" class="bg-fit mx-auto" />
          {{ el.id }}
        </div>
      </div>
      <div class="flex justify-center w-full py-2 gap-2">
        <a
          v-for="(el, idx) in data.Gallery.data"
          :key="el.id"
          :href="`#` + (Number(idx) + Number(1))"
          class="btn btn-xs"
          >{{ idx + 1 }}</a
        >
      </div>
    </div>
    <!-- End Schedule Calender -->
  </div>
</template>

<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

definePageMeta({ layout: "index", middleware: ["partner", "is-logged"] });
const config = useRuntimeConfig();
let data = ref({});
let image = ref({});
let errCode = ref();

const { data: dataCal } = useFetch(
  `${config.public.strapiEndpoint}/orders?populate=*&sort[0]=Date:asc`,
  {
    method: "GET",
  }
);

const { data: dataPackage, error: errorPackage } = await useFetch(
  `${config.public.strapiEndpoint}/packages?populate=*`
);
const { data: dataCrew, error: errorCrew } = await useFetch(
  `${config.public.strapiEndpoint}/identifiers/1?populate=*`
);
const { data: dataOrder, error: errorOrder } = await useFetch(
  `${config.public.strapiEndpoint}/orders?populate=*`
);
console.log(dataPackage.value);
console.log(dataOrder.value);
console.log(dataCrew.value);
const events = computed(() => {
  return dataCal.value.data.map((item) => {
    return {
      start: item.attributes.startEvent,
      end: item.attributes.endEvent,
      title: item.attributes.user.data.attributes.username + " wedding",
    };
  });
});
await $fetch(`${config.public.strapiEndpoint}/landing-page?populate=*`, {
  method: "get",
})
  .then((res) => {
    (data.value = res.data.attributes),
      (image.value = res.data.attributes.jumbotronImage.data.attributes);
    errCode = 0;
    console.log(errCode);
  })
  .catch((err) => (errCode = 1));
</script>

<style scoped>
.titleCard {
  font-size: calc(32px + ((100vw - 320px) / 680) * 1.5);
}

.vuecal--blue-theme .vuecal__menu {
  background-color: #3258e8 !important;
}
</style>
