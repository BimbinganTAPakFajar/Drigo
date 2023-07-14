<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { ArrowSmallRightIcon, PlayIcon } from "@heroicons/vue/24/outline";
import * as V from "v-calendar";

import "v-calendar/style.css";
definePageMeta({
  layout: "index",
  middleware: ["partner", "is-logged", "auth"],
});

const route = useRoute();
const config = useRuntimeConfig();
const token = useCookie("token");
const id = useCookie("id");
const today = ref(new Date());
const minDate = today.value.setMonth(today.value.getMonth() + 9);
const maxDate = new Date().setMonth(new Date().getMonth() + 11);

useHead({
  script: [
    {
      type: "text/javascript",
      src: "https://app.midtrans.com/snap/snap.js",
      "data-client-key": config.public.midtransClientKey,
    },
  ],
});

// Date formater for event handling in calendar

function formatedDate(date, hoursToAdd = 0) {
  let eventDate = new Date(today.value);
  eventDate.setHours(eventDate.getHours() + hoursToAdd);

  let year = eventDate.getFullYear();
  let month = eventDate.getMonth() + 1; // getMonth() is zero-based
  let day = eventDate.getDate();
  let hours = eventDate.getHours();
  let minutes = eventDate.getMinutes();

  // Pad single digit month, day, hours and minutes with a leading zero
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const formattedStart = computed(() => {
  return formatedDate(today.value);
});

const formattedEnd = computed(() => {
  return formatedDate(today.value, 6);
});
// End Date formater for event handling in calendar
// Available Options
let availablePhotographers = ref(null);
let availableBand = ref(null);
let availableVenue = ref(null);
let availableCaterings = ref(null);
let availableMC = ref(null);
let availableMUA = ref(null);
// End Available Options

let modalOpen = ref(false);
let themeName = ref();
let themeArray = ref();
let showMUA = ref(true);
let packageDetail = ref();
let venue = ref();
let photographer = ref();
let catering = ref();
let band = ref();
let venueIndex = ref(0);
let photographerIndex = ref(0);
let bandIndex = ref(0);
let cateringIndex = ref(0);
let MUAIndex = ref(0);
let arrayMUA = ref([]);
let arrayPhotographer = ref([]);
let arrayBand = ref([]);
let arrayCatering = ref([]);
let arrayVenue = ref([]);
let packageID = ref();
const basePrice = ref();
let loading = ref(false);

// Form Submition
let formSubmitPackage = ref({
  photographer: 0,
  venue: "",
  caterings: "",
  decoration_vendors: 0,
  make_up_artists: [],
  descriptionPackage: "",
  category: 0,
  price: 0,
  master_ceremonies: [],
  band: 0,
});

let muaSubmitOrder = ref();

// Remove MUA

function removeMUA() {
  showMUA.value = false;
  muaSubmitOrder.value = null;
}

// Get Venue , Photographer , Catering Index , MUA
function getVenueIndex(idx) {
  venueIndex.value = idx;
}
function getPhotographerIndex(idx) {
  photographerIndex.value = idx;
}

function getBandIndex(idx) {
  bandIndex.value = idx;
}

function getCateringIndex(idx) {
  cateringIndex.value = idx;
}
function getMUAIndex(idx) {
  MUAIndex.value = idx;
}

// Fetch Data
await $fetch(
  `${config.public.strapiEndpoint}/packages?filters[slug]=${route.params.slug}&populate=*`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }
).then((res) => {
  packageID.value = res.data[0].id;
  packageDetail.value = res;
  basePrice.value = res.data[0].attributes.basePrice;
  formSubmitPackage.value.make_up_artists =
    res.data[0].attributes.make_up_artists.data;
  arrayMUA.value = res.data[0].attributes.make_up_artists.data.map(
    (el) => el.id
  );

  arrayPhotographer.value.push(res.data[0].attributes.photographer.data.id);
  arrayCatering.value.push(res.data[0].attributes.catering.data.id);
  arrayVenue.value.push(res.data[0].attributes.venue.data.id);
  arrayBand.value.push(res.data[0].attributes.band.data.id);

  formSubmitPackage.value.master_ceremonies =
    res.data[0].attributes.master_ceremonies.data.map((el) => el.id);
  formSubmitPackage.value.photographer =
    res.data[0].attributes.photographer.data;
  formSubmitPackage.value.caterings = res.data[0].attributes.catering.data;
  formSubmitPackage.value.venue = res.data[0].attributes.venue.data;
  formSubmitPackage.value.band = res.data[0].attributes.band.data;
});

let decorationVendor = ref();

await $fetch(`${config.public.strapiEndpoint}/decoration-vendors`, {
  headers: {
    Authorization: "Bearer " + token,
  },
}).then((res) => {
  console.log(res);

  (decorationVendor.value = res),
    (themeArray.value = res.data.map((el) => el.attributes.theme));

  themeName.value = res.data[0].attributes.theme;
  console.log(themeArray.value);
});

await $fetch(`${config.public.strapiEndpoint}/venues?populate=*`, {
  headers: {
    Authorization: "Bearer " + token,
  },
}).then((res) => (venue.value = res.data));

await $fetch(`${config.public.strapiEndpoint}/photographers?populate=*`, {
  headers: {
    Authorization: "Bearer " + token,
  },
}).then((res) => (photographer.value = res.data));

const {
  data: MUA,
  pending,
  error,
} = await useFetch(
  `${config.public.strapiEndpoint}/make-up-artists?populate=*`,
  {
    headers: {
      Authorization: "Bearer " + token,
    },
  }
);

