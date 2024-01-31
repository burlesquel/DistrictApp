<script setup>
import { ref, computed, onMounted } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import 'vue3-quill/lib/vue3-quill.css';
import Swal from 'sweetalert2';
import { useAppStore } from '@/stores/index';
import LoadingSpinner from '~/components/loading.vue';
import Event from '~/components/app/Event.vue';
const router = useRouter()

useHead({ title: 'Mailbox' });
const store = useAppStore();
const { getEvents, getMyDistrict, deleteEvent, attendEvent, leaveEvent, getSingleEvent } = useFirebaseStore()

definePageMeta({
    layout: "app-default"
})
const events = ref([])
const currentPage = ref(0)
const totalPageNum = ref(9999)
const loading = ref('init')
const selectedTab = ref(null);
const district = ref(null)

const notification = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 2000,
    showCloseButton: false,
});

async function onNextPage() {
    currentPage.value = currentPage.value + 1
}
async function onPrevPage() {
    currentPage.value = currentPage.value - 1
}

async function refreshData() {
    loading.value = true
    let lastElem;
    if (currentPage.value !== 0) {
        let prevPage = events.value[currentPage.value ? currentPage.value - 1 : currentPage.value]
        lastElem = prevPage[prevPage.length - 1]
    }
    let data = await getEvents(store.user.districtId, { nextPage: lastElem, type: selectedTab.value })
    events.value[currentPage.value] = data.docs
    loading.value = false
}

watch(currentPage, async function (toPage, fromPage) {
    let dataExists = events.value[toPage]
    if (!dataExists) {
        loading.value = true
        let prevPage = events.value[fromPage]
        let lastElem = prevPage[prevPage.length - 1]
        let data = await getEvents(store.user.districtId, { nextPage: lastElem, type: selectedTab.value })
        if (data.size === 0) {
            totalPageNum.value = fromPage
            currentPage.value = fromPage
            loading.value = false
            return;
        }
        if (data.size < 12) {
            totalPageNum.value = toPage
        }
        events.value[toPage] = data.docs
        loading.value = false
    }
})

watch(selectedTab, async () => {
    selectedEvent.value = null
    events.value = []
    currentPage.value = 0
    totalPageNum.value = 9999
    loading.value = true
    let data = await getEvents(store.user.districtId, { type: selectedTab.value })
    events.value.push(data.docs)
    loading.value = false
})

watch(router.currentRoute, (to) => {
    selectedTab.value = to.query.type
})

const currentEvents = computed(() => {
    let currentPageData = events.value[currentPage.value]
    if (currentPageData) {
        return Array.from(currentPageData, data => { return { ...data.data(), id: data.id } })
    }
    else {
        return []
    }
})

watch(currentEvents, () => {
    if (currentEvents.value.length < 12) {
        totalPageNum.value = currentPage.value
    }
})

onMounted(async () => {
    let type = router.currentRoute.value.query.type
    district.value = await getMyDistrict()
    if (type) {
        selectedTab.value = type
    }
    else {
        let data = await getEvents(store.user.districtId)
        events.value.push(data.docs)
    }
    loading.value = false
})

async function refreshSingleEvent(event_id) {
    let refreshed = await getSingleEvent(event_id)
    let index = events.value[currentPage.value].findIndex(event => event.id === event_id)
    events.value[currentPage.value][index] = refreshed
}

async function onAttendEvent(event_id) {
    await attendEvent(event_id)
    notification.fire({
        title: "You have successfully joined to the event!",
    });
    await refreshSingleEvent(event_id)
}

async function onLeaveEvent(event_id) {
    await leaveEvent(event_id)
    notification.fire({
        title: "You have left the event.",
    });
    await refreshSingleEvent(event_id)
}

async function onDeleteEvent(event_id) {
    const toast = Swal.mixin({
        showConfirmButton: true,
        showCancelButton: true,
        text: "This post will be deleted irreversably. Are you sure?",
    })
    toast.fire().then(async action => {
        if (action.isConfirmed) {
            await deleteEvent(event_id)
            await refreshData()
        }
    })
}

// The below code is for managing 

const selectedEventId = ref(null)
const selectedEvent = computed(() => {
    if(currentEvents.value.length > 0){
        return currentEvents.value.find(event => event.id === selectedEventId.value)
    }
})

</script>


