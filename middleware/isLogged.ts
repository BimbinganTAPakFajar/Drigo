import { roundDate } from "v-calendar/dist/types/src/utils/date/helpers";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  if (token.value && to.path === "/login") {
    return navigateTo("/");
  }
});
