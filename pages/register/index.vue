<template>
  <div
    class="flex flex-col gap-20 items-center justify-center w-1/2 mx-auto min-h-screen"
  >
    <div
      class="w-full flex gap-6 items-center justify-between group cursor-pointer"
    >
      <NuxtLink to="/login" class="flex gap-6 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>

        <p class="group-hover:-ml-2 duration-300 ease-in-out">Back</p>
      </NuxtLink>

      <h1 class="text-2xl text-right uppercase font-semibold">
        We are <br />
        waiting for you
      </h1>
    </div>
    <form class="w-full">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Your email</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="username"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Username</label
        >
        <input
          v-model="username"
          type="text"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Your password</label
        >
        <input
          v-model="password"
          type="password"
          id="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            required
          />
        </div>
        <label for="terms" class="ml-2 text-sm font-medium text-gray-900"
          >I agree with the
          <a href="#" class="text-blue-600 hover:underline"
            >terms and conditions</a
          ></label
        >
      </div>
      <button
        type="button"
        @click.prevent="register"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Register new account
      </button>
    </form>
  </div>
</template>

<script setup>
let username = ref("");
let password = ref("");
let email = ref("");
const config = useRuntimeConfig();
async function register() {
  try {
    await $fetch(`${config.public.strapiEndpoint}/api/auth/local/register`, {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
        email: email.value,
        role: 2,
      },

      headers: {
        "content-type": "application/json",
      },
    });

    navigateTo("/login");
  } catch (error) {
    alert(error);
  }
}
</script>

<style></style>
