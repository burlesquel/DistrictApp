<script setup>
import { ref, computed, onMounted } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import 'vue3-quill/lib/vue3-quill.css';
import Swal from 'sweetalert2';
import { useAppStore } from '@/stores/index';
useHead({ title: 'Mailbox' });
const store = useAppStore();
const { getEvents, getMyDistrict } = useFirebaseStore()
const exData = [
    {
        id: 1,
        path: 'profile-15.jpeg',
        firstName: 'Laurie',
        lastName: 'Fox',
        email: 'laurieFox@mail.com',
        date: new Date(),
        time: '2:00 PM',
        title: 'Promotion Page',
        displayDescription:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
        type: 'inbox',
        isImportant: false,
        isStar: true,
        group: 'social',
        isUnread: false,
        attachments: [
            {
                name: 'Confirm File.txt',
                size: '450KB',
                type: 'file',
            },
            {
                name: 'Important Docs.xml',
                size: '2.1MB',
                type: 'file',
            },
        ],
        description: `
                        <p class="mail-content"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                        <div class="gallery text-center">
                            <img alt="image-gallery" src="${'/assets/images/carousel3.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                            <img alt="image-gallery" src="${'/assets/images/carousel2.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                            <img alt="image-gallery" src="${'/assets/images/carousel1.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                        </div>
                        <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                        `,
    },
    {
        id: 2,
        path: 'profile-14.jpeg',
        firstName: 'Andy',
        lastName: 'King',
        email: 'kingAndy@mail.com',
        date: new Date(),
        time: '6:28 PM',
        title: 'Hosting Payment Reminder',
        displayDescription:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
        type: 'inbox',
        isImportant: false,
        isStar: false,
        group: '',
        isUnread: false,
        description: `
                        <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                        <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                        `,
    }

]

definePageMeta({
    layout: "app-default"
})
const events = ref([])
const currentPage = ref(0)
const totalPageNum = ref(9999)
const loading = ref(true)
const selectedEvent = ref(null);
const selectedTab = ref('inbox');
const district = ref(null)
async function onNextPage() {
    currentPage.value = currentPage.value + 1
}

async function onPrevPage(){
    currentPage.value = currentPage.value - 1
}

watch(currentPage, async function (toPage, fromPage) {
    let dataExists = events.value[toPage]
    if (!dataExists) {
        loading.value = true
        let prevPage = events.value[fromPage]
        let lastElem = prevPage[prevPage.length - 1]
        let data = await getEvents(store.user.districtId, {nextPage:lastElem})
        if(data.size === 0){
            totalPageNum.value = fromPage
            currentPage.value = fromPage
            loading.value = false
            return;
        }
        if(data.size < 12){
            totalPageNum.value = toPage
        }
        events.value[toPage] = data.docs
        loading.value = false
    }
})

const currentEvents = computed(()=>{
    let currentPageData = events.value[currentPage.value]
    if(currentPageData){
        return Array.from(currentPageData, data => data.data())
    }
    else{
        return []
    }
    
})

async function onPreviousPage() {

}

onMounted(async () => {
    district.value = await getMyDistrict()
    let data = await getEvents(store.user.districtId)
    events.value.push(data.docs)
    loading.value = false
})

</script>


