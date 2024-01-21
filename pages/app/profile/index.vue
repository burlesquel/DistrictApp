<script setup>

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useAppStore } from '@/stores/index';
import Swal from 'sweetalert2';
useHead({ title: 'Account Setting' });
const store = useAppStore();
const { $auth } = useNuxtApp()
const { getAllCities, getCounties, getDistricts, updateUser, updateProfilePhoto } = useFirebaseStore()
definePageMeta({
    layout: "app-default"
})
const [city_id, county, district] = store.user.districtId.split("-")

const currentName = ref(store.user.displayName)
const currentPhone = ref(store.user.phoneNumber)
const currentJob = ref(store.user.job)
const selectedCity = ref(city_id)
const selectedCounty = ref(`${city_id}-${county}`)
const selectedDistrict = ref(store.user.districtId)

let { data: cities, city_pending } = useAsyncData('cities', getAllCities, { server: false, lazy: false })
let { data: counties, county_pending } = useAsyncData('counties', async () => { return await getCounties(selectedCity.value) }, { server: false, lazy: false, watch: [selectedCity] })
let { data: districts, district_pending } = useAsyncData('districts', async () => { return await getDistricts(selectedCounty.value) }, { server: false, lazy: false, watch: [selectedCounty] })

async function onSave() {
    console.log(selectedDistrict.value);
    await updateUser(store.user.id, {
        districtId: selectedDistrict.value,
        displayName: currentName.value,
        phoneNumber: currentPhone.value ?? "",
        job: currentJob.value ?? ""
    })
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: false,
    });
    toast.fire({
        title: "Your profile has been updated.",
    });
}

const imageInput = ref(null)

async function onPhotoChange(e) {
    const file = e.target.files[0]
    await updateProfilePhoto(file)
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: false,
    });
    toast.fire({
        title: "Profile picture has been successfully updated.",
    });
}

</script>

