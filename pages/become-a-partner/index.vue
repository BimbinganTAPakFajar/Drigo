<script setup>
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import { useFoodStore } from "~~/store/foodList";
const store = useFoodStore();
const router = useRouter();

definePageMeta({
  middleware: ["auth-partner", "user", "is-logged"],
});
//reactive var

let experience = ref();
let price = ref();
let skill = ref("");
let files = ref([]);
let modalGambar = ref(false);
let idxGambar = ref(0);

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
const auth = useCookie("isAuth");

function logout() {
  token.value = undefined;
  role.value = undefined;
  userID.value = undefined;
  auth.value = undefined;
  location.reload();
}
//config

const config = useRuntimeConfig();
// menu tab
const menu = ["Photographer", "Venue", "Catering", " Make Up Artist", "Band"];
const menuHistory = ["History", "Order"];
// Tab function

let selected = ref(0);
let number = userID.value;
function tab(index) {
  selected.value = index;
}

// Data Fetching for tabbing
let historyPartner = ref({});

historyPartner = await $fetch(
  `${config.public.strapiEndpoint}/users/me?populate=*`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }
);

const { data: dataVenue, pending: pendingVenue } = useFetch(
  `${config.public.strapiEndpoint}/venues?populate=*&filters[user][id]=${userID.value}`,
  { method: "GET" }
);

// Tabbing History or Order

async function deleteBand(id) {
  await useFetch(`${config.public.strapiEndpoint}/bands/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.value,
    },
  }).then(location.reload());
}

let history = ref(0);
function historyTab(idx) {
  history.value = idx;
  console.log(history.value);
}

// Submit function

function openSlider(idx) {
  modalGambar.value = true;
  idxGambar.value = idx;
}

async function submitFood() {
  await $fetch(`${config.public.strapiEndpoint}/caterings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token.value,
    },
    body: {
      data: {
        location: formCatering.value.location,
        name: formCatering.value.name,
        food: store.foodList,
        user: {
          id: number,
        },
        identifier: 2,
      },
    },
  }).then(() => {
    location.reload();
    store.$reset();
  });
}

