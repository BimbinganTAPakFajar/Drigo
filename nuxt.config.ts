// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/fontaine"],
  css: ["@/assets/css/style.css"],
  runtimeConfig: {
    public: {
      strapiEndpoint: process.env.STRAPI_ENDPOINT,
    },
  },
});
