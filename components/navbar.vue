<template>
  <Teleport to="body">
    <div
      v-if="open === true"
      class="fixed bg-black/50 backdrop-blur-sm z-40 w-full min-h-screen text-white flex items-center justify-center"
    >
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="p-6 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to logout ?
            </h3>
            <button
              @click="logout"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Yes, I'm Sure
            </button>
            <button
              @click="open = false"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <div class="flex items-center justify-between w-full mx-auto py-14 z-10">
    <NuxtLink to="/" class="w-1/12 cursor-pointer">
      <img src="/assets/blissful.png" alt="" class="w-full" />
    </NuxtLink>

    <div class="flex items-center justify-center gap-6">
      <NuxtLink
        v-for="(el, idx) in filteredBar"
        :key="idx"
        :to="el.url"
        class="text-[#9C9C9C] hover:text-[#466BF3] duration-300 ease-in-out cursor-pointer"
      >
        {{ el.name }}
      </NuxtLink>
    </div>

    <NuxtLink
      v-if="!token"
      to="/login"
      class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
    >
      Login
    </NuxtLink>

    <div
      v-else
      @click="open = true"
      class="cursor-pointer bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-auto"
    >
      Logout
    </div>
  </div>
</template>

<script setup>
const isAuth = useCookie("isAuth");
const token = useCookie("token");
const role = useCookie("role");

const open = ref(false);

function logout() {
  isAuth.value = undefined;
  token.value = undefined;
  role.value = undefined;
  open.value = false;
  location.reload();
}

const listBar = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Paket",
    url: "/package",
  },
  {
    name: "Tentang Kami",
    url: "/about",
  },
  {
    name: "Jadi Partner",
    url: "/become-a-partner",
  },
];

const filteredBar = computed(() => {
  if (role.value == 3) {
    return listBar.filter(
      (el) => !(el.name === "Jadi Partner" && role.value == 3)
    );
  } else return listBar;
});
</script>
