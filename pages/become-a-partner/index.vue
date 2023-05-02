<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useFoodStore } from "~~/store/foodList";
const store = useFoodStore();
const router = useRouter();
//reactive var

let experience = ref();
let price = ref();
let skill = ref("");
let files = ref([]);

let formVenue = ref({
  name: "",
  venueImage: [],
  price: 0,
  capacity: 0,
  city: "",
  address: "",
  province: "",
});

let formCatering = ref({
  location: "",
  name: "",
});

let foodObjTemp = ref({
  food: "",
  price: 0,
  stok: 0,
});

function addFoodList() {
  store.pushFoodObj(foodObjTemp.value);
  foodObjTemp.value = {
    food: "",
    price: 0,
    stok: 0,
  };
}

function deleteFood(idx) {
  store.deleteFoodObj(idx);
}

// cookie things
const token = useCookie("token");
const role = useCookie("role");
const userID = useCookie("id");

//config

const config = useRuntimeConfig();
// menu tab
const menu = ["Photographer", "Venue", "Catering"];
const menuHistory = ["History", "Order"];
// Tab function

let selected = ref(0);
let number = userID.value;
function tab(index) {
  selected.value = index;
}
console.log(token);
// Data Fetching for tabbing
let historyPartner = ref({});
if (token.value !== undefined) {
  historyPartner = await $fetch(
    `${config.strapiEndpoint}/users/me?populate=*`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token.value,
      },
    }
  );
}
// Tabbing History or Order

let history = ref(0);
function historyTab(idx) {
  history.value = idx;
  console.log(history.value);
}

// let imageTemp = ref([""]);
// function checkFile(event) {
//   console.log(event.target.files);
//   imageTemp.push(event.target.files);
//   console.log(imageTemp);
// }

const handleFiles = (event) => {
  files.value.push(event.target.files);
  console.log(files.value);
};

// Submit function

async function submit() {
  const formData = new FormData();
  for (const element of files.value) {
    formData.append("portofolio", element);
    console.log(formData);
  }

  console.log(selected.value);
  if (selected.value === 0) {
    await $fetch(`${config.strapiEndpoint}/photographers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: {
        data: {
          yearExperience: experience.value,
          price: price.value,
          skills: skill.value,
          portofolio: formData.value,
          user: {
            id: number,
          },
          identifier: 1,
        },
      },
    }).then(location.reload());
  } else if (selected.value === 1) {
    await $fetch(`${config.strapiEndpoint}/venues`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: {
        data: {
          venueName: formVenue.value.name,
          price: formVenue.value.price,
          capacity: formVenue.value.capacity,
          city: formVenue.value.city,
          address: formVenue.value.address,
          province: formVenue.value.province,
          user: {
            id: number,
          },
          identifier: 1,
        },
      },
    }).then(location.reload());
  } else {
    await $fetch(`${config.strapiEndpoint}/caterings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: {
        data: {
          location: formCatering.value.location,
          name: formCatering.value.name,
          food: store.foodList,
          user: {
            id: number,
          },
          identifier: 1,
        },
      },
    }).then(() => {
      location.reload();
      store.$reset();
    });
  }
}

function back() {
  router.back();
}
// async function refresh() {
//   historyPartner = await $fetch(
//     `http://127.0.0.1:1337/api/users/me?populate=*`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }
//   );
//   console.log("ini refresh");
// }
</script>