<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Users</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Account Settings</span>
            </li>
        </ul>
        <div class="pt-5">
            <div class="mb-5 flex items-center justify-between">
                <h5 class="text-lg font-semibold dark:text-white-light">Settings</h5>
            </div>
            <TabGroup>
                <div class="flex flex-row gap-5">
                    <TabList
                        class="w-1/5 mb-5 flex flex-col overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a]">
                        <Tab as="template" v-slot="{ selected }">
                            <a href="javascript:;"
                                class="flex gap-2 border-b border-transparent p-4 !outline-none hover:text-primary"
                                :class="{ '!border-primary text-primary': selected }">
                                <icon-home />
                                Home
                            </a>
                        </Tab>
                        <Tab as="template" v-slot="{ selected }">
                            <a href="javascript:;"
                                class="flex gap-2 border-b border-transparent p-4 !outline-none hover:text-primary"
                                :class="{ '!border-primary text-primary': selected }">
                                <icon-user class="w-5 h-5" />
                                Preferences
                            </a>
                        </Tab>
                        <Tab as="template" v-slot="{ selected }">
                            <a href="javascript:;"
                                class="flex gap-2 border-b border-transparent p-4 !outline-none hover:text-primary"
                                :class="{ '!border-primary text-primary': selected }">
                                <icon-phone />
                                Danger Zone
                            </a>
                        </Tab>
                    </TabList>
                    <TabPanels class="w-4/5">
                        <TabPanel>
                            <div>
                                <form @submit.prevent="onSave"
                                    class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                    <h6 class="mb-5 text-lg font-bold">General Information</h6>
                                    <div class="flex flex-col sm:flex-row">
                                        <div class="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4 relative">
                                            <input @input="onPhotoChange" ref="imageInput" hidden type="file"
                                                accept=".jpg,.png,.jpeg" class="w-100 h-100 absolute">
                                            <img @click="imageInput.click()"
                                                :src="store.user.photoURL ?? '/app/images/avatar-placeholder.jpg'" alt=""
                                                class="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32" />
                                        </div>
                                        <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label for="name">Full Name</label>
                                                <input required v-model="currentName" id="name" type="text"
                                                    placeholder="Your full name" class="form-input" />
                                            </div>
                                            <div>
                                                <label for="phone">Phone</label>
                                                <input v-model="currentPhone" id="phone" type="text"
                                                    placeholder="+1 (530) 555-12121" class="form-input" />
                                            </div>
                                            <div>
                                                <label for="email">Email</label>
                                                <input required id="email" type="email" placeholder="Jimmy@gmail.com"
                                                    class="form-input" disabled :value="store.user.email" />
                                            </div>
                                            <div>
                                                <label for="Job">Job</label>
                                                <input v-model="currentJob" id="Job" type="text" placeholder="Your job"
                                                    class="form-input" />
                                            </div>
                                            <div>
                                                <label for="web">City</label>
                                                <span v-if="city_pending"
                                                    class="animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>
                                                <select v-else-if="cities" required v-model="selectedCity" class=""
                                                    name="city" id="">
                                                    <option></option>
                                                    <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label for="web">County</label>
                                                <span v-if="county_pending"
                                                    class="animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>
                                                <select v-else-if="counties" required v-model="selectedCounty" name=""
                                                    id="">
                                                    <option value="Select a county"></option>
                                                    <option v-for="county in counties" :value="county.id">{{ county.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label for="web">District</label>
                                                <span v-if="district_pending"
                                                    class="animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>
                                                <select v-else-if="districts" required v-model="selectedDistrict" name=""
                                                    id="">
                                                    <option value="">Select a district</option>
                                                    <option v-for="district in districts" :value="district.id">{{
                                                        district.name }}</option>
                                                </select>
                                            </div>
                                            <div class="mt-3 sm:col-span-2">
                                                <button type="submit" class="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="switch">
                                <div class="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    <div class="panel space-y-5">
                                        <h5 class="mb-4 text-lg font-semibold">Choose Theme</h5>
                                        <div class="flex justify-around">
                                            <label class="inline-flex cursor-pointer">
                                                <input class="form-radio cursor-pointer ltr:mr-4 rtl:ml-4" type="radio"
                                                    name="flexRadioDefault" checked />
                                                <span>
                                                    <img class="ms-3" width="100" height="68" alt="settings-dark"
                                                        src="/app/images/settings-light.svg" />
                                                </span>
                                            </label>

                                            <label class="inline-flex cursor-pointer">
                                                <input class="form-radio cursor-pointer ltr:mr-4 rtl:ml-4" type="radio"
                                                    name="flexRadioDefault" />
                                                <span>
                                                    <img class="ms-3" width="100" height="68" alt="settings-light"
                                                        src="/app/images/settings-dark.svg" />
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
                                    <div class="panel space-y-5">
                                        <h5 class="mb-4 text-lg font-semibold">Public Profile</h5>
                                        <p>Your <span class="text-primary">Profile</span> will be visible to anyone on the
                                            network.</p>
                                        <label class="relative h-6 w-12">
                                            <input type="checkbox"
                                                class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                id="custom_switch_checkbox1" />
                                            <span for="custom_switch_checkbox1"
                                                class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="mb-4 text-lg font-semibold">Show my email</h5>
                                        <p>Your <span class="text-primary">Email</span> will be visible to anyone on the
                                            network.</p>
                                        <label class="relative h-6 w-12">
                                            <input type="checkbox"
                                                class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                id="custom_switch_checkbox2" />
                                            <span for="custom_switch_checkbox2"
                                                class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="switch">
                                <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
                                    <div class="panel space-y-5">
                                        <h5 class="mb-4 text-lg font-semibold">Deactivate Account</h5>
                                        <p>You will not be able to receive messages, notifications for up to 24 hours.</p>
                                        <label class="relative h-6 w-12">
                                            <input type="checkbox"
                                                class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                id="custom_switch_checkbox7" />
                                            <span for="custom_switch_checkbox7"
                                                class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="mb-4 text-lg font-semibold">Delete Account</h5>
                                        <p>Once you delete the account, there is no going back. Please be certain.</p>
                                        <button class="btn btn-danger btn-delete-account">Delete my account</button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </div>
        </TabGroup>
    </div>
</div></template>
