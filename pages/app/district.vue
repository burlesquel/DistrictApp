<script setup>
import { ref } from 'vue';
useHead({ title: 'Invoice Preview' });
definePageMeta({
    layout: "app-default"
})
const store = useAppStore()
const { getDistrictMeta, updateDistrictPreview } = useFirebaseStore()

// getDistrictMeta()
let { data: district, pending, refresh } = useAsyncData('cities', getDistrictMeta, { server: false, lazy: false })

const previewInput = ref(null)

const onImageSelection = async (e) => {
    if (district.director_id === store.user.id) {
        let file = e.target.files[0]
        await updateDistrictPreview(district.value.id, file)
        await refresh()
    }
}
console.log(district);
</script>

<template>
    <div v-if="!pending">
        <div v-if="store.user.isDirector" class="mb-5 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
            <button type="button" class="btn btn-info gap-2">
                <icon-send />
                Send Invoice
            </button>

            <button type="button" class="btn btn-primary gap-2" @click="print">
                <icon-printer />
                Print
            </button>

            <button type="button" class="btn btn-success gap-2">
                <icon-download />
                Download
            </button>

            <NuxtLink to="/apps/invoice/add" class="btn btn-secondary gap-2">
                <icon-plus />
                Create
            </NuxtLink>

            <NuxtLink to="/apps/invoice/edit" class="btn btn-warning gap-2">
                <icon-edit />
                Edit
            </NuxtLink>
        </div>
        <div class="panel">
            <div class="flex flex-col-reverse gap-4 md:flex-row justify-between">
                <div class="flex flex-col justify-between items-start gap-4 px-4 w-full md:w-1/2">
                    <div>
                        <div class="text-2xl font-semibold uppercase">{{ district.name }}</div>
                        <div class="text-lg uppercase">{{ district.city.name }} - {{ district.county.name }}</div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400  text-white min-w-32">
                            <div class="flex justify-between">
                                <div class="text-md font-semibold ltr:mr-1 rtl:ml-1"><icon-menu-users />Resident</div>
                            </div>
                            <div class="mt-5 flex items-center">
                                <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ district.numOfPeople }}</div>
                            </div>
                        </div>
                        <div class="panel bg-gradient-to-r from-violet-500 to-violet-400 text-white min-w-32">
                            <div class="flex justify-between">
                                <div class="text-md font-semibold ltr:mr-1 rtl:ml-1"><icon-user-plus />Muhtar</div>
                            </div>
                            <div v-if="district.director" class="mt-5 flex items-center gap-2">
                                <img class="h-8 w-8 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    :src="district.director.photoURL ?? '/app/images/avatar-placeholder.jpg'" alt="" />
                                <div class="text-2xl font-semibold ltr:mr-3 rtl:ml-3">{{ district.director.displayName }}
                                </div>
                            </div>
                            <div class="mt-5 flex flex-col justify-center" v-else>
                                <span class="text-xs">This district hasn't any director yet.</span>
                                <div class="text-xl font-bold ltr:mr-3 rtl:ml-3">Click to apply</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2 relative">
                    <img class="h-[360px] w-full object-cover object-bottom"
                        :src="district.previewURL ?? '/app/images/district-placeholder.jpg'" alt="" srcset="">
                    <div v-if="district.director_id === store.user.id" @click="previewInput.click()"  class="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-opacity-25 bg-black opacity-0 hover:opacity-100 cursor-pointer">
                        <icon-camera class="text-white w-20 h-20"/>
                        <input @input="onImageSelection" ref="previewInput"
                            hidden type="file" name="" id="">
                    </div>

                </div>
            </div>

            <hr class="my-6 border-[#e0e6ed] dark:border-[#1b2e4b]" />
            <div class="flex flex-col flex-wrap justify-between gap-6 lg:flex-row">
                <div class="flex-1">
                    <div class="space-y-1 text-white-dark">
                        <div>Issue For:</div>
                        <div class="font-semibold text-black dark:text-white">John Doe</div>
                        <div>405 Mulberry Rd. Mc Grady, NC, 28649</div>
                        <div>redq@company.com</div>
                        <div>(128) 666 070</div>
                    </div>
                </div>
                <div class="flex flex-col justify-between gap-6 sm:flex-row lg:w-2/3">
                    <div class="xl:1/3 sm:w-1/2 lg:w-2/5">
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">Invoice :</div>
                            <div>#8701</div>
                        </div>
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">Issue Date :</div>
                            <div>13 Sep 2022</div>
                        </div>
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">Order ID :</div>
                            <div>#OD-85794</div>
                        </div>
                        <div class="flex w-full items-center justify-between">
                            <div class="text-white-dark">Shipment ID :</div>
                            <div>#SHP-8594</div>
                        </div>
                    </div>
                    <div class="xl:1/3 sm:w-1/2 lg:w-2/5">
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">Bank Name:</div>
                            <div class="whitespace-nowrap">Bank Of America</div>
                        </div>
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">Account Number:</div>
                            <div>1234567890</div>
                        </div>
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">SWIFT Code:</div>
                            <div>S58K796</div>
                        </div>
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">IBAN:</div>
                            <div>L5698445485</div>
                        </div>
                        <div class="mb-2 flex w-full items-center justify-between">
                            <div class="text-white-dark">Country:</div>
                            <div>United States</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="w-100 h-80 flex justify-center items-center">
        <span
            class="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-20 h-20"></span>
    </div>
</template>
