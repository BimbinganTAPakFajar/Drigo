export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  if (to.path === "/login") {
    return;
  }

  if (!token.value) {
    return navigateTo("/login");
  }
});