await $fetch(`${config.public.strapiEndpoint}/caterings?populate=*`, {
  headers: {
    Authorization: "Bearer " + token,
  },
}).then((res) => (catering.value = res.data));

const { data: dataBand } = await useFetch(
  `${config.public.strapiEndpoint}/bands?populate=*`
);
// Get Theme Price

const themePrice = computed(() => {
  return decorationVendor.value.data.filter(
    (el) => el.attributes.theme == themeName.value
  );
});

// get default photographer of package
const defaultPhotographer = computed(() => {
  const photographerIds = photographer.value.map((el) => el.id);
  const photographers = Array.isArray(formSubmitPackage.value.photographer)
    ? formSubmitPackage.value.photographer
    : [formSubmitPackage.value.photographer];

  return photographers.filter((el) => photographerIds.includes(el.id));
});

const defaultBand = computed(() => {
  const bandIDs = dataBand.value.data.map((el) => el.id);
  const bands = Array.isArray(formSubmitPackage.value.band)
    ? formSubmitPackage.value.band
    : [formSubmitPackage.value.band];

  return bands.filter((el) => bandIDs.includes(el.id));
});

// get default catering of package
const defaultCatering = computed(() => {
  const cateringIds = catering.value.map((el) => el.id);
  const cateringsArray = Array.isArray(formSubmitPackage.value.caterings)
    ? formSubmitPackage.value.caterings
    : [formSubmitPackage.value.caterings];

  return cateringsArray.filter((el) => cateringIds.includes(el.id));
});

// Total Price

// End Total Price

// Add to MUA Array
function addToArray(id) {
  if (arrayMUA.value.includes(id)) {
    arrayMUA.value = arrayMUA.value.filter((selectedId) => selectedId !== id);
  } else {
    arrayMUA.value.push(id);
  }
}

// End add to MUA Array

// Get Available

function availPhotographer() {
  let dateString = today.value.toISOString().split("T")[0].split("-").join("-");

  const filteredPhotographers = photographer.value.filter((photographer) => {
    for (let i = 0; i < photographer.attributes.orders.data.length; i++) {
      const order = photographer.attributes.orders.data[i];

      if (
        order &&
        order.attributes.Date &&
        order.attributes.Date.includes(dateString)
      ) {
        return false;
      }
    }
    return true;
  });

  availablePhotographers.value = filteredPhotographers;
}

function availMUA() {
  let dateString = today.value.toISOString().split("T")[0].split("-").join("-");

  const filteredMUA = MUA.value.data.filter((MUA) => {
    for (let i = 0; i < MUA.attributes.orders.data.length; i++) {
      const order = MUA.attributes.orders.data[i];

      if (
        order &&
        order.attributes.Date &&
        order.attributes.Date.includes(dateString)
      ) {
        return false;
      }
    }
    return true;
  });

  availableMUA.value = filteredMUA;
}
function availVenue() {
  let dateString = today.value.toISOString().split("T")[0].split("-").join("-");

  const filteredVenue = venue.value.filter((venue) => {
    for (let i = 0; i < venue.attributes.orders.data.length; i++) {
      const order = venue.attributes.orders.data[i];

      if (
        order &&
        order.attributes.Date &&
        order.attributes.Date.includes(dateString)
      ) {
        return false;
      }
    }
    return true;
  });

  availableVenue.value = filteredVenue;
}
function availCatering() {
  let dateString = today.value.toISOString().split("T")[0].split("-").join("-");
  const filteredCatering = catering.value.filter((catering) => {
    for (let i = 0; i < catering.attributes.orders.data.length; i++) {
      const order = catering.attributes.orders.data[i];

      if (
        order &&
        order.attributes.Date &&
        order.attributes.Date.includes(dateString)
      ) {
        return false;
      }
    }
    return true;
  });

  availableCaterings.value = filteredCatering;
}

function availBand() {
  let dateString = today.value.toISOString().split("T")[0].split("-").join("-");
  const filteredBand = dataBand.value.data.filter((band) => {
    for (let i = 0; i < band.attributes.orders.data.length; i++) {
      const order = band.attributes.orders.data[i];

      if (
        order &&
        order.attributes.Date &&
        order.attributes.Date.includes(dateString)
      ) {
        return false;
      }
    }
    return true;
  });

  availableBand.value = filteredBand;
}
// End Get Available

// Run at initial

availBand();
availMUA();
availPhotographer();
availCatering();
availVenue();

watch(
  () => today.value,
  () => {
    availPhotographer();
    availCatering();
    availVenue();
    availMUA();
  }
);

