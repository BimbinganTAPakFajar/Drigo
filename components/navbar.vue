<template>
  <div class="flex items-center justify-between w-[90%] mx-auto">
    <p>Wedding Organizer</p>

    <div class="flex items-center justify-center gap-6">
      <NuxtLink
        v-for="(el, idx) in listBar"
        :key="idx"
        :to="el.url"
        class="text-[#9C9C9C] hover:text-[#466BF3] duration-300 ease-in-out cursor-pointer"
      >
        <p v-if="idx === 5 && isAuth === undefined">
          <Button :type="1" :buttonText="el.name" />
        </p>
        <p v-else-if="idx === 3 && isAuth !== undefined">
          <Button :type="2" :buttonText="el.name" />
        </p>
        <p v-else-if="idx === 4 && isAuth === true" @click="logout">
          <Button :type="1" :buttonText="el.name" />
        </p>
        <p v-else-if="idx !== 4 && isAuth === undefined">
          {{ el.name }}
        </p>
        <p v-else-if="idx !== 5 && isAuth === true">
          {{ el.name }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
let isAuth = useCookie("isAuth");
let token = useCookie("token");
console.log(isAuth);

function logout() {
  isAuth.value = undefined;
  token.value = undefined;
}

const listBar = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Package",
    url: "/",
  },
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Become a partner",
    url: "/become-a-partner",
  },
  {
    name: "Logout",
    url: "/logout",
  },
  {
    name: "Login",
    url: "/login",
  },
];
</script>