<template>
  <div>
    <div
      class="w-full flex flex-col pb-14"
      v-if="token !== undefined && role == 1"
    >
      <div
        class="h-96 w-full bg-gradient-to-r from-[#F7D5E7] to-[#BCBAE9] via-[#EEEBF9]"
      ></div>

      <div class="w-full -mt-44 px-80 flex flex-col gap-2">
        <h1 class="text-5xl font-semibold">Blissful Partner.</h1>
        <p class="text-lg">
          Help us to make provide people to make their wedding's <br />
          dream come true
        </p>

        <div class="bg-white shadow-2xl rounded-xl flex flex-col gap-14 p-6">
          <div class="flex gap-4 flex-row">
            <button
              type="button"
              v-for="(el, idx) in menu"
              :key="idx"
              :class="{
                'bg-[#2847BE]': idx === selected,
                'text-white': idx === selected,
              }"
              @click="tab(idx)"
              class="rounded-md px-3 py-2 ease-in-out duration-300"
            >
              {{ el }}
            </button>
          </div>
          <div class="flex flex-wrap items-center gap-6" v-if="selected === 0">
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="Experience">Experience</label>
              <input
                type="number"
                id="Experience"
                min="0"
                v-model="experience"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="5 ( In Years )"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="Price">Price</label>
              <input
                type="number"
                id="Price"
                min="0"
                v-model="price"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="2000000 ( In Rupiah )"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="Skills">Skills</label>
              <input
                type="text"
                id="Skills"
                v-model="skill"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your Strongest skill as photographer"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-full">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="portofolio"
                >Upload Portofolio</label
              >
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="portofolio"
                type="file"
                @change="handleFiles"
                accept="image/*"
                multiple
              />
              <div
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="user_avatar_help"
              >
                You can upload multiple portofolio ( 3 Portofolios recommended )
              </div>
            </div>
            <Button :type="1" buttonText="Submit" @click.prevent="submit" />
          </div>

          <div class="flex flex-wrap items-center gap-6" v-if="selected === 1">
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="Name">Venue Name</label>
              <input
                type="text"
                id="Name"
                v-model="formVenue.name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Hotel Ibis"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="Price">Price</label>
              <input
                type="number"
                id="Price"
                min="0"
                v-model="formVenue.price"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="200000000 ( In Rupiah )"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="capacity">capacity</label>
              <input
                type="number"
                id="capacity"
                v-model="formVenue.capacity"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Venue Capacity"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="address">Venue address</label>
              <input
                type="text"
                id="address"
                min="0"
                v-model="formVenue.address"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Jln. Ahmad Yani 5"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="city">City</label>
              <input
                type="text"
                id="city"
                min="0"
                v-model="formVenue.city"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Jakarta Timur"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="province">Province</label>
              <input
                type="text"
                id="province"
                v-model="formVenue.province"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="DKI Jakarta"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-full">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="venueImage"
                >Upload Venue Image</label
              >
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="venueImage"
                type="file"
                @change="handleFiles"
                accept="image/*"
                multiple
              />
              <div
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="VenuImage"
              >
                You can upload multiple Venue Image ( 5 Portofolios recommended
                )
              </div>
            </div>
            <Button :type="1" buttonText="Submit" @click.prevent="submit" />
          </div>
          <div class="flex flex-wrap items-center gap-6" v-if="selected === 2">
            <div class="flex flex-col gap-3 w-[31%]">
              <label for="cateringName">Catering Name</label>
              <input
                type="text"
                id="cateringName"
                v-model="formCatering.name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Dapur Betawi"
                required
              />
            </div>
            <div class="flex flex-col gap-3 w-[50%] flex-grow">
              <label for="address">Catering address</label>
              <input
                type="text"
                id="address"
                min="0"
                v-model="formCatering.location"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Jln. Bandung"
                required
              />
            </div>
            <div class="flex flex-col gap-3 flex-grow w-[31%]">
              <label for="Food">Catering Food</label>
              <input
                type="text"
                id="Food"
                min="0"
                v-model="foodObjTemp.food"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Bakso"
                required
              />
            </div>
            <div class="flex flex-col gap-3 flex-grow w-[31%]">
              <label for="Food Price">Food Price </label>
              <input
                type="number"
                id="Food Price"
                v-model="foodObjTemp.price"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Price / food"
                required
              />
            </div>
            <div class="flex flex-col gap-3 flex-grow w-[31%]">
              <label for="Food Price">Food Stok </label>
              <input
                type="number"
                id="Food Price"
                v-model="foodObjTemp.stok"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Food Stock"
                required
              />
            </div>
            <div class="flex w-full justify-between items-start">
              <Button
                :type="2"
                buttonText="Add Food"
                @click.prevent="addFoodList"
              />

              <ol
                class="justify-end flex flex-col gap-8 list-decimal divide-y-[1px] divide-black [&>*:not(:first-child)]:pt-8"
              >
                <li
                  v-for="(el, idx) in store.foodList"
                  :key="idx"
                  class="flex gap-20 items-center justify-center list-decimal"
                >
                  <div class="flex gap-2 flex-col">
                    <h1 class="font-semibold">Food Name</h1>
                    <span>{{ el.food }}</span>
                  </div>
                  <div class="flex flex-col gap-2">
                    <h1 class="font-semibold">Food Price</h1>
                    <h1 class="font-semibold">{{ el.price }}</h1>
                  </div>

                  <div class="flex flex-col gap-2">
                    <h1 class="font-semibold">Food Stock</h1>
                    <h1 class="font-semibold">{{ el.stok }}</h1>
                  </div>
                  <div
                    class="flex gap-2 text-sm items-center group cursor-pointer"
                    @click.prevent="deleteFood(idx)"
                  >
                    <TrashIcon
                      class="w-4 group-hover:stroke-red-500 flex items-center duration-300 ease-in-out"
                    />
                    <span>Delete</span>
                  </div>
                </li>
              </ol>
            </div>

            <Button
              :type="1"
              buttonText="Submit"
              @click.prevent="submit"
              class="flex w-full"
            />
          </div>
        </div>
        <div
          class="bg-white mt-6 rounded-md flex flex-col gap-14 p-2 w-fit shadow-md shadow-slate-200"
        >
          <div class="flex gap-4 flex-row">
            <button
              type="button"
              v-for="(el, idx) in menuHistory"
              :key="idx"
              :class="{
                'bg-[#2847BE]': idx === history,
                'text-white': idx === history,
              }"
              @click="historyTab(idx)"
              class="rounded-md px-3 py-2 ease-in-out duration-300"
            >
              {{ el }}
            </button>
          </div>
        </div>

        <div
          class="flex flex-col gap-6 mt-10"
          v-if="history === 0 && selected === 0"
        >
          <CardPartner
            v-for="(el, idx) in historyPartner.photographers"
            :key="idx"
            :price="el.price"
            :experience="el.yearExperience"
            :Skills="el.skills"
            :id="el.id"
            :token="token"
            :type="1"
            @refresh="refresh"
          />
        </div>
        <div
          class="flex flex-col gap-6 mt-10"
          v-if="history === 0 && selected === 1"
        >
          <CardPartner
            v-for="(el, idx) in historyPartner.venues"
            :key="idx"
            :price="el.price"
            :address="el.address"
            :capacity="el.capacity"
            :city="el.city"
            :province="el.province"
            :venue-name="el.venueName"
            :venue-image="el.venueImage"
            :id="el.id"
            :token="token"
            :type="2"
            @refresh="refresh"
          />
        </div>
        <div
          class="flex flex-col gap-6 mt-10"
          v-if="history === 0 && selected === 2"
        >
          <CardPartner
            v-for="(el, idx) in historyPartner.caterings"
            :key="idx"
            :catering-food="el.food"
            :catering-location="el.location"
            :catering-name="el.name"
            :id="el.id"
            :token="token"
            :type="3"
            @refresh="refresh"
          />
        </div>
      </div>
    </div>

    <div v-else-if="token !== undefined && role == 2">test</div>
    <div
      v-else
      class="bg-gradient-to-br from-[#ffffff] to-[#725AE4]/70 via-[#F7F7F7] w-full h-screen flex flex-col gap-10 px-44 justify-center"
    >
      <div class="w-full flex gap-6 group cursor-pointer">
        <NuxtLink @click="back" class="flex gap-6 group items-center">
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

          <p class="group-hover:-ml-2 duration-300 ease-in-out">Back</p>
        </NuxtLink>
      </div>
      <h1 class="text-5xl font-bold tracking-tighter">Blissful Beginnings.</h1>
      <p class="text-7xl font-semibold">
        You're not logged in as <br />a partner
      </p>
      <p class="text-2xl">Already have an account? try login</p>
      <div class="flex gap-4 justify-start items-center">
        <NuxtLink to="/login">
          <Button :type="1" buttonText="Login" />
        </NuxtLink>
        <span>or</span>
        <NuxtLink to="/register/partner">
          <Button :type="2" buttonText="Register" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style></style>
