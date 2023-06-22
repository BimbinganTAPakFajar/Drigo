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
const menu = ["Photographer", "Venue", "Catering", " Make Up Artist"];
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

  console.log(data);
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
            <NuxtLink to="" target="_blank">
              <Button
                :type="1"
                buttonText="Go To Form"
                @click.prevent="submit"
              />
            </NuxtLink>
          </div>
          <div class="flex flex-col items-start gap-6" v-if="selected === 2">
            <p class="flex gap-6 text-red-400 w-2/3">
              <ExclamationTriangleIcon class="w-1/12" /> Pastikan anda
              menggunakan email yang sama dengan akun partner pada website ini
              ketika mengisi form di google form.
            </p>
            <h1 class="font-semibold text-2xl">
              Tekan tombol dibawah untuk menuju form pendaftaran catering
            </h1>
            <NuxtLink to="" target="_blank">
              <Button
                :type="1"
                buttonText="Go To Form"
                @click.prevent="submit"
              />
            </NuxtLink>
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
      </div>
    </div>
  </div>
</template>
