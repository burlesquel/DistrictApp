
<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';

import appSetting from '@/app-setting';

import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/index';
const store = useAppStore();
const route = useRoute();
const search = ref(false);
const nuxtApp = useNuxtApp()

const $t = (text) => text

const currentFlag = computed(() => {
    return `/app/images/flags/${store.locale?.toUpperCase()}.svg`;
});
const notifications = ref([
    {
        id: 1,
        profile: 'user-profile.jpeg',
        message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
        time: '45 min ago',
    },
    {
        id: 2,
        profile: 'profile-34.jpeg',
        message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
        time: '9h Ago',
    },
    {
        id: 3,
        profile: 'profile-16.jpeg',
        message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
        time: '9h Ago',
    },
]);

const messages = ref([
    {
        id: 1,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
        title: 'Congratulations!',
        message: 'Your OS has been updated.',
        time: '1hr',
    },
    {
        id: 2,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
        title: 'Did you know?',
        message: 'You can switch between artboards.',
        time: '2hr',
    },
    {
        id: 3,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
        title: 'Something went wrong!',
        message: 'Send Reposrt',
        time: '2days',
    },
    {
        id: 4,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
        title: 'Warning',
        message: 'Your password strength is low.',
        time: '5days',
    },
]);

onMounted(() => {
    setActiveDropdown();
});

watch(route, (to, from) => {
    setActiveDropdown();
});

const setActiveDropdown = () => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const all = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
        for (let i = 0; i < all.length; i++) {
            all[0]?.classList.remove('active');
        }
        const ul = selector.closest('ul.sub-menu');
        if (ul) {
            let ele = ul.closest('li.menu').querySelectorAll('.nav-link');
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele?.classList.add('active');
                });
            }
        }
    }
};

const removeNotification = (value) => {
    notifications.value = notifications.value.filter((d) => d.id !== value);
};

const removeMessage = (value) => {
    messages.value = messages.value.filter((d) => d.id !== value);
};
</script>


<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                    <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
                        <img class="inline w-8 ltr:-ml-1 rtl:-mr-1" src="/app/images/logo.svg" alt="" />
                        <span
                            class="hidden align-middle text-2xl font-semibold transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">VRISTO</span>
                    </NuxtLink>

                    <a href="javascript:;"
                        class="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                        @click="store.toggleSidebar()">
                        <icon-menu class="h-5 w-5" />
                    </a>
                </div>
                <div class="hidden ltr:mr-2 rtl:ml-2 sm:block">
                </div>
                <div
                    class="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <div></div>
                    </div>
                    <div>
                        <a href="javascript:;" v-show="store.theme === 'light'"
                            class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')">
                            <icon-sun />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'dark'"
                            class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('system')">
                            <icon-moon />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'system'"
                            class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')">
                            <icon-laptop />
                        </a>
                    </div>

                    <div class="dropdown shrink-0">
                        <client-only>
                            <Popper :placement="'bottom-start'" offsetDistance="8" class="!block">
                                <button type="button" class="group relative block">
                                    <img class="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        :src="store.user.photoURL ?? '/app/images/avatar-placeholder.jpg'" alt="" />
                                </button>
                                <template #content="{ close }">
                                    <ul
                                        class="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                        <li>
                                            <div class="flex items-center px-4 py-4">
                                                <div class="flex-none">
                                                    <img class="h-10 w-10 rounded-md object-cover"
                                                        :src="store.user.photoURL ?? '/app/images/avatar-placeholder.jpg'"
                                                        alt="" />
                                                </div>
                                                <div class="truncate ltr:pl-4 rtl:pr-4">
                                                    <NuxtLink to="/app/profile"
                                                        class="text-base block text-black hover:text-primary dark:text-dark-light dark:hover:text-white cursor-pointer">
                                                        {{ store.user.displayName }}
                                                    </NuxtLink>
                                                    <span class="text-black/60 dark:text-dark-light/60"
                                                        href="javascript:;">{{ store.user.email }}</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <NuxtLink to="/app/profile" class="dark:hover:text-white" @click="close()">
                                                <icon-user class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                Profile
                                            </NuxtLink>
                                        </li>
                                        <li class="border-t border-white-light dark:border-white-light/10">
                                            <NuxtLink class="!py-3 text-danger cursor-pointer"
                                                @click="nuxtApp.$auth.signOut(); close()">
                                                <icon-logout class="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                                                Sign out
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </client-only>
                    </div>
                </div>
            </div>

        </div>
    </header></template>
