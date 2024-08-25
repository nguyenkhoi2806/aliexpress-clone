export default defineNuxtRouteMiddleware((from, to) => {
  const user = useSupabaseUser();

  if (!user.value && (to.fullPath == '/checkout' || to.fullPath == '/orders')) {
    return navigateTo('/auth');
  }
});