const totalPrice = computed(() => {
  if (showMUA.value) {
    let mcArray = packageDetail.value.data[0].attributes.master_ceremonies.data;
    let muaArray = availableMUA.value.filter((el) => {
      return arrayMUA.value.includes(el.id);
    });
    let bandArray = availableBand.value.filter((el) => {
      return arrayBand.value.includes(el.id);
    });
    let photoArray = availablePhotographers.value.filter((el) => {
      return arrayPhotographer.value.includes(el.id);
    });
    let cateringArray = availableCaterings.value.filter((el) => {
      return arrayCatering.value.includes(el.id);
    });
    let venueArray = availableVenue.value.filter((el) => {
      return arrayVenue.value.includes(el.id);
    });
    let totalCateringPrice = cateringArray[0]?.attributes?.food.reduce(
      (acc, element) => {
        return acc + element.price * element.stok;
      },
      0
    );

    let totalMcPrice = mcArray.reduce((acc, element) => {
      return acc + element.attributes.price;
    }, 0);

    let totalMUA = muaArray.reduce((acc, element) => {
      return acc + element.attributes.price;
    }, 0);

    return (
      Number(basePrice.value) +
      Number(totalMcPrice) +
      Number(bandArray[0].attributes.Price) +
      Number(themePrice.value[0]?.attributes?.price) +
      Number(photoArray[0].attributes.price) +
      Number(venueArray[0].attributes.price) +
      Number(totalCateringPrice) +
      Number(totalMUA)
    );
  } else {
    let mcArray = packageDetail.value.data[0].attributes.master_ceremonies.data;
    let photoArray = availablePhotographers.value.filter((el) => {
      return arrayPhotographer.value.includes(el.id);
    });

    let bandArray = availableBand.value.filter((el) => {
      return arrayBand.value.includes(el.id);
    });
    let cateringArray = availableCaterings.value.filter((el) => {
      return arrayCatering.value.includes(el.id);
    });
    let venueArray = availableVenue.value.filter((el) => {
      return arrayVenue.value.includes(el.id);
    });
    let totalCateringPrice = cateringArray[0].attributes.food.reduce(
      (acc, element) => {
        return acc + element.price * element.stok;
      },
      0
    );
    let totalMcPrice = mcArray.reduce((acc, element) => {
      return acc + element.attributes.price;
    }, 0);

    return Number(
      Number(basePrice.value) +
        Number(totalMcPrice) +
        Number(themePrice.value[0]?.attributes?.Price) +
        Number(bandArray[0].attributes.price) +
        Number(photoArray[0].attributes.price) +
        Number(venueArray[0].attributes.price) +
        Number(totalCateringPrice)
    );
  }
});

// Submit Order
function submitOrder() {
  loading.value = true;
  const { data: submitResponseData, pending: pendingSubmitData } = useLazyFetch(
    `${config.public.strapiEndpoint}/orders?populate=*`,

    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      body: {
        data: {
          package: {
            id: packageID.value,
          },
          make_up_artists: {
            connect: arrayMUA.value,
          },
          photographers: {
            id: arrayPhotographer.value[0],
          },
          caterings: {
            id: arrayCatering.value[0],
          },
          venue: {
            id: arrayVenue.value[0],
          },
          master_ceremonies: {
            connect: formSubmitPackage.value.master_ceremonies,
          },
          bands: {
            id: arrayBand.value[0],
          },
          decoration_vendor: {
            id: themePrice.value[0].id,co
          },
          totalPrice: totalPrice.value,
          startEvent: formattedStart.value,
          endEvent: formattedEnd.value,
          Date: today.value.toISOString().split("T")[0].split("-").join("-"),
          user: {
            id: id.value,
          },
        },
      },
    }
  ).then((res) => {
    console.log(res.data);
    const id = res.data.value.data.id;
    console.log(res.data.value.data.attributes);
    useFetch("/api/midtrans", {
      method: "POST",
      body: {
        transaction_details: {
          order_id: res.data.value.data.attributes.uuid,
          gross_amount: res.data.value.data.attributes.totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name:
            res.data.value.data.attributes.user.data.attributes.username,
          email: res.data.value.data.attributes.user.data.attributes.email,
          phone:
            res.data.value.data.attributes.user.data.attributes.phoneNumber,
        },
      },
    }).then((res) => {
      console.log(res);
      window.snap.pay(res.data.value.data.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          useFetch(`${config.public.strapiEndpoint}/orders/${id}?populate=*`, {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token.value,
            },
            body: {
              data: {
                payStatus: result.transaction_status,
              },
            },
          }).then(navigateTo("/profile"));
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          useFetch(`${config.public.strapiEndpoint}/orders/${id}?populate=*`, {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token.value,
            },
            body: {
              data: {
                payStatus: "pending",
              },
            },
          }).then(navigateTo("/profile"));
        },
        onError: function (result) {
          useFetch(`${config.public.strapiEndpoint}/orders/${id}?populate=*`, {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token.value,
            },
            body: {
              data: {
                payStatus: result.transaction_status,
              },
            },
          }).then(navigateTo("/profile"));
          console.log(result);
        },
        onClose: function (result) {
          /* You may add your own implementation here */
          useFetch(`${config.public.strapiEndpoint}/orders/${id}?populate=*`, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }).then((loading.value = false));
          alert("you closed the popup without finishing the payment");
          console.log(result);
        },
      });
    });
  });

  return {
    submitResponseData,
    pendingSubmitData,
  };
}

// End Submit Order
</script>