<template>
    <div>
        <LoadingSpinner v-if="loading === 'init'" class="w-full h-[70vh]" />
        <div v-else class="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
            <div v-if="district.director_id === store.user.id"
                class="panel dark:gray-50 absolute z-10 hidden h-full w-[250px] max-w-full flex-none space-y-3 overflow-hidden p-4 ltr:rounded-r-none rtl:rounded-l-none xl:relative xl:block xl:h-auto ltr:xl:rounded-r-md rtl:xl:rounded-l-md">
                <div class="flex h-full flex-col pb-16">
                    <div class="pb-5">
                        <NuxtLink to="/app/create-event" class="btn btn-primary w-full" type="button">New Event</NuxtLink>
                    </div>
                </div>
            </div>
            <LoadingSpinner v-if="loading" class="w-full h-[70vh]" />
            <div v-else class="panel h-full flex-1 overflow-x-hidden p-0">
                <div v-show="!selectedEvent" class="flex h-full flex-col">
                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                    <div class="flex flex-col flex-wrap items-center justify-between p-4 md:flex-row xl:w-auto">
                        <div v-if="false" class="mt-4 grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
                            <button type="button" class="btn btn-outline-primary flex"
                                :class="{ 'bg-primary text-white': selectedTab === 'personal' }"
                                @click="tabChanged('personal')">
                                <icon-user class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                Personal
                            </button>

                            <button type="button" class="btn btn-outline-warning flex"
                                :class="{ 'bg-warning text-white': selectedTab === 'work' }" @click="tabChanged('work')">
                                <icon-message-2 class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                Work
                            </button>

                            <button type="button" class="btn btn-outline-success flex"
                                :class="{ 'bg-success text-white': selectedTab === 'social' }"
                                @click="tabChanged('social')">
                                <icon-users class="ltr:mr-2 rtl:ml-2" />
                                Social
                            </button>

                            <button type="button" class="btn btn-outline-danger flex"
                                :class="{ 'bg-danger text-white': selectedTab === 'private' }"
                                @click="tabChanged('private')">
                                <icon-tag class="ltr:mr-2 rtl:ml-2" />
                                Private
                            </button>
                        </div>
                        <div class="d-flex flex-row justify-center items-center" v-else>
                            <span class="font-bold text-[1rem]">EVENTS IN {{ district.name }}</span>
                        </div>
                        <div class="flex-1 md:flex-auto">
                            <div class="flex items-center justify-center md:justify-end">
                                <button @click="onPrevPage" :disabled="currentPage === 0" type="button"
                                    class="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 ltr:mr-3 rtl:ml-3 dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30">
                                    <icon-caret-down class="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                </button>
                                <button @click="onNextPage" :disabled="currentPage === totalPageNum" type="button"
                                    class="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30">
                                    <icon-caret-down class="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                    <template v-if="currentEvents.length">
                        <div
                            class="min-h-[400px] sm:min-h-[300px] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            <template v-for="event in currentEvents" :key="event.id">
                                <div @click="selectedEventId = event.id" class="panel cursor-pointer" :class="{
                                    'bg-primary-light shadow-primary': event.tag === 'personal',
                                    'bg-warning-light shadow-warning': event.tag === 'work',
                                    'bg-info-light shadow-info': event.tag === 'social',
                                    'bg-danger-light shadow-danger': event.tag === 'important',
                                    'dark:shadow-dark': !event.tag,
                                }">
                                    <div class="min-h-[142px]">
                                        <div class="flex justify-between flex-col gap-4 ">
                                            <div class="flex w-max items-center">
                                                <div class="flex-none">
                                                    <div class="rounded-full bg-gray-300 p-0.5 dark:bg-gray-700">
                                                        <img class="h-8 w-8 rounded-full object-cover"
                                                            :src="district.preview_url ?? '/app/images/district-placeholder.jpg'" />
                                                    </div>
                                                </div>
                                                <div class="ltr:ml-2 rtl:mr-2">
                                                    <div class="font-semibold">{{ district.name }}</div>
                                                    <div class="text-sx text-white-dark">{{
                                                        event.created.toDate().toDateString() }}</div>
                                                </div>
                                            </div>
                                            <h4 class="font-semibold">{{ event.title }}</h4>
                                            <p class="text-white-dark line-clamp-4">{{ event.description }} Lorem ipsum
                                                dolor sit amet consectetur, adipisicing elit. Officiis amet, a quo quasi
                                                molestias blanditiis nulla eaque nesciunt incidunt excepturi repellendus
                                                modi temporibus repellat impedit natus quaerat omnis magnam odit?</p>
                                            <div class="flex flex-col font-semibold gap-1">
                                                <span>
                                                    <icon-clock class="text-green-700 inline" />
                                                    {{ event.starts.toDate().toDateString() }}
                                                </span>
                                                <span>
                                                    <icon-clock class="text-danger inline" />
                                                    {{ event.ends.toDate().toDateString() }}
                                                </span>
                                            </div>
                                            <img class="w-full h-40 object-cover"
                                                :src="event.preview_url ?? '/app/images/event-placeholder.gif'" alt="">
                                            <div class="mt-2 flex items-center justify-center px-4">
                                                <div class="flex items-center gap-4">
                                                    <template v-if="district.director_id === store.user.id">
                                                        <button title="Delete this event" type="button" class="text-danger"
                                                            @click="onDeleteEvent(event.id)">
                                                            <icon-trash-lines class="w-7 h-7" />
                                                        </button>
                                                        <NuxtLink :to="`/app/edit-event/${event.id}`"
                                                            title="Edit this event" type="button" class="text-blue-600"
                                                            @click="onDeleteEvent(event.id)">
                                                            <icon-edit class="w-6 h-6" />
                                                        </NuxtLink>
                                                    </template>
                                                    <template v-else>
                                                        <button v-if="event.attendees.includes(store.user.id)"
                                                            @click.stop="onLeaveEvent(event.id)" type="button"
                                                            title="Attend to this event"
                                                            class="group text-danger ltr:ml-2 rtl:mr-2 flex flex-row items-center gap-1">
                                                            <icon-x class="w-7 h-7 group-hover:fill-danger"
                                                                :class="{ 'fill-danger': event.isFav }" />
                                                            Leave
                                                        </button>
                                                        <button v-else @click.stop="onAttendEvent(event.id)" type="button"
                                                            title="Attend to this event"
                                                            class="group text-primary ltr:ml-2 rtl:mr-2 flex flex-row items-center gap-1">
                                                            <icon-square-check class="w-7 h-7 group-hover:fill-primary"
                                                                :class="{ 'fill-primary': event.isFav }" />
                                                            Attend
                                                        </button>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                    <template v-if="!currentEvents.length">
                        <div class="grid h-full min-h-[300px] place-content-center text-lg font-semibold">No data available
                        </div>
                    </template>
                </div>
                <Event v-if="selectedEvent" :district="district" :selectedEvent="selectedEvent" @back="selectedEventId = null"
                    @attend-event="onAttendEvent(selectedEvent.id)" @leave-event="onLeaveEvent(selectedEvent.id)"
                    @delete-event="onDeleteEvent(selectedEvent.id)" />
            </div>
        </div>
    </div>
</template>
