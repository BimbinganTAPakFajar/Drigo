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
          class="col-span-1 flex items-start justify-center gap-10"
          v-for="(el, idx) in data.organizerStrength"
          :key="idx"
        >
          <div class="bg-white aspect-square rounded-xl p-6">
            <img :src="el.iconLink" alt="icon" />
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
      <div class="flex gap-10">
        <!-- <CardPackage
          v-for="(el, idx) in cardPackage"
          :key="idx"
          :package="el.package"
          :price="el.price"
        /> -->
      </div>

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
            <h1 class="text-black font-semibold text-2xl">
              {{ el.stats }}
            </h1>
            <p class="text-[#7B7B7B] font-regular text-base">
              {{ el.description }}
            </p>
          </div>
        </div>
        <div class="flex gap-6 items-start">
          <Button :type="1" buttonText="Choose Package" />
          <Button :type="2" buttonText="View More" />
        </div>
      </div>
    </div>
    <!-- End Choose Package -->

    <!-- Schedule Calender -->

    <div class="flex flex-col gap-36 w-full">
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

    <div class="flex w-full items-center justify-center flex-col gap-10">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Keberkahan dalam Setiap Jepretan:
        <span
          class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"
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

    <!-- Advertisement -->
    <!-- <div
      class="w-full rounded-tl-[5rem] rounded-xl flex items-center justify-center relative bg-[#3258E8]/10"
    >
      <div
        class="absolute z-10 -top-8 -right-8 w-20 flex items-center justify-center aspect-square bg-white rounded-full shadow-2xl"
      >
        <img src="/assets/love.svg" alt="Love Icon" />
      </div>

      <div
        class="flex flex-col gap-4 absolute z-10 left-8 -bottom-8 bg-white rounded-xl py-4 pl-4 pr-6 shadow-xl"
      >
        <p class="text-sm font-semibold text-black">
          Thank you for helping <br />
          my Wedding. Amazing!
        </p>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square overflow-hidden rounded-full">
            <img src="/assets/albert.jpg" alt="Profile Picture" />
          </div>
          <div class="flex flex-col gap-[1px]">
            <h2 class="text-sm font-semibold text-black">Drigo Alexander</h2>
            <p class="text-xs font-light text-black">Happy Customer</p>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-6 items-center justify-center text-center w-full py-20 overflow-hidden relative"
      >
        <img
          class="w-full absolute top-0 left-0 z-0"
          src="/assets/world.svg"
          alt="Background"
        />
        <h4 class="z-10 relative text-base font-semibold text-[#3258E8]">
          Believe your wedding to us
        </h4>
        <h2 class="z-10 relative text-4xl font-semibold text-black">
          Dont Miss The 50% Discount <br />
          If You Book Your First Appointment
        </h2>
        <p
          class="z-10 relative text-base font-normal text-black whitespace-pre-line"
        >
          Let's maximize your wedding and <br />
          make the memories that never forgotten
        </p>
        <Button :type="1" class="z-10 relative" buttonText="Book now" />
      </div>
    </div> -->
    <!-- End Advertisement -->
  </div>
</template>

<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

definePageMeta({ layout: "index", middleware: ["partner", "is-logged"] });
const config = useRuntimeConfig();
const token = useCookie("token");
const role = useCookie("role");
const id = useCookie("id");
let data = ref({});
let image = ref({});
let errCode = ref();

const { data: dataCal } = useFetch(
  `${config.public.strapiEndpoint}/orders?populate=*&sort[0]=Date:asc`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }
);
console.log(dataCal.value);
const events = computed(() => {
  return dataCal.value.data.map((item) => {
    return {
      start: item.attributes.startEvent, // assuming these keys exist in the `attributes` object
      end: item.attributes.endEvent,
      title: item.attributes.user?.data?.attributes.username + " wedding",
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

if (token.value) {
  const user = await $fetch(
    `${config.public.strapiEndpoint}/users/me?populate=*`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token.value,
      },
    }
  );

  id.value = user.id;
  if (!role.value) {
    role.value = user.identifier.id;
  }
}

const cardPackage = [
  {
    package: "Outdoor Package",
    price: "50 Million",
    buffet: "20 Menus",
    crew: "15 Person",
    capacityVenue: "135K+",
  },
  {
    package: "Vintage Package",
    price: "20 Million",
    buffet: "10 Menus",
    crew: "7 Person",
    capacityVenue: "60K+",
  },
];
</script>

<style scoped>
.titleCard {
  font-size: calc(32px + ((100vw - 320px) / 680) * 1.5);
}

.vuecal--blue-theme .vuecal__menu {
  background-color: #3258e8 !important;
}
</style>
