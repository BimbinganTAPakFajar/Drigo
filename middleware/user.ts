export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  const role = useCookie("role");

  if (token.value && role.value == "3" && to.path == "/become-a-partner") {
    return navigateTo("/");
  } else if (
    token.value &&
    role.value == "4" &&
    to.path == "/become-a-partner"
  ) {
    return navigateTo("/admin");
  }
});
