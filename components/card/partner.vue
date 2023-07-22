<script setup>
import { XMarkIcon, PencilIcon } from "@heroicons/vue/24/outline";
const config = useRuntimeConfig();
const props = defineProps({
  experience: {
    type: Number,
  },
  price: {
    type: Number,
  },
  Skills: {
    type: String,
  },
  id: {
    type: Number,
  },
  token: {
    type: String,
  },
  address: {
    type: String,
    reqruied: true,
  },
  capacity: {
    type: Number,
  },
  city: {
    type: String,
  },

  province: {
    type: String,
  },
  venueName: {
    type: String,
  },
  type: {
    type: Number,
  },
  cateringName: {
    type: String,
  },
  cateringLocation: {
    type: String,
  },
  cateringFood: {
    type: Object,
  },
});

const totalPrice = computed({
  get() {
    if (props.price !== undefined)
      return Math.ceil(props.price + props.price * 0.03);
  },
});

const emit = defineEmits({
  refresh: (data) => {
    return data;
  },
});
function remove(id) {
  if (props.type === 1) {
    $fetch(`${config.public.strapiEndpoint}/photographers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
  } else if (props.type === 2) {
    $fetch(`${config.public.strapiEndpoint}/venues/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
  } else {
    $fetch(`${config.public.strapiEndpoint}/caterings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
  }
  location.reload();
  emit("refresh", true);
}
</script>

<template>
  <div
    v-if="type === 1"
    class="flex p-6 items-center justify-between w-full shadow-lg shadow-black/15 rounded-xl"
  >
    <div class="flex flex-col gap-2">
      <h1 class="font-semibold text-xl">Experience</h1>
      <span>{{ experience }} Years </span>
    </div>

    <div class="flex flex-col gap-2">
      <h1 class="font-semibold text-xl">Price</h1>
      <span>{{ price }}</span>
    </div>

    <div class="flex flex-col gap-2">
      <h1 class="font-semibold text-xl">Skills</h1>
      <span>{{ Skills }}</span>
    </div>
    <div class="w-[1px] bg-black/20 h-14 rounded-full"></div>

    <div class="flex items-center gap-4">
      <span>Total Price</span>
      <span class="text-2xl font-semibold"
        >{{ totalPrice }} <span class="text-base font-normal">Rupiah</span>
      </span>
    </div>
    <div
      class="flex items-center gap-2 cursor-pointer group"
      @click="remove(id)"
    >
      <div class="border-[1px] border-red-500">
        <XMarkIcon
          class="stroke-red-500 w-4 group-hover:rotate-90 duration-1000 ease-in-out"
        />
      </div>
      <span class="text-red-500">Remove</span>
    </div>
  </div>

  <div
    v-if="type === 2"
    class="flex p-6 items-center justify-between w-full shadow-lg shadow-black/15 rounded-xl"
  >
    <div class="flex flex-col gap-10">
      <div class="flex gap-20 items-center">
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold text-xl">Venue Name</h1>
          <span>{{ venueName }} </span>
        </div>

        <div class="flex flex-col gap-2">
          <h1 class="font-semibold text-xl">Capacity</h1>
          <span>{{ capacity }} People</span>
        </div>

        <div class="flex flex-col gap-2">
          <h1 class="font-semibold text-xl">price</h1>
          <span>{{ price }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="font-semibold text-xl">Full Address</h1>
        <span>{{ address }} , {{ city }} , {{ province }}</span>
      </div>
    </div>

    <div class="w-[1px] bg-black/20 h-14 rounded-full"></div>

    <div class="flex items-center gap-4">
      <span>Total Price</span>
      <span class="text-2xl font-semibold"
        >{{ totalPrice }} <span class="text-base font-normal">Rupiah</span>
      </span>
    </div>
    <div
      class="flex items-center gap-2 cursor-pointer group"
      @click="remove(id)"
    >
      <div class="border-[1px] border-red-500">
        <XMarkIcon
          class="stroke-red-500 w-4 group-hover:rotate-90 duration-1000 ease-in-out"
        />
      </div>
      <span class="text-red-500">Remove</span>
    </div>
  </div>

  <div
    class="flex flex-col p-6 w-full shadow-lg shadow-black/15 rounded-xl gap-10"
    v-if="type === 3"
  >
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-10">
        <div class="flex gap-20 items-center">
          <div class="flex flex-col gap-2">
            <h1 class="font-semibold text-xl">Nama Katering</h1>
            <span>{{ cateringName }} </span>
          </div>

          <div class="flex flex-col gap-2">
            <h1 class="font-semibold text-xl">Lokasi Katering</h1>
            <span>{{ cateringLocation }}</span>
          </div>
        </div>
      </div>

      <div
        class="flex items-center gap-2 cursor-pointer group"
        @click="remove(id)"
      >
        <div class="border-[1px] border-red-500">
          <XMarkIcon
            class="stroke-red-500 w-4 group-hover:rotate-90 duration-1000 ease-in-out"
          />
        </div>
        <span class="text-red-500">Hapus</span>
      </div>
    </div>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Nama Makanan</th>
            <th scope="col" class="px-6 py-3">Harga / Satuan</th>
            <th scope="col" class="px-6 py-3">Stok</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for="el in cateringFood" :key="el.id">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ el.food }}
            </th>
            <td class="px-6 py-4">{{ el.price }}</td>
            <td class="px-6 py-4">{{ el.stok }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
