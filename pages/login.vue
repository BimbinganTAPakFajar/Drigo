<template>
  <div class="flex flex-col">
    <Navbar class="pt-10" />

    <section
      class="w-full body-font flex justify-center items-center min-h-screen gap-64"
    >
      <h1 class="text-5xl font-bold">
        Welcome, <br />
        <span class="motion-safe:animate-pulse">We're</span> Waiting for you!
      </h1>

      <div
        class="p-8 bg-gray-200 rounded-xl flex flex-col gap-10 hover:drop-shadow-sm duration-300 ease-in-out"
      >
        <p class="text-2xl font-semibold">Login to your account!</p>
        <div class="flex flex-col gap-3">
          <label class="">Username</label>
          <input
            v-model="identifier"
            type="text"
            placeholder="Username"
            class="text-sm w-96 pr-4 pl-2 focus:pl-6 py-2 rounded-md focus:ring-0 duration-300 ease-in-out focus:border-0"
          />
          <div class="text-red-500 text-sm pl-2">
            <div>Please fill the username field</div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <label class="">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="text-sm w-96 py-2 pr-4 pl-2 focus:pl-6 rounded-md focus:ring-0 focus:ring-black duration-300 ease-in-out focus:border-0"
          />
          <div class="text-red-500 text-sm pl-2">
            <div>Please fill the password</div>
          </div>
        </div>
        <div class="flex w-full items-center justify-center gap-6">
          <button
            @click="submit"
            class="bg-[#3258E8] text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-full"
          >
            Login
          </button>
          <button
            class="px-6 py-3 bg-transparent duration-300 ease-in-out text-[#7B7B7B] focus:text-black hover:ring-2 ring-[#3258E8] rounded-xl w-3/4"
          >
            Register
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const token = useCookie("token", {
  maxAge: 60 * 10,
});
let isAuth = useCookie("isAuth");
// const config = useRuntimeConfig();
let password = ref("asd@asd.com");
let identifier = ref("password");

async function submit() {
  const data = await $fetch(`${config.strapiEndpoint}/auth/local`, {
    body: {
      // identifier: identifier.value,
      // password: password.value,
      identifier: "asd@asd.com",
      password: "password",
    },
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
  token.value = data.jwt;
  isAuth.value = true;
  navigateTo("/");
}
</script>

<script></script>

<style scoped></style>