<template>
    <div>
        <div class="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
            <div
                class="panel dark:gray-50 absolute z-10 hidden h-full w-[250px] max-w-full flex-none space-y-3 overflow-hidden p-4 ltr:rounded-r-none rtl:rounded-l-none xl:relative xl:block xl:h-auto ltr:xl:rounded-r-md rtl:xl:rounded-l-md">
                <div class="flex h-full flex-col pb-16">
                    <div v-if="true" class="pb-5">
                        <button class="btn btn-primary w-full" type="button" @click="openMail('add', null)">New
                            Event</button>
                    </div>
                    <client-only>
                        <perfect-scrollbar :options="{
                            swipeEasing: true,
                            wheelPropagation: false,
                        }" class="relative h-full grow ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5">
                            <div class="space-y-1">
                                <button type="button"
                                    class="flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary"
                                    :class="{ 'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary': selectedTab === 'inbox', }"
                                    @click="tabChanged('inbox')">
                                    <div class="flex items-center">
                                        <icon-mail class="w-5 h-5 shrink-0" />
                                        <div class="ltr:ml-3 rtl:mr-3">Inbox</div>
                                    </div>
                                    <div
                                        class="whitespace-nowrap rounded-md bg-primary-light px-2 py-0.5 font-semibold dark:bg-[#060818]">
                                        2
                                    </div>
                                </button>

                                <button type="button"
                                    class="flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary"
                                    :class="{
                                        'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary': selectedTab === 'star',
                                    }" @click="tabChanged('star')">
                                    <div class="flex items-center">
                                        <icon-star class="shrink-0" />
                                        <div class="ltr:ml-3 rtl:mr-3">Marked</div>
                                    </div>
                                </button>

                                <button type="button"
                                    class="flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary"
                                    :class="{
                                        'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary': selectedTab === 'sent_mail',
                                    }" @click="tabChanged('sent_mail')">
                                    <div class="flex items-center">
                                        <icon-send class="shrink-0" />

                                        <div class="ltr:ml-3 rtl:mr-3">Sent</div>
                                    </div>
                                </button>

                                <button type="button"
                                    class="flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary"
                                    :class="{
                                        'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary': selectedTab === 'spam',
                                    }" @click="tabChanged('spam')">
                                    <div class="flex items-center">
                                        <icon-info-hexagon class="shrink-0" />

                                        <div class="ltr:ml-3 rtl:mr-3">Spam</div>
                                    </div>
                                </button>
                            </div>
                        </perfect-scrollbar>
                    </client-only>
                </div>
            </div>
            <div v-if="loading" class="w-full h-full flex items-center justify-center">
                <span
                    class="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-16 h-16"></span>
            </div>
            <div v-else class="panel h-full flex-1 overflow-x-hidden p-0">
                <div v-show="!selectedEvent" class="flex h-full flex-col">
                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                    <div class="flex flex-col flex-wrap items-center justify-between px-4 pb-4 md:flex-row xl:w-auto">
                        <div class="mt-4 grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
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
                        <div class="mt-4 flex-1 md:flex-auto">
                            <div class="flex items-center justify-center md:justify-end">
                                <div class="ltr:mr-3 rtl:ml-3">
                                    1-5 of 10
                                </div>
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
                            <template v-for="note in currentEvents" :key="note.id">
                                <div class="panel pb-12" :class="{
                                    'bg-primary-light shadow-primary': note.tag === 'personal',
                                    'bg-warning-light shadow-warning': note.tag === 'work',
                                    'bg-info-light shadow-info': note.tag === 'social',
                                    'bg-danger-light shadow-danger': note.tag === 'important',
                                    'dark:shadow-dark': !note.tag,
                                }">
                                    <div class="min-h-[142px]">
                                        <div class="flex justify-between">
                                            <div class="flex w-max items-center">
                                                <div class="flex-none">
                                                    <div class="rounded-full bg-gray-300 p-0.5 dark:bg-gray-700">
                                                        <img class="h-8 w-8 rounded-full object-cover"
                                                            :src="district.preview_url ?? '/app/images/district-placeholder.jpg'" />
                                                    </div>
                                                </div>
                                                <div class="ltr:ml-2 rtl:mr-2">
                                                    <div class="font-semibold">{{ district.name }}</div>
                                                    <div class="text-sx text-white-dark">{{ note.created.toDate().toDateString() }}</div>
                                                </div>
                                            </div>
                                            <div class="dropdown">
                                                <client-only>
                                                    <Popper offsetDistance="0">
                                                        <button type="button" class="text-primary">
                                                            <icon-horizontal-dots
                                                                class="rotate-90 opacity-70 hover:opacity-100" />
                                                        </button>
                                                        <template #content="{ close }">
                                                            <ul @click="close()" class="text-sm font-medium">
                                                                <li>
                                                                    <a href="javascript:;" class="w-full"
                                                                        @click="editNote(note)">
                                                                        <icon-pencil
                                                                            class="w-4 h-4 ltr:mr-3 rtl:ml-3 shrink-0" />

                                                                        Edit
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;" class="w-full"
                                                                        @click="deleteNoteConfirm(note)">
                                                                        <icon-trash-lines
                                                                            class="w-4.5 h-4.5 ltr:mr-3 rtl:ml-3 shrink-0" />
                                                                        Delete
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;" class="w-full"
                                                                        @click="viewNote(note)">
                                                                        <icon-eye
                                                                            class="w-4.5 h-4.5 ltr:mr-3 rtl:ml-3 shrink-0" />

                                                                        View
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </template>
                                                    </Popper>
                                                </client-only>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 class="mt-4 font-semibold">{{ note.title }}</h4>
                                            <p class="mt-2 text-white-dark line-clamp-4">{{ note.description }}</p>
                                        </div>
                                    </div>
                                    <div class="absolute bottom-5 left-0 w-full px-5">
                                        <div class="mt-2 flex items-center justify-between">
                                            <div class="dropdown">
                                                <client-only>
                                                    <Popper
                                                        :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                                        offsetDistance="0">
                                                        <button type="button" :class="{
                                                            'text-primary': note.tag === 'personal',
                                                            'text-warning': note.tag === 'work',
                                                            'text-info': note.tag === 'social',
                                                            'text-danger': note.tag === 'important',
                                                        }">
                                                            <icon-square-rotated :class="{
                                                                'fill-primary': note.tag === 'personal',
                                                                'fill-warning': note.tag === 'work',
                                                                'fill-info': note.tag === 'social',
                                                                'fill-danger': note.tag === 'important',
                                                            }" />
                                                        </button>
                                                        <template #content="{ close }">
                                                            <ul @click="close()">
                                                                <li>
                                                                    <a href="javascript:;"
                                                                        @click="setTag(note, 'personal')">
                                                                        <icon-square-rotated
                                                                            class="ltr:mr-2 rtl:ml-2 fill-primary text-primary" />
                                                                        Personal
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;" @click="setTag(note, 'work')">
                                                                        <icon-square-rotated
                                                                            class="ltr:mr-2 rtl:ml-2 fill-warning text-warning" />
                                                                        Work
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;" @click="setTag(note, 'social')">
                                                                        <icon-square-rotated
                                                                            class="ltr:mr-2 rtl:ml-2 fill-info text-info" />
                                                                        Social
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;"
                                                                        @click="setTag(note, 'important')">
                                                                        <icon-square-rotated
                                                                            class="ltr:mr-2 rtl:ml-2 fill-danger text-danger" />
                                                                        Important
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </template>
                                                    </Popper>
                                                </client-only>
                                            </div>
                                            <div class="flex items-center">
                                                <button type="button" class="text-danger" @click="deleteNoteConfirm(note)">
                                                    <icon-trash-lines />
                                                </button>
                                                <button type="button" class="group text-warning ltr:ml-2 rtl:mr-2"
                                                    @click="setFav(note)">
                                                    <icon-star class="w-4.5 h-4.5 group-hover:fill-warning"
                                                        :class="{ 'fill-warning': note.isFav }" />
                                                </button>
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
                <template v-if="selectedEvent">
                    <div>
                        <div class="flex flex-wrap items-center justify-between p-4">
                            <div class="flex items-center">
                                <button type="button" class="hover:text-primary ltr:mr-2 rtl:ml-2"
                                    @click="selectedEvent = null">
                                    <icon-arrow-left class="w-5 h-5 rotate-180" />
                                </button>
                                <h4 class="text-base font-medium ltr:mr-2 rtl:ml-2 md:text-lg">
                                    {{ selectedEvent.title }}
                                </h4>
                                <div class="badge bg-info hover:top-0">{{ selectedEvent.type }}</div>
                            </div>
                            <div>
                                <client-only>
                                    <button type="button" v-tippy:print>
                                        <icon-printer />
                                    </button>
                                    <tippy target="print">Print</tippy>
                                </client-only>
                            </div>
                        </div>
                        <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                        <div class="relative p-4">
                            <div class="flex flex-wrap">
                                <div class="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                                    <img v-show="selectedEvent.path" :src="`/assets/images/${selectedEvent.path}`"
                                        class="h-12 w-12 rounded-full object-cover" alt="avatar" />
                                    <div v-show="!selectedEvent.path"
                                        class="rounded-full border border-gray-300 p-3 dark:border-gray-800">
                                        <icon-user class="w-5 h-5" />
                                    </div>
                                </div>
                                <div class="flex-1 ltr:mr-2 rtl:ml-2">
                                    <div class="flex items-center">
                                        <div class="whitespace-nowrap text-lg ltr:mr-4 rtl:ml-4">
                                            {{ selectedEvent.firstName ? selectedEvent.firstName + ' ' +
                                                selectedEvent.lastName
                                                : selectedEvent.email }}
                                        </div>
                                        <div>
                                            <div v-show="selectedEvent.group" class="ltr:mr-4 rtl:ml-4">
                                                <client-only>
                                                    <div v-tippy:group class="h-2 w-2 rounded-full" :class="{
                                                        'bg-primary': selectedEvent.group === 'personal',
                                                        'bg-warning': selectedEvent.group === 'work',
                                                        'bg-success': selectedEvent.group === 'social',
                                                        'bg-danger': selectedEvent.group === 'private',
                                                    }"></div>
                                                    <tippy target="group" class="capitalize">{{ selectedEvent.group }}
                                                    </tippy>
                                                </client-only>
                                            </div>
                                        </div>
                                        <div class="whitespace-nowrap text-white-dark">1 days ago</div>
                                    </div>
                                    <div class="flex items-center text-white-dark">
                                        <div class="ltr:mr-1 rtl:ml-1">
                                            {{ selectedEvent.type === 'sent_mail' ? selectedEvent.email : 'to me' }}
                                        </div>
                                        <div class="dropdown">
                                            <client-only>
                                                <Popper :placement="'bottom-end'" offsetDistance="0" class="align-middle">
                                                    <button type="button" class="mt-1.5">
                                                        <icon-caret-down class="w-5 h-5" />
                                                    </button>
                                                    <template #content>
                                                        <ul class="sm:w-56">
                                                            <li>
                                                                <div class="flex items-center px-4 py-2">
                                                                    <div class="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                                                        From:</div>
                                                                    <div class="flex-1">
                                                                        {{ selectedEvent.type === 'sent_mail' ?
                                                                            'tailly@gmail.com' : selectedEvent.email }}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="flex items-center px-4 py-2">
                                                                    <div class="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">To:
                                                                    </div>
                                                                    <div class="flex-1">
                                                                        {{ selectedEvent.type !== 'sent_mail' ?
                                                                            'tailly@gmail.com' : selectedEvent.email }}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="flex items-center px-4 py-2">
                                                                    <div class="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                                                        Date:</div>
                                                                    <div class="flex-1">
                                                                        {{ selectedEvent.date + ', ' + selectedEvent.time }}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="flex items-center px-4 py-2">
                                                                    <div class="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                                                        Subject:</div>
                                                                    <div class="flex-1">{{ selectedEvent.title }}</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </template>
                                                </Popper>
                                            </client-only>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                                        <client-only>
                                            <button type="button" v-tippy:star
                                                class="enabled:hover:text-warning disabled:opacity-60"
                                                :class="{ 'text-warning': selectedEvent.isStar }"
                                                @click="setStar(selectedEvent.id)" :disabled="selectedTab === 'trash'">
                                                <icon-star :class="{ 'fill-warning': selectedEvent.isStar }" />
                                            </button>
                                            <tippy target="star">Star</tippy>

                                            <button type="button" v-tippy:important
                                                class="enabled:hover:text-primary disabled:opacity-60"
                                                :class="{ 'text-primary': selectedEvent.isImportant }"
                                                @click="setImportant(selectedEvent.id)" :disabled="selectedTab === 'trash'">
                                                <icon-bookmark :bookmark="false" class="w-4.5 h-4.5 rotate-90"
                                                    :class="{ 'fill-primary': selectedEvent.isImportant }" />
                                            </button>
                                            <tippy target="important">Important</tippy>

                                            <button type="button" v-tippy:reply class="hover:text-info"
                                                @click="openMail('reply', selectedEvent)">
                                                <icon-arrow-backward class="rtl:hidden" />
                                                <icon-arrow-forward class="ltr:hidden" />
                                            </button>
                                            <tippy target="reply">Reply</tippy>

                                            <button type="button" v-tippy:forward class="hover:text-info"
                                                @click="openMail('forward', selectedEvent)">
                                                <icon-arrow-backward class="ltr:hidden" />
                                                <icon-arrow-forward class="rtl:hidden" />
                                            </button>
                                            <tippy target="forward">Forward</tippy>
                                        </client-only>
                                    </div>
                                </div>
                            </div>
                            <div class="prose mt-8 max-w-full prose-p:text-sm prose-img:m-0 prose-img:inline-block dark:prose-p:text-white md:prose-p:text-sm"
                                v-html="selectedEvent.description"></div>
                            <p class="mt-4">Best Regards,</p>
                            <p>{{ selectedEvent.firstName + ' ' + selectedEvent.lastName }}</p>

                            <div class="mt-8" v-show="selectedEvent.attachments">
                                <div class="mb-4 text-base">Attachments</div>
                                <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                                <div class="mt-6 flex flex-wrap items-center">
                                    <template v-for="(attachment, i) in selectedEvent.attachments" :key="i">
                                        <button type="button"
                                            class="group relative mb-4 flex items-center rounded-md border border-[#e0e6ed] px-4 py-2.5 transition-all duration-300 hover:border-primary hover:text-primary ltr:mr-4 rtl:ml-4 dark:border-[#1b2e4b]">
                                            <template v-if="attachment.type === 'image'">
                                                <icon-gallery />
                                            </template>
                                            <template v-if="attachment.type === 'folder'">
                                                <icon-folder />
                                            </template>
                                            <template v-if="attachment.type === 'zip'">
                                                <icon-zip-file />
                                            </template>
                                            <template
                                                v-if="attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder'">
                                                <icon-txt-file class="w-5 h-5" />
                                            </template>
                                            <div class="ltr:ml-3 rtl:mr-3">
                                                <p class="text-xs font-semibold text-primary">
                                                    {{ attachment.name }}
                                                </p>
                                                <p class="text-[11px] text-gray-400 dark:text-gray-600">
                                                    {{ attachment.size }}
                                                </p>
                                            </div>
                                            <div
                                                class="absolute top-0 z-[5] hidden h-full w-full rounded-md bg-dark-light/40 group-hover:block ltr:left-0 rtl:right-0">
                                            </div>
                                            <div
                                                class="btn btn-primary absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full p-1 group-hover:block">
                                                <icon-download class="w-4.5 h-4.5" />
                                            </div>
                                        </button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