function remove(id) {
  const { data } = useFetch(
    `${config.public.strapiEndpoint}/make-up-artists/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token.value,
      },
    }
  );

  location.reload();
}
</script>

<template>
  <div>
    <div class="w-full flex flex-col pb-14">
      <div
        class="h-96 w-full bg-gradient-to-r from-[#F7D5E7] to-[#BCBAE9] via-[#EEEBF9]"
      ></div>
      <button
        @click="logout"
        class="fixed left-[3%] bottom-[10%] px-6 py-3 bg-transparent duration-300 ease-in-out text-[#7B7B7B] focus:text-black hover:ring-2 ring-[#3258E8] rounded-xl w-fit"
      >
        Logout
      </button>
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
          <div class="flex flex-col items-start gap-6" v-if="selected === 0">
            <p class="flex gap-6 text-red-400 w-2/3">
              <ExclamationTriangleIcon class="w-1/12" /> Pastikan anda
              menggunakan email yang sama dengan akun partner pada website ini
              ketika mengisi form di google form.
            </p>
            <h1 class="font-semibold text-2xl">
              Tekan tombol dibawah untuk menuju form pendaftaran fotografer
            </h1>
            <NuxtLink
              target="_blank"
              to="https://docs.google.com/forms/d/e/1FAIpQLSfOnI_Uq5ncg1TOJfM-u2t55Fqjr_ELMqrXqTyAP6GYjeki8A/viewform?usp=sf_link"
            >
              <Button
                :type="1"
                buttonText="Go To Form"
                @click.prevent="submit"
              />
            </NuxtLink>
          </div>

          <div class="flex flex-col items-start gap-6" v-if="selected === 1">
            <p class="flex gap-6 text-red-400 w-2/3">
              <ExclamationTriangleIcon class="w-1/12" /> Pastikan anda
              menggunakan email yang sama dengan akun partner pada website ini
              ketika mengisi form di google form.
            </p>
            <h1 class="font-semibold text-2xl">
              Tekan tombol dibawah untuk menuju form pendaftaran venue
            </h1>
            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSclf1yHbjAHkWdgf1AFvqFlczPrZTjNV0-cwxLUQLkElV1aLA/viewform?usp=sf_link"
              target="_blank"
            >
              <Button
                :type="1"
                buttonText="Go To Form"
                @click.prevent="submit"
              />
            </NuxtLink>
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
              <button
                class="px-6 py-3 duration-300 ease-in-out text-[#7B7B7B] focus:text-black hover:ring-2 ring-[#3258E8] rounded-xl w-auto"
                @click.prevent="addFoodList"
              >
                Tambah
              </button>
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

            <button
              class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
              @click.prevent="submitFood"
            >
              Submit makanan
            </button>
          </div>

          <div class="flex flex-col items-start gap-6" v-if="selected === 3">
            <p class="flex gap-6 text-red-400 w-2/3">
              <ExclamationTriangleIcon class="w-1/12" /> Pastikan anda
              menggunakan email yang sama dengan akun partner pada website ini
              ketika mengisi form di google form.
            </p>
            <h1 class="font-semibold text-2xl">
              Tekan tombol dibawah untuk menuju form pendaftaran make up artist
            </h1>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSekQYUCCY5QfwAxvQMwsD7VDKBDeLbT2Bw83xr6SnKUZ-jhrQ/viewform?usp=sf_link"
              target="_blank"
            >
              <Button
                :type="1"
                buttonText="Go To Form"
                @click.prevent="submit"
              />
            </NuxtLink>
          </div>

          <div class="flex flex-col items-start gap-6" v-if="selected === 4">
            <p class="flex gap-6 text-red-400 w-2/3">
              <ExclamationTriangleIcon class="w-1/12" /> Pastikan anda
              menggunakan email yang sama dengan akun partner pada website ini
              ketika mengisi form di google form.
            </p>
            <h1 class="font-semibold text-2xl">
              Tekan tombol dibawah untuk menuju form pendaftaran band
            </h1>

            <NuxtLink
              to="https://docs.google.com/forms/d/e/1FAIpQLSffS6MNanNu9w8oNGjCOJWaV3lUH0Gn6PGhhmH-pVy6j-KJdg/viewform?usp=sf_link"
              target="_blank"
              class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
            >
              Go to form
            </NuxtLink>
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
          <div
            class="fixed z-40 left-0 top-0 w-full bg-black/50 backdrop-blur-md min-h-screen"
            v-if="modalGambar"
          >
            <div class="absolute top-[10%] right-[10%]">
              <div
                class="btn btn-square btn-outline"
                @click="modalGambar = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <div
              class="text-white flex flex-col items-center justify-center w-full h-screen mx-auto my-auto"
            >
              <div class="carousel w-full">
                <div
                  :id="el.id"
                  class="carousel-item w-full"
                  v-for="el in dataVenue.data[idxGambar].attributes.venueImage
                    .data"
                  :key="el.id"
                >
                  <img :src="el.attributes.url" class="w-1/4 mx-auto" />
                </div>
              </div>
              <div class="flex justify-center w-full py-2 gap-2">
                <a
                  :href="`#` + el.id"
                  class="btn btn-xs"
                  v-for="(el, idx) in dataVenue.data[idxGambar].attributes
                    .venueImage.data"
                  :key="el.id"
                  >{{ idx + 1 }}</a
                >
              </div>
            </div>
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Nama</th>
                  <th scope="col" class="px-6 py-3">Link Portofolio</th>
                  <th scope="col" class="px-6 py-3">Harga</th>
                  <th scope="col" class="px-6 py-3">Alamat</th>
                  <th scope="col" class="px-6 py-3">Gambar</th>
                  <th scope="col" class="px-6 py-3">Kapasitas</th>
                  <th scope="col" class="px-6 py-3">Aksi</th>
                </tr>
              </thead>

              <div v-if="pendingVenue">
                <button
                  disabled
                  type="button"
                  class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading...
                </button>
              </div>

              <tbody v-else>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  v-for="(el, idx) in dataVenue.data"
                  :key="el.id"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ el.attributes.venueName }}
                  </th>
                  <td>
                    <NuxtLink
                      :to="el.attributes.venueLink"
                      class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline"
                      >Link Venue</NuxtLink
                    >
                  </td>
                  <td class="px-6 py-4">{{ el.attributes.price }}</td>
                  <td class="px-6 py-4">
                    {{ el.attributes.address }}, {{ el.attributes.city }} ,
                    {{ el.attributes.province }}
                  </td>
                  <td
                    class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    @click="openSlider(idx)"
                  >
                    Buka Gambar
                  </td>
                  <td class="px-6 py-4">{{ el.attributes.capacity }} Orang</td>

                  <td class="px-6 py-4">
                    <div
                      @click="deleteVenue(el.id)"
                      class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Hapus
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
        <div
          class="flex flex-col gap-6 mt-10"
          v-if="history === 0 && selected === 3"
        >
          <div
            v-for="el in historyPartner.make_up_artists"
            :key="el.id"
            class="flex p-6 items-center justify-between w-full shadow-lg shadow-black/15 rounded-xl"
          >
            <div class="flex flex-col gap-2">
              <h1 class="font-semibold text-xl">Name</h1>
              <span>{{ el.name }} </span>
            </div>

            <div class="flex flex-col gap-2">
              <h1 class="font-semibold text-xl">Price</h1>
              <span>{{ el.price }}</span>
            </div>

            <div class="flex flex-col gap-2">
              <h1 class="font-semibold text-xl">Servis</h1>
              <span>{{ el.serviceProvided }}</span>
            </div>
            <div class="w-[1px] bg-black/20 h-14 rounded-full"></div>

            <div class="flex items-center gap-4">
              <NuxtLink
                target="_blank"
                :to="el.portofolioLink"
                class="text-xl font-semibold"
                >Portofolio Link
              </NuxtLink>
            </div>
            <div
              class="flex items-center gap-2 cursor-pointer group"
              @click="remove(el.id)"
            >
              <div class="border-[1px] border-red-500">
                <XMarkIcon
                  class="stroke-red-500 w-4 group-hover:rotate-90 duration-1000 ease-in-out"
                />
              </div>
              <span class="text-red-500">Remove</span>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-6 mt-10"
          v-if="history === 0 && selected === 4"
        >
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Nama</th>
                  <th scope="col" class="px-6 py-3">Harga</th>
                  <th scope="col" class="px-6 py-3">Genre</th>
                  <th scope="col" class="px-6 py-3">Portofolio</th>
                  <th scope="col" class="px-6 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  v-for="el in historyPartner.bands"
                  :key="el.id"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ el.Name }}
                  </th>
                  <td class="px-6 py-4">{{ el.Price }}</td>
                  <td class="px-6 py-4">{{ el.Genre }}</td>
                  <td
                    class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <NuxtLink :to="el.portofolioLink"
                      >Klik melihat portofolio</NuxtLink
                    >
                  </td>
                  <td class="px-6 py-4">
                    <div
                      @click="deleteBand(el.id)"
                      class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Hapus
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