<template>
  <div class="flex flex-col w-full gap-16 py-20">
    <!-- Modal -->
    <div
      v-if="
        availableCaterings.length > 0 &&
        availableVenue.length > 0 &&
        availablePhotographers.length > 0
      "
      @click="modalOpen = !modalOpen"
      :class="{
        'w-14': !modalOpen,
        'opacity-0': !modalOpen,
        'opacity-100': modalOpen,

        'scale-[0.5]': !modalOpen,
        'scale-[2]': modalOpen,
        'w-full': modalOpen,
        'h-screen': modalOpen,
        'z-20': modalOpen,
      }"
      class="aspect-square rounded-full right-[5%] bottom-[5%] fixed bg-gradient-to-br from-rose-400 to-violet-300 ease-in-out duration-700"
    ></div>

    <div
      v-if="
        availableCaterings.length > 0 &&
        availableVenue.length > 0 &&
        availablePhotographers.length > 0
      "
      @click="modalOpen = !modalOpen"
      :class="{
        'bg-rose-400': !modalOpen,
      }"
      class="cursor-pointer right-[5%] bottom-[5%] px-4 py-2 fixed rounded-lg font-semibold z-30"
    >
      <Transition>
        <span v-if="!modalOpen">Total price</span>

        <span v-else>Click anywhere to close</span>
      </Transition>
    </div>

    <Transition>
      <div
        class="z-30 fixed left-1/4 top-1/4 flex flex-col gap-14 max-w-fit min-w-fit"
        v-if="modalOpen"
      >
        <div
          v-if="loading === true"
          class="fixed left-0 top-0 w-full h-screen bg-black/50 flex items-center justify-center"
        >
          <span class="relative inline-flex">
            <div
              class="cursor-wait inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-slate-800 transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20"
            >
              Wait for payment
            </div>
            <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"
              ></span>
            </span>
          </span>
        </div>
        <h1 class="text-4xl font-semibold w-fit">Total Price</h1>
        <span class="text-7xl font-bold w-fit"
          >{{
            Intl.NumberFormat("id-ID", {
              style: "currency",
              notation: "standard",
              currency: "IDR",
            }).format(totalPrice)
          }}
        </span>
        <span class="w-1/3 text-xl text-gray-700"
          >Click the button bellow to continue payment or continue customize
          your package by closing this tab</span
        >
        <div class="flex gap-6 flex-row items-center">
          <NuxtLink
            @click="submitOrder"
            class="flex items-start border-[1px] border-gray-700 rounded-lg w-fit px-3 py-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
            >Pay now!</NuxtLink
          >
        </div>
      </div>
    </Transition>
    <!-- Closed Modal -->

    <div class="flex items-center w-full relative">
      <div class="flex flex-col gap-6 w-1/2 z-10">
        <h1 class="font-bold text-7xl tracking-wide">
          {{ packageDetail.data[0].attributes.packageName }}
        </h1>
        <h3 class="text-3xl font-light text-slate-400 leading-loose">
          {{ packageDetail.data[0].attributes.descriptionPackage }}
        </h3>
      </div>

      <div class="z-0 absolute right-1/4 opacity-50 top-0">
        <img
          v-if="
            packageDetail.data[0]?.attributes.category?.data.attributes
              .weddingCategory === 'Outdoor'
          "
          src="@/public/assets/test.png"
          alt="Gate in Hakone, Japan"
          class="animate-pulse scale-125"
        />
        <img
          v-else
          src="@/public/assets/test2.png"
          alt="Gate in Hakone, Japan"
          class="animate-pulse w-2/3 translate-x-1/2 -translate-y-1/4"
        />
      </div>
    </div>

    <div class="flex flex-col gap-52 w-full pt-64 z-10">
      <div class="flex w-full items-start justify-between gap-20 py-20">
        <V.DatePicker
          style="width: 70%"
          v-model="today"
          :min-date="minDate"
          :max-date="maxDate"
          mode="dateTime"
          is24hr
          hide-time-header
        />
        <div class="flex flex-col gap-6 w-[50%]">
          <h1 class="text-xl font-normal">
            Choose your wedding
            <strong class="font-bold underline"> date </strong> and
            <strong class="font-bold underline"> hours </strong> before continue
            to next stem
          </h1>
          <span class="text-gray-500 text-lg font-normal text-justify"
            >To ensure the best possible quality and experience, we recommend
            booking your reservation
            <span class="font-bold text-black underline"
              >at least 9 months</span
            >
            in advance and
            <span class="font-bold text-black underline"
              >no later than 12 months</span
            >
            prior to your desired date.</span
          >

          <div class="flex gap-4 items-center w-full font-semibold">
            Your Date :
            <span class="">
              {{
                new Intl.DateTimeFormat("id", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  timeZoneName: "short",
                }).format(today)
              }}
            </span>
          </div>
        </div>
      </div>
      <Transition>
        <div
          class="flex flex-col gap-52 w-full z-10"
          v-if="
            availableCaterings.length > 0 &&
            availableVenue.length > 0 &&
            availablePhotographers.length > 0
          "
        >
          <!-- Section 1 -->

          <div
            class="flex flex-col lg:flex-row items-start gap-32 lg:gap-6 w-full justify-between"
          >
            <!-- Category -->
            <div
              class="flex flex-col gap-4 justify-start w-full lg:w-1/4 group"
            >
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Category
                </h1>
                <div class="flex gap-10">
                  <span class="text-sm text-slate-400">Not customizeable</span>
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>
              <div
                class="text-2xl flex gap-6 font-semibold justify-between items-center"
              >
                <PlayIcon class="w-6 stroke-gradient-pink/50" />
                {{
                  packageDetail.data[0].attributes.category.data.attributes
                    .weddingCategory
                }}
                Wedding
              </div>
            </div>
            <!-- Base Price -->
            <div
              class="flex flex-col gap-4 justify-start w-full lg:w-1/2 group"
            >
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Base Price
                </h1>
                <div class="flex gap-10">
                  <span class="text-sm text-slate-400">Not customizeable</span>
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>
              <div class="text-2xl flex gap-6 font-semibold items-center">
                <PlayIcon class="w-6 stroke-gradient-pink/50" />
                <span class="text-4xl font-bold">
                  {{
                    Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(10000000)
                  }}
                </span>
              </div>
            </div>
          </div>
          <Transition>
            <div
              class="flex flex-col gap-4 justify-start w-full group"
              v-if="showMUA"
            >
              <div class="flex flex-col gap-4 justify-start w-full group">
                <div class="flex justify-between items-center">
                  <h1 class="font-semibold text-xl flex items-center gap-44">
                    Make Up Artist
                  </h1>
                  <div class="flex gap-10">
                    <ArrowSmallRightIcon
                      class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                    />
                  </div>
                </div>
                <div class="h-[1px] w-full bg-slate-700"></div>
                <div
                  class="flex gap-10 w-full pt-14"
                  v-if="availableMUA.length > 0"
                >
                  <div class="flex flex-col gap-6 flex-grow w-1/4">
                    <div class="w-full text-xl font-bold">
                      Choose your make up artist by check the box below
                    </div>
                    <ul
                      class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <li
                        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                        v-for="el in availableMUA"
                        :key="el.id"
                      >
                        <div class="flex items-center pl-3">
                          <input
                            id="vue-checkbox"
                            type="checkbox"
                            @click="addToArray(el.id)"
                            :checked="arrayMUA.includes(el.id)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for="vue-checkbox"
                            class="flex flex-col gap-1 w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >{{ el.attributes.name }}
                            <span
                              class="text-gray-500 font-light"
                              v-if="
                                formSubmitPackage.make_up_artists
                                  .map((mua) => mua.id)
                                  .includes(el.id)
                              "
                              >Package Default</span
                            >
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="w-[1px] min-h-full bg-black"></div>
                  <div class="flex flex-col gap-6 w-3/4">
                    <div class="flex flex-col gap-6">
                      <span class="font-bold text-xl"
                        >See the make up artist's works by clicking their name
                        below
                      </span>
                      <ul class="flex gap-14 flex-row capitalize">
                        <li
                          v-for="(el, idx) in availableMUA"
                          :key="idx"
                          :class="{
                            'text-gradient-pink': idx === MUAIndex,
                          }"
                          class="cursor-pointer duration-300 ease-in-out capitalize"
                          @click="getMUAIndex(idx)"
                        >
                          {{ el.attributes.name }}
                        </li>
                      </ul>
                    </div>

                    <div class="w-full h-[1px] bg-black"></div>
                    <div class="flex w-full gap-14">
                      <div class="flex flex-col gap-10 w-full">
                        <div
                          class="w-full text-6xl font-bold capitalize flex flex-col"
                        >
                          {{ availableMUA[MUAIndex].attributes.name }}
                        </div>
                        <div class="flex flex-col gap-10 w-full">
                          <div class="flex flex-col gap-4">
                            <h6 class="text-gray-600 text-xl font-semibold">
                              What will you get when you hire
                              {{ availableMUA[MUAIndex].attributes.name }}
                            </h6>

                            <p class="text-gray-500 text-lg text-justify">
                              {{
                                availableMUA[MUAIndex].attributes
                                  .serviceProvided
                              }}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        class="flex flex-col gap-10 justify-between w-full flex-grow"
                      >
                        <div class="flex flex-col gap-4">
                          <h6 class="text-gray-600 font-semibold text-2xl">
                            Price?
                          </h6>

                          <p
                            class="py-2 text-justify text-5xl font-bold bg-gradient-to-tr from-gradient-pink/50 text-transparent bg-clip-text to-gradient-blue/50"
                          >
                            {{
                              Intl.NumberFormat("id", {
                                style: "currency",
                                currency: "IDR",
                              }).format(availableMUA[MUAIndex].attributes.price)
                            }}
                          </p>
                        </div>

                        <NuxtLink
                          :to="availableMUA[MUAIndex].attributes.portofolioLink"
                          target="_blank"
                        >
                          <button
                            class="bg-gradient-to-tr from-gradient-pink/50 text-transparent bg-clip-text to-gradient-blue/50 duration-300 ease-in-out p-6 border-gradient-pink border-[1px] rounded-bl-2xl shadow-lg rounded-tr-2xl"
                          >
                            See
                            {{ availableMUA[MUAIndex].attributes.name }} works
                            here!
                          </button>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
                  v-else
                >
                  No Make Up Artist Available for this date
                </div>
                <div
                  class="pt-16 flex flex-col gap-4"
                  v-if="availableMUA.length > 0"
                >
                  <span class="text-gray-500 font-medium capitalize text-2xl"
                    >Have your own make up artist?</span
                  >
                  <button
                    class="w-fit px-6 py-3 rounded-xl bg-[#3258E8] text-white"
                    @click="removeMUA"
                  >
                    Remove from the package
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4" v-else>
              <span class="text-2xl font-bold"
                >Don't have any Make Up Artist?</span
              >
              <button
                class="w-fit px-6 py-3 rounded-xl bg-[#3258E8] text-white"
                @click="showMUA = true"
              >
                Add Make Up Artist to order
              </button>
              <hr />
            </div>
          </Transition>
          <!-- Section MC , Decoration   -->
          <div
            class="flex-col lg:flex-row flex items-start gap-32 lg:gap-6 w-full justify-between"
          >
            <!-- MC -->
            <div class="flex flex-col gap-4 justify-start w-full group">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Master of Ceremony
                </h1>
                <div class="flex gap-10">
                  <span class="text-sm text-slate-400">Not customizeable</span>
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>
              <div
                class="text-2xl flex gap-6 font-semibold"
                v-for="(el, idx) in packageDetail.data[0].attributes
                  .master_ceremonies.data"
                :key="idx"
              >
                <PlayIcon class="w-6 stroke-gradient-pink/50" />

                <div class="stats">
                  <div class="stat">
                    <div class="stat-figure text-primary"></div>
                    <div class="stat-title text-base">
                      Master of Ceremony Name
                    </div>
                    <div
                      class="text-xl stat-value text-transparent bg-gradient-to-br from-gradient-blue/50 to-gradient-pink/50 bg-clip-text"
                    >
                      {{ el.attributes.Name }}
                    </div>
                  </div>

                  <div class="stat">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title text-base">Price</div>
                    <div
                      class="text-xl stat-value text-transparent bg-gradient-to-br from-gradient-blue/50 to-gradient-pink/50 bg-clip-text"
                    >
                      {{
                        Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "IDR",
                        }).format(el.attributes.price)
                      }}
                    </div>
                  </div>

                  <div class="stat">
                    <div class="stat-value text-xl">Job Desc</div>
                    <div class="stat-title text-base">
                      {{ el.attributes.serviceProvided }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Decoration Vendors -->
          </div>

          <div class="flex items-start gap-6 w-full justify-between">
            <div class="flex flex-col gap-4 justify-start w-full group">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Decoration
                </h1>
                <div class="flex gap-10">
                  <span class="text-sm text-slate-400">Customizeable</span>
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>

              <label class="sr-only">Underline select</label>

              <select
                v-model="themeName"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option v-for="(el, idx) in decorationVendor.data" :key="idx">
                  {{ el.attributes.theme }}
                </option>
              </select>

              <div class="w-fit flex flex-col pt-10">
                <div class="stat-title">Decoration Price for Theme</div>
                <div
                  class="stat-value text-transparent bg-gradient-to-br from-gradient-blue/50 to-gradient-pink/50 bg-clip-text pb-4"
                >
                  {{
                    Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                    }).format(themePrice[0]?.attributes?.price)
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Section Band -->

          <div class="flex items-start gap-6 w-full justify-between">
            <!-- Photographer -->

            <div class="flex flex-col gap-4 justify-start w-full group">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Band Pengiring
                </h1>
                <div class="flex gap-10">
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>
              <div class="flex flex-row gap-6 w-full">
                <div class="flex flex-col gap-6 flex-grow w-1/4">
                  <div class="w-full text-xl font-bold">
                    Pilih band dari checkbox dibawah
                  </div>

                  <ul
                    class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li
                      class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                      v-for="el in availableBand"
                      :key="el.id"
                    >
                      <div class="flex items-center pl-3">
                        <input
                          :id="el.id + `band`"
                          type="radio"
                          @click="arrayBand[0] = el.id"
                          :checked="arrayBand.includes(el.id)"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          :for="`#` + el.id + `band`"
                          class="flex flex-col gap-1 w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >{{ el.attributes.Name }}
                          <span
                            class="text-gray-500 font-light"
                            v-if="
                              packageDetail.data[0].attributes.band.data.id ===
                              el.id
                            "
                            >Package Default</span
                          >
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- Separator -->
                <div class="w-[1px] min-h-full bg-black"></div>
                <!-- End Separator -->
                <div class="flex flex-col gap-20 w-3/4">
                  <div class="flex flex-col gap-6">
                    <span class="font-bold text-xl"
                      >Lihat detail dari band melalui list dibawah
                    </span>
                    <ul class="flex gap-14 flex-row capitalize">
                      <li
                        v-for="(el, idx) in availableBand"
                        :key="idx"
                        :class="{
                          'text-gradient-pink': idx === bandIndex,
                        }"
                        class="cursor-pointer duration-300 ease-in-out capitalize"
                        @click="getBandIndex(idx)"
                      >
                        {{ el.attributes.Name }}
                      </li>
                    </ul>
                  </div>
                  <div class="flex gap-32 w-full h-80">
                    <div
                      class="stats stats-vertical lg:stats-horizontal shadow"
                    >
                      <div class="stat">
                        <div class="stat-value">
                          {{ availableBand[bandIndex].attributes.Name }}
                        </div>
                        <div class="stat-title">Genre Music</div>
                        <div class="stat-title">
                          {{ availableBand[bandIndex].attributes.Genre }}
                        </div>
                      </div>

                      <div class="stat">
                        <div class="stat-title">
                          Harga untuk menggunakan jasa band ini :
                        </div>
                        <div class="stat-value">
                          {{
                            Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                            }).format(availableBand[bandIndex].attributes.Price)
                          }}
                        </div>

                        <div class="stat-title">
                          sudah memberikan jasa sebanyak :
                          {{
                            availableBand[bandIndex].attributes.orders.data
                              .length
                          }}
                        </div>
                      </div>

                      <div class="stat">
                        <div class="stat-title">
                          Klik tombol dibawah untuk melihat portofolio
                        </div>
                        <NuxtLink
                          class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-fit h-fit"
                        >
                          Lihat portofolio
                        </NuxtLink>
                        <div v-for="(element, idx) in defaultBand" :key="idx">
                          <span
                            v-if="availableBand[bandIndex].id === element.id"
                            class="text-gray-400 text-sm"
                            >Default dari paket</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- End Section Band -->

          <!-- Section Photographer  -->
          <div class="flex items-start gap-6 w-full justify-between">
            <!-- Photographer -->

            <div class="flex flex-col gap-4 justify-start w-full group">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Photographer
                </h1>
                <div class="flex gap-10">
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>
              <div class="flex flex-row gap-6 w-full">
                <div class="flex flex-col gap-6 flex-grow w-1/4">
                  <div class="w-full text-xl font-bold">
                    Choose your photographer by click the button below
                  </div>
                  <ul
                    class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li
                      class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                      v-for="el in availablePhotographers"
                      :key="el.id"
                    >
                      <div class="flex items-center pl-3">
                        <input
                          id="default-radio-1"
                          type="radio"
                          @click="arrayPhotographer[0] = el.id"
                          :checked="arrayPhotographer.includes(el.id)"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="default-radio-1"
                          class="flex flex-col gap-1 w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >{{ el.attributes.name }}
                          <span
                            class="text-gray-500 font-light"
                            v-if="
                              packageDetail.data[0].attributes.photographer.data
                                .id === el.id
                            "
                            >Package Default</span
                          >
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- Separator -->
                <div class="w-[1px] min-h-full bg-black"></div>
                <!-- End Separator -->
                <div class="flex flex-col gap-20 w-3/4">
                  <div class="flex flex-col gap-6">
                    <span class="font-bold text-xl"
                      >Choose photographer from the list
                    </span>
                    <ul class="flex gap-14 flex-row capitalize">
                      <li
                        v-for="(el, idx) in availablePhotographers"
                        :key="idx"
                        :class="{
                          'text-gradient-pink': idx === photographerIndex,
                        }"
                        class="cursor-pointer duration-300 ease-in-out capitalize"
                        @click="getPhotographerIndex(idx)"
                      >
                        {{ el.attributes.name }}
                      </li>
                    </ul>
                  </div>
                  <div class="flex gap-32 w-full h-80">
                    <div class="flex flex-col gap-10 w-1/4 justify-between">
                      <div
                        class="w-full text-6xl font-bold capitalize flex flex-col"
                      >
                        {{
                          availablePhotographers[photographerIndex].attributes
                            .name
                        }}
                        <div
                          v-for="(element, idx) in defaultPhotographer"
                          :key="idx"
                        >
                          <span
                            v-if="
                              availablePhotographers[photographerIndex].id ===
                              element.id
                            "
                            class="text-gray-400 text-sm"
                            >Default Package Photographer</span
                          >
                        </div>
                      </div>
                      <div class="flex flex-col gap-4">
                        <h6 class="text-gray-600 text-xl font-semibold">
                          What you should know about
                          {{
                            availablePhotographers[photographerIndex].attributes
                              .name
                          }}
                        </h6>

                        <p class="text-gray-500 text-lg text-justify">
                          {{
                            availablePhotographers[photographerIndex].attributes
                              .description
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-col gap-10 w-1/3">
                      <div class="flex flex-col gap-4">
                        <h6 class="text-gray-600 text-xl font-semibold">
                          What will you get when you hire
                          {{
                            availablePhotographers[photographerIndex].attributes
                              .name
                          }}
                        </h6>

                        <p class="text-gray-500 text-lg text-justify">
                          {{
                            availablePhotographers[photographerIndex].attributes
                              .serviceProvided
                          }}
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-col gap-10 justify-between">
                      <div class="flex flex-col gap-4">
                        <h6 class="text-gray-600 font-semibold text-2xl">
                          Price?
                        </h6>

                        <p
                          class="py-2 text-justify text-5xl font-bold bg-gradient-to-tr from-gradient-pink/50 text-transparent bg-clip-text to-gradient-blue/50"
                        >
                          {{
                            Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                            }).format(
                              availablePhotographers[photographerIndex]
                                .attributes.price
                            )
                          }}
                        </p>
                      </div>

                      <NuxtLink
                        :to="
                          availablePhotographers[photographerIndex].attributes
                            .portofolioLink
                        "
                      >
                        <button
                          class="bg-gradient-to-tr from-gradient-pink/50 text-transparent bg-clip-text to-gradient-blue/50 duration-300 ease-in-out p-6 border-gradient-pink border-[1px] rounded-bl-2xl shadow-lg rounded-tr-2xl"
                        >
                          See
                          {{
                            availablePhotographers[photographerIndex].attributes
                              .name
                          }}
                          works here!
                        </button>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Section 4 -->
          <div class="flex items-start gap-6 w-full justify-between">
            <!-- Catering -->
            <div class="flex flex-col gap-4 justify-start w-full group">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Catering
                </h1>
                <div class="flex gap-10">
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>
              <div class="flex flex-row gap-10 w-full">
                <div class="flex flex-col gap-6 flex-grow w-1/4">
                  <div class="w-full text-xl font-bold">
                    Choose your catering by click the button below
                  </div>
                  <ul
                    class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li
                      class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                      v-for="el in availableCaterings"
                      :key="el.id"
                    >
                      <div class="flex items-center pl-3">
                        <input
                          id="default-radio-1"
                          type="radio"
                          @click="arrayCatering[0] = el.id"
                          :checked="arrayCatering.includes(el.id)"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="default-radio-1"
                          class="flex flex-col gap-1 w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >{{ el.attributes.name }}
                          <span
                            class="text-gray-500 font-light"
                            v-if="
                              packageDetail.data[0].attributes.catering.data
                                .id === el.id
                            "
                            >Package Default</span
                          >
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- Separator -->
                <div class="w-[1px] min-h-full bg-black"></div>
                <!-- End Separator -->
                <div class="flex flex-col gap-6 w-3/4">
                  <div class="flex flex-col gap-6">
                    <span class="font-bold text-xl"
                      >See catering from the list
                    </span>
                    <ul class="flex gap-14 flex-row capitalize">
                      <li
                        v-for="(el, idx) in availableCaterings"
                        :key="idx"
                        :class="{
                          'text-gradient-pink': idx === cateringIndex,
                        }"
                        class="cursor-pointer duration-300 ease-in-out capitalize"
                        @click="getCateringIndex(idx)"
                      >
                        <span> {{ el.attributes.name }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="flex flex-col gap-20 w-full overflow-y-scroll">
                    <div class="flex w-full gap-10 flex-grow">
                      <div class="w-1/4">
                        <div class="stat">
                          <div class="stat-title">Catering Name</div>

                          <div class="font-bold text-5xl">
                            {{
                              availableCaterings[cateringIndex].attributes.name
                            }}
                          </div>
                        </div>

                        <div class="stat">
                          <div class="stat-title">Location</div>
                          <div class="font-bold text-xl">
                            {{
                              availableCaterings[cateringIndex].attributes
                                .location
                            }}
                          </div>

                          <div
                            v-for="(element, idx) in defaultCatering"
                            :key="idx"
                            class="stats"
                          >
                            <span
                              v-if="
                                availableCaterings[cateringIndex].id ===
                                element.id
                              "
                              class="text-[12px] text-gray-400 font-bol"
                              >Default Catering</span
                            >
                          </div>
                        </div>
                      </div>

                      <div
                        class="relative overflow-x-auto w-3/4 rounded-xl h-fit"
                      >
                        <table class="w-full text-sm text-left text-gray-500">
                          <thead class="text-xs text-gray-700 uppercase">
                            <tr>
                              <th scope="col" class="px-6 py-3 rounded-tl-xl">
                                Food name
                              </th>
                              <th scope="col" class="px-6 py-3">Stock</th>
                              <th scope="col" class="px-6 py-3 rounded-tr-xl">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(el, idx) in catering[cateringIndex]
                                .attributes.food"
                              :key="idx"
                              class="bg-gradient-pink/5 dark:bg-gray-800"
                            >
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {{ el.food }}
                              </th>
                              <td class="px-6 py-4">{{ el.stok }}</td>
                              <td class="px-6 py-4">{{ el.price }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Section 5 -->
          <div class="flex items-start gap-6 w-full justify-between">
            <!-- Venue -->
            <div class="flex flex-col gap-4 justify-start w-full group">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold text-xl flex items-center gap-44">
                  Venue
                </h1>
                <div class="flex gap-10">
                  <ArrowSmallRightIcon
                    class="w-4 stroke-black group-hover:rotate-90 duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="h-[1px] w-full bg-slate-700"></div>

              <div class="flex flex-col gap-14 w-full">
                <div class="flex flex-row gap-10 w-full justify-between">
                  <div class="flex flex-col gap-6 w-full">
                    <div class="w-full text-xl font-bold">
                      Choose your catering by click the button below
                    </div>
                    <ul
                      class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <li
                        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                        v-for="el in availableVenue"
                        :key="el.id"
                      >
                        <div class="flex items-center pl-3">
                          <input
                            id="default-radio-1"
                            type="radio"
                            @click="arrayVenue[0] = el.id"
                            :checked="arrayVenue.includes(el.id)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for="default-radio-1"
                            class="flex flex-col gap-1 w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >{{ el.attributes.venueName }}
                            <span
                              class="text-gray-500 font-light"
                              v-if="
                                packageDetail.data[0].attributes.venue.data
                                  .id === el.id
                              "
                              >Package Default</span
                            >
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- Separator -->
                  <div class="w-[1px] min-h-full bg-black"></div>
                  <div class="flex flex-col gap-6 w-full">
                    <span class="font-bold text-xl"
                      >See venue from the list
                    </span>
                    <ul class="flex gap-14 flex-row capitalize">
                      <li
                        v-for="(el, idx) in availableVenue"
                        :key="idx"
                        :class="{
                          'text-gradient-pink': idx === venueIndex,
                        }"
                        class="cursor-pointer hover:text-gradient-pink/80 duration-300 ease-in-out"
                        @click="getVenueIndex(idx)"
                      >
                        {{ el.attributes.venueName }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-10 lg:gap-24">
                  <div
                    class="w-full lg:w-1/4 flex items-center lg:items-start text-center lg:text-left flex-col gap-10"
                  >
                    <div class="pl-6 flex flex-col gap-4">
                      <div class="stat-title">Venue Name</div>
                      <div class="font-bold text-5xl">
                        {{ availableVenue[venueIndex].attributes.venueName }}
                      </div>
                      <div class="text-xl">
                        Kapasitas
                        {{ availableVenue[venueIndex].attributes.capacity }}
                        Orang
                      </div>
                    </div>

                    <div class="flex flex-col gap-3 pl-6">
                      <div class="stat-title">Location</div>
                      <div class="font-bold text-xl">
                        {{ availableVenue[venueIndex].attributes.address }},
                        {{ availableVenue[venueIndex].attributes.city }},
                        {{ availableVenue[venueIndex].attributes.province }}
                      </div>

                      <div class="text-5xl font-bold">
                        {{
                          Intl.NumberFormat("id", {
                            style: "currency",
                            currency: "IDR",
                          }).format(availableVenue[venueIndex].attributes.price)
                        }}
                      </div>
                    </div>
                  </div>

                  <div class="w-full lg:w-3/4">
                    <Carousel>
                      <Slide
                        v-for="el in availableVenue[venueIndex].attributes
                          .venueImage.data"
                        :key="el"
                      >
                        <div class="carousel__item">
                          <img :src="el.attributes.url" alt="" />
                        </div>
                      </Slide>

                      <template #addons>
                        <Navigation />
                        <Pagination />
                      </template>
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="w-full py-10 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-[3px] border-gray-300"
          v-else
        >
          Order for this date is already full, try another date!
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
DatePicker {
  min-width: 0 !important;
  width: 100% !important;
}
.carousel__item {
  min-height: 250px;
  max-height: 500px;
  overflow: hidden;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
