export default defineNuxtPlugin(async nuxtApp => {
  const store = useAppStore()
  const {getMyDistrict} = useFirebaseStore()
  addRouteMiddleware('auth', async (to, from) => {
    if (to.meta.layout === "app-default") {
      // If user is not signed in, we do not let him/her inside application
      if (!store.user) {
        console.log("navigating to signin");
        return navigateTo("/auth/sign-up")
      }
      // If user hasn't selected any district, we always redirect him/her to the district selection page
      else if (!store.user.districtId) {
        return navigateTo("/auth/select-district")
      }
      // If user is not the director of the district, he/she is not authorized to enter the create event page
      else if(to.name === "app-create-event"){
        const district = await getMyDistrict()
        console.log(district, store.user.id);
        if(district.director_id !== store.user.id){
          return navigateTo("/404")
        }
      }
      else {
        return
      }
    }
  }, { global: true });
})