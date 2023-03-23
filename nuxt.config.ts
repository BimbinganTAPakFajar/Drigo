// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/fontaine"],
  css: ["@/assets/css/style.css"],
  runtimeConfig: {
    STRAPI_BASE_URL: process.env.STRAPI_ENDPOINT,
  },
});
