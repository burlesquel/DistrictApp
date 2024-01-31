<script setup>
import { useAppStore } from '@/stores/index';
import { setDoc, getDoc, doc } from "firebase/firestore"
useHead({ title: 'User Profile' });
const store = useAppStore();
const route = useRoute()
const firestore = useFirebaseStore()
const user_id = route.params.id
const user = ref(null)
const district = ref(null)
const pending = ref(null)

definePageMeta({
    layout: "app-default"
})
onMounted(async () => {
    user.value = await firestore.getUserById(user_id)
    district.value = await firestore.getDistrictMeta(user.value.districtId)
    pending.value = false
    console.log(district.value);
})
</script>

<template>
    <div v-if="pending" class="flex w-100 h-[20vh] justify-center items-center">
        <span
            class="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>
    </div>
    <div v-else-if="user">
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Users</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Profile</span>
            </li>
        </ul>
        <div class="pt-5">
            <div class="mb-5">
                <div class="panel">
                    <div class="mb-5 flex items-center justify-between">
                        <h5 class="text-lg font-semibold dark:text-white-light">Profile</h5>
                    </div>
                    <div class="mb-5">
                        <div class="flex flex-col items-center justify-center">
                            <img :src="user.photoURL ?? '/app/images/avatar-placeholder.jpg'" alt="" class="mb-5 h-24 w-24 rounded-full object-cover" />
                            <p class="text-xl font-semibold text-primary">{{ user.displayName }}</p>
                        </div>
                        <ul class="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                            <li v-if="user.job" class="flex items-center gap-2">
                                <icon-coffee class="shrink-0" />
                                {{ user.job }}
                            </li>
                            <li class="flex items-center gap-2">
                                <icon-calendar class="shrink-0" />
                                {{ user.created ?? new Date().toDateString() }}
                            </li>
                            <li class="flex items-center gap-2 capitalize">
                                <icon-map-pin class="shrink-0 " />
                                {{ district.city.name.toLowerCase() }} / {{ district.county.name.toLowerCase() }} 
                            </li>
                        </ul>
                        <ul class="mt-7 flex items-center justify-center gap-2">
                            <li>
                                <a class="btn btn-info flex h-10 w-10 items-center justify-center rounded-full p-0"
                                    href="javascript:;">
                                    <icon-twitter class="w-5 h-5" />
                                </a>
                            </li>
                            <li>
                                <a class="btn btn-danger flex h-10 w-10 items-center justify-center rounded-full p-0"
                                    href="javascript:;">
                                    <icon-dribbble />
                                </a>
                            </li>
                            <li>
                                <a class="btn btn-dark flex h-10 w-10 items-center justify-center rounded-full p-0"
                                    href="javascript:;">
                                    <icon-github />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
