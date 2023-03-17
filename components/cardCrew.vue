<template>
  <div
    class="bg-base-100 rounded-box col-span-3 row-span-3 mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0"
  >
    <div class="dropdown">
      <div tabindex="0">
        <div class="avatar">
          <div
            class="mask mask-squircle bg-base-content h-24 w-24 bg-opacity-10 p-px"
          >
            <img
              src="/assets/albert.jpg"
              width="94"
              height="94"
              alt=""
              class="mask mask-squircle"
            />
          </div>
        </div>
      </div>
    </div>
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
        <div tabindex="0">
          <div class="mt-2 text-center" v-for="(el, idx) in skill" :key="idx">
            <div class="badge badge-ghost">{{ el }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown dropdown-top">
      <div tabindex="0">
        <div class="btn-group">
          <button class="btn bg-[#725AE4] btn-sm border-[#725AE4]">
            Follow
          </button>
          <button
            aria-label="button component"
            class="btn bg-[#725AE4] btn-square btn-sm border-[#725AE4]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
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
