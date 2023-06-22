<template>
  <div
    class="justify-center flex items-center flex-col gap-32 max-w-screen-lg w-[50%] mx-auto py-20"
  >
    <!-- Stats Crew-->
    <!-- {{ Crew }} -->
    <div
      v-if="openCrew === true"
      class="fixed hidden lg:flex flex-col text-black left-[5%] top-1/2 -translate-y-1/2 gap-10 text-justify"
    >
      <div class="flex flex-col gap-2 w-64" v-if="Order.data.length > 0">
        <h2 class="text-xl font-semibold">
          {{ Order.data.length }} unique visions
        </h2>
        <p class="text-[#666666] text-base font-light">
          of our clients through our bespoke projects
        </p>
      </div>
      <div class="flex flex-col gap-2 w-64">
        <h2 class="text-xl font-semibold">
          {{
            Crew?.data.attributes.photographers.data.length +
            Crew?.data.attributes.venues.data.length +
            Crew?.data.attributes.master_ceremonies.data.length +
            Crew?.data.attributes.make_up_artists.data.length +
            Crew?.data.attributes.caterings.data.length
          }}
          gifted individuals
        </h2>
        <p class="text-[#666666] text-base font-light">
          who are dedicated to crafting a wedding that is nothing short of
          extraordinary
        </p>
      </div>
      <div
        @click="openCrew = false"
        class="cursor-pointer flex gap-6 group items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>

        <p class="group-hover:-ml-2 duration-300 ease-in-out">Close</p>
      </div>
    </div>
    <!-- End Stats Crew-->
    <!-- Button Crew -->
    <div
      @click="openCrew = true"
      v-if="openCrew === false"
      class="fixed flex flex-col text-black left-[7%] bottom-1/3 gap-10 text-justify"
    >
      <Button :type="3" buttonText="Our Statistic" />
    </div>
    <!-- End Button Crew -->
    <div class="flex flex-col group text-6xl font-bold uppercase">
      <h1 class="group-hover:text-[#666666] duration-500 ease-in-out">
        Creating
      </h1>
      <h1>Unforgettable</h1>
      <h1 class="group-hover:text-[#725AE4] duration-500 ease-in-out">
        Wedding Experiences
      </h1>
    </div>

    <div class="w-full h-[1px] bg-[#666666] rounded-full"></div>

    <div class="flex flex-col gap-10 w-full items-start">
      <article
        class="prose prose-xl text-justify tracking-wider leading-loose font-medium"
      >
        <h2 class="text-[#666666] font-semibold text-xl self-start">
          {{ data?.data.attributes.aboutTitle }}
        </h2>

        <Markdown :source="data?.data.attributes.aboutDesc" />
      </article>
    </div>
    <!-- Timeline -->
    <div class="flex flex-col gap-10">
      <div
        class="items-start flex w-full flex-col gap-6"
        v-for="(el, idx) in data?.data.attributes.history"
        :key="idx"
      >
        <h2 class="text-3xl font-semibold text-[#725AE4] tracking-wider">
          {{ el.year }}
        </h2>
        <h4
          class="text-2xl font-semibold text-[#666666] flex gap-4 items-center"
        >
          {{ el.title }}
        </h4>
        <p class="text-black text-lg font-medium text-justify">
          {{ el.description }}
        </p>
        <p class="text-black">{{ el.length }}</p>
        <div
          class="w-full items-start justify-start"
          v-if="idx !== data.data.attributes.history.length - 1"
        >
          <div
            class="h-20 w-[2px] relative bg-[#725AE4] justify-start flex items-start"
          >
            <div
              class="absolute bg-[#725AE4] rounded-full w-3 aspect-square -top-2 left-1/2 -translate-x-1/2"
            ></div>
            <div
              class="absolute bg-[#725AE4] rounded-full w-3 aspect-square -bottom-2 left-1/2 -translate-x-1/2"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Timeline -->
    <!-- Crew -->
    <div class="flex flex-col items-center justify-center gap-10 w-full">
      <h1 class="text-5xl font-semibold text-black">Meet The Team</h1>
      <p class="w-1/2 text-[#666666] font-semibold text-base text-center">
        We've been searching all over the place to bring the best team to serve
        you on your wedding, meet them
      </p>

      <ArrowTrendingDownIcon class="w-12 aspect-square animate-bounce" />
      <div class="w-full flex flex-col gap-36 justify-start items-start">
        <div class="flex flex-col gap-10 w-full">
          <h1 class="text-2xl font-bold tracking-wider">Photographer</h1>
          <div class="w-full h-[1px] bg-black"></div>
          <div
            v-if="Crew?.data.attributes.photographers.data.length > 0"
            class="flex flex-wrap gap-20 items-center justify-between w-fit"
          >
            <div
              class="tooltip"
              :data-tip="`Click to see ${el.attributes.name} work`"
              v-for="el in Crew?.data.attributes.photographers.data"
              :key="el.id"
            >
              <NuxtLink
                target="_blank"
                :to="`${el.attributes.portofolioLink}`"
                class="text-xl font-bold cursor-pointer hover:text-gradient-pink/50 ease-in-out duration-300"
              >
                {{ el.attributes.name }}
              </NuxtLink>
            </div>
          </div>
          <div
            class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
            v-else
          >
            There's no photographer that we have right now2.
          </div>
        </div>

        <div class="flex flex-col gap-10 w-full">
          <h1 class="text-2xl font-bold tracking-wider">Make Up Artist</h1>
          <div class="w-full h-[1px] bg-black"></div>
          <div
            v-if="Crew?.data?.attributes.make_up_artists.data.length > 0"
            class="flex flex-wrap gap-20 items-center justify-between w-fit"
          >
            <div
              class="tooltip"
              :data-tip="`Click to see ${el.attributes.name} work`"
              v-for="el in Crew?.data.attributes.make_up_artists.data"
              :key="el.id"
            >
              <NuxtLink
                target="_blank"
                :to="`${el.attributes.portofolioLink}`"
                class="text-xl font-bold cursor-pointer hover:text-gradient-pink/50 ease-in-out duration-300"
              >
                {{ el.attributes.name }}
              </NuxtLink>
            </div>
          </div>
          <div
            class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
            v-else
          >
            There's no Make Up Artist that we have right now.
          </div>
        </div>

        <div class="flex flex-col gap-10 w-full">
          <h1 class="text-2xl font-bold tracking-wider">
            Master of Ceremonies
          </h1>
          <div class="w-full h-[1px] bg-black"></div>
          <div
            v-if="Crew?.data?.attributes.master_ceremonies.data.length > 0"
            class="flex flex-wrap gap-20 items-center justify-between w-fit"
          >
            <div
              v-for="el in Crew?.data.attributes.master_ceremonies.data"
              :key="el.id"
            >
              <h1
                class="text-xl font-bold cursor-pointer hover:text-gradient-pink/50 ease-in-out duration-300"
              >
                {{ el.attributes.Name }}
              </h1>
            </div>
          </div>
          <div
            class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
            v-else
          >
            There's no Master of Ceremonies that we have right now.
          </div>
        </div>

        <div class="flex flex-col gap-10 w-full">
          <h1 class="text-2xl font-bold tracking-wider">Caterings</h1>
          <div class="w-full h-[1px] bg-black"></div>
          <div
            v-if="Crew?.data?.attributes.caterings.data.length > 0"
            class="flex flex-wrap gap-20 items-center justify-between w-fit"
          >
            <div
              v-for="el in Crew?.data.attributes.caterings.data"
              :key="el.id"
            >
              <h1
                class="text-xl font-bold cursor-pointer hover:text-gradient-pink/50 ease-in-out duration-300"
              >
                {{ el.attributes.name }}
              </h1>
            </div>
          </div>
          <div
            class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
            v-else
          >
            There's no Caterings that we have right now.
          </div>
        </div>

        <div class="flex flex-col gap-10 w-full">
          <h1 class="text-2xl font-bold tracking-wider">Venue</h1>
          <div class="w-full h-[1px] bg-black"></div>
          <div
            v-if="Crew?.data?.attributes.venues.data.length > 0"
            class="flex flex-wrap gap-20 items-center justify-between w-fit"
          >
            <div
              class="tooltip"
              :data-tip="`Click to see ${el.attributes.venueName} venue`"
              v-for="el in Crew?.data.attributes.venues.data"
              :key="el.id"
            >
              <NuxtLink
                target="_blank"
                :to="`${el.attributes.venueLink}`"
                class="text-xl font-bold cursor-pointer hover:text-gradient-pink/50 ease-in-out duration-300"
              >
                {{ el.attributes.venueName }}
              </NuxtLink>
            </div>
          </div>
          <div
            class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
            v-else
          >
            There's no Venue that we have right now.
          </div>
        </div>
      </div>
    </div>

    <!-- End Crew -->
  </div>
</template>

<script setup>
import { ArrowTrendingDownIcon } from "@heroicons/vue/24/outline";
definePageMeta({
  layout: "index",
  middleware: ["is-logged"],
});
const config = useRuntimeConfig();
const openCrew = ref(false);
import Markdown from "vue3-markdown-it";
definePageMeta({ layout: "partner" });

const { data, error } = useLazyFetch(
  `${config.public.strapiEndpoint}/about-us?populate=*`,
  {
    method: "GET",
  }
);

const { data: Crew, error: errorCrew } = useLazyFetch(
  `${config.public.strapiEndpoint}/identifiers/1?populate=*`,
  {
    method: "GET",
  }
);
console.log(Crew.value);
const { data: Order, error: errorOrder } = useLazyFetch(
  `${config.public.strapiEndpoint}/orders?populate=*`
);
</script>
