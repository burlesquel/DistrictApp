<script setup>
import { useAppStore } from '@/stores/index';
import { useRouter } from 'vue-router';
useHead({ title: 'Login Boxed' });
const router = useRouter();
const store = useAppStore()
import json from './data.json'
definePageMeta({
    layout: 'app-auth',
});
const {getAllCities, setCounties, setDistricts, getCounties, getDistricts, selectDistrict} = useFirebaseStore()

let counties = ref(null)
let districts = ref(null)

const {data:cities, pending} = useAsyncData('cities', getAllCities, { server: false, lazy: false })

async function onCitySelection(e){
    let selectedCityId = e.target.value
    counties.value = await getCounties(selectedCityId)
}

async function onCountySelection(e){
    let selectedCountyId = e.target.value
    districts.value = await getDistricts(selectedCountyId)
}

async function onContinue(e){
    await selectDistrict(e.target.district.value)
    navigateTo("/app")
}



</script>

<template>
    <div>
        <div class="absolute inset-0">
            <img src="/app/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>
        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/app/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <img src="/app/images/auth/coming-soon-object1.png" alt="image"
                class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/app/images/auth/coming-soon-object2.png" alt="image"
                class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/app/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/app/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                <div
                    class="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">

                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 @click="setDistricts([json[0], json[1]])" class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">SELECT YOUR DISTRICT
                            </h1>
                            <p class="text-base font-bold leading-normal text-white-dark">Let us know your district so you can explore everything</p>
                        </div>
                        <form class="space-y-5 dark:text-white" @submit.prevent="onContinue">
                            <div>
                                <label for="Email">City</label>
                                <div class="relative text-white-dark">
                                    <select @input="onCitySelection" id="City">
                                        <option disabled selected>Please select your city</option>
                                        <template v-if="!pending">
                                            <option v-for="city of cities" :value="city.id">{{ city.name }}</option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                            <div v-if="counties">
                                <label for="Email">County</label>
                                <div class="relative text-white-dark">
                                    <select @input="onCountySelection" id="City">
                                        <option disabled selected>Please select your county</option>
                                        <option v-for="county of counties" :value="county.id">{{ county.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="districts">
                                <label for="Email">County</label>
                                <div class="relative text-white-dark">
                                    <select name="district" id="City">
                                        <option disabled selected>Please select your county</option>
                                        <option v-for="district of districts" :value="district.id">{{ district.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit"
                                class="btn btn-gradient mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
