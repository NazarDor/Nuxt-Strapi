export default defineNuxtRouteMiddleware(async (to, from) => {
    const { user, fetchUser } = useAuth()

    if (to.path === '/login') {
        if (user.value) {
            return navigateTo('/');
        }
    }

    if (!user.value) {
        await fetchUser();
    }

    if (!user.value && to.path !== '/login') {
        return navigateTo('/login');
    }
});
