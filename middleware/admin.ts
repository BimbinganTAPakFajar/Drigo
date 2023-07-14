export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  const role = useCookie("role");

  if (token.value && role.value != "4") {
    return navigateTo("/");
  }
});
