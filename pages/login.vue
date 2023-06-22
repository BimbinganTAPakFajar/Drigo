<template>
  <div class="flex flex-col">
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
          <label class="">Email</label>
          <input
            v-model="formData.email"
            type="text"
            placeholder="Username"
            class="text-sm w-96 pr-4 pl-2 focus:pl-6 py-2 rounded-md focus:ring-0 duration-300 ease-in-out focus:border-0"
            @change="v$.email.$touch"
          />
          <div class="text-red-500 text-sm pl-2" v-if="v$.email.$error">
            <div>Please fill the username field</div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <label class="">Password</label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Password"
            class="text-sm w-96 py-2 pr-4 pl-2 focus:pl-6 rounded-md focus:ring-0 focus:ring-black duration-300 ease-in-out focus:border-0"
            @change="v$.password.$touch"
          />
          <div class="text-red-500 text-sm pl-2" v-if="v$.password.$error">
            <div>Please fill the password</div>
          </div>
        </div>
        <div class="flex w-full items-center justify-center gap-6">
          <button
            :disabled="v$.password.$error || v$.email.$error"
            @click="submit"
            :class="{
              'bg-[#3258E8]': !v$.password.$error || !v$.email.$error,
              'bg-gray-500': v$.password.$error || v$.email.$error,
            }"
            class="text-white rounded-xl focus:bg-[#2847BE] px-6 py-3 w-full"
          >
            Login
          </button>
          <NuxtLink
            to="/register"
            class="px-6 py-3 bg-transparent duration-300 ease-in-out text-[#7B7B7B] focus:text-black hover:ring-2 ring-[#3258E8] rounded-xl w-3/4"
          >
            Register
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Buffer } from "buffer";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";

definePageMeta({
  layout: "index",
  middleware: "is-logged",
});

const config = useRuntimeConfig();
const token = useCookie(
  "token"
  //  {
  //   // maxAge: 60 * 10,
  //   }
);
const isAdmin = useCookie("isAdmin");
let isAuth = useCookie(
  "isAuth"
  //  {
  //   // maxAge: 60 * 10,
  //   }
);

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

async function submit() {
  await $fetch(`${config.public.strapiEndpoint}/auth/local`, {
    body: {
      identifier: formData.email,
      password: formData.password,
    },
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    (token.value = res.jwt),
      (isAuth.value = true),
      console.log(
        Buffer.from(res.user.isAdmin.toString(), "utf8").toString("base64")
      );
    isAdmin.value = Buffer.from(res.user.isAdmin.toString(), "utf8").toString(
      "base64"
    );
    if (res.user.isAdmin) {
      navigateTo("/admin");
    } else {
      navigateTo("/"), onBeforeRouteUpdate(() => location.reload());
    }
  });
}
</script>
