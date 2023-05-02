<template>
  <div
    v-if="type === 1"
    class="flex items-start aspect-[1/1.32] overflow-hidden bg-slate-300 hover:ring-2 ring-[#3258E8] ring-offset-8 p-10 rounded-xl duration-300 ease-in-out relative"
  >
    <div
      class="absolute left-0 bottom-0 w-full h-full bg-gradient-to-t from-black to-transparent z-0 opacity-80"
    ></div>
    <div class="self-end flex flex-col z-10">
      <h3 class="text-lg font-bold text-white">{{ props.package }}</h3>
      <p>
        Start From <span>{{ props.price }}</span> Rupiah
      </p>
    </div>
  </div>

  <div v-if="type === 2">
    <div class="shadow-lg py-8 px-10 rounded-lg flex flex-col gap-6">
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-semibold text-slate-600">
          Indonesian <br />
          Wedding
        </h1>
        <span class="text-slate-400 text-base"
          >Suitable for you who like <br />
          indonesian's wedding</span
        >
        <span class="text-sm text-slate-400 flex items-end gap-1">
          <span class="text-3xl font-semibold text-black">
            {{ price }}
          </span>
          Rupiah</span
        >
      </div>

      <ul class="flex flex-col gap-4 pt-6">
        <li
          v-for="(el, idx) in props.description"
          :key="idx"
          class="flex gap-6"
        >
          <CheckCircleIcon class="w-5 fill-[#3258E8]" />
          <span>{{ el }}</span>
        </li>
      </ul>

      <Button :type="4" button-text="View Package" />
    </div>
  </div>

  <div v-if="type === 3">
    <div
      class="shadow-lg py-8 px-10 rounded-lg flex flex-col gap-6 bg-[#14182B]"
    >
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-semibold text-white">
          Indonesian <br />
          Wedding
        </h1>
        <span class="text-base text-[#727583]"
          >Suitable for you who like <br />
          indonesian's wedding</span
        >
        <span class="text-sm text-[#727583] flex items-end gap-1">
          <span class="text-3xl font-semibold text-white">
            {{ price }}
          </span>
          Rupiah</span
        >
      </div>

      <ul class="flex flex-col gap-4 pt-6 text-[#727583]">
        <li
          v-for="(el, idx) in props.description"
          :key="idx"
          class="flex gap-6"
        >
          <CheckCircleIcon class="w-5 fill-[#EA349E] stroke-white" />
          <span>{{ el }}</span>
        </li>
      </ul>

      <Button :type="5" button-text="View Package" />
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  package: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  description: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
