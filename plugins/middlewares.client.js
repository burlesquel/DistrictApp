export default defineNuxtPlugin(async nuxtApp => {
    const config = useRuntimeConfig()
    const store = useAppStore()
    addRouteMiddleware('auth', async (to, from) => {
        if(to.meta.layout === "app-default"){
            if(!store.user){
              console.log("navigating to signin");
              return navigateTo("/auth/sign-up")
            }
            else if(!store.user.districtId){
              return navigateTo("/auth/select-district")
            }
            else{
              return
            }
          }
    }, { global: true });
})