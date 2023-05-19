<template>
  <div
    class="bg-base-100 rounded-box col-span-3 row-span-3 mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0"
  >
    <div>
      <div class="dropdown w-full">
        <div tabindex="0">
          <div class="text-center">
            <div class="text-lg font-extrabold">{{ name }}</div>
            <div class="text-base-content/70 my-3 text-sm">{{ job }}</div>
          </div>
        </div>
        <div tabindex="0" class="dropdown-content py-2">
          <div
            class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
          ></div>
        </div>
      </div>
      <div class="dropdown w-full">
        <div class="mt-2 text-center">
          <div class="text-justify">{{ skill }}</div>
        </div>
      </div>
    </div>
    <div class="dropdown dropdown-top">
      <div tabindex="0">
        <div class="btn-group">
          <button
            class="btn bg-gradient-pink/50 btn-sm border-gradient-pink/50"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  skill: {
    type: Array,
    required: true,
  },
});
</script>
