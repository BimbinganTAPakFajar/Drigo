// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    // "@nuxtjs/html-validator",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/content",
    "@vueuse/nuxt",
  ],
  css: ["@/assets/css/style.css"],
  runtimeConfig: {
    public: {
      strapiEndpoint: process.env.STRAPI_ENDPOINT,
      midtransClientKey: process.env.MIDTRANS_CLIENT_KEY,
      midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
      accountSID: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    },
  },
});
