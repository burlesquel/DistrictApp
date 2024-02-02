<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300">
            <div class="h-full bg-white dark:bg-[#0e1726]">
                <div class="flex items-center justify-between px-4 py-3">
                    <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
                        <img class="ml-[5px] w-8 flex-none" src="/app/images/logo.svg" alt="" />
                        <span
                            class="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">VRISTO</span>
                    </NuxtLink>
                    <a href="javascript:;"
                        class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                        @click="store.toggleSidebar()">
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>
                <client-only>
                    <perfect-scrollbar :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }" class="relative h-[calc(100vh-80px)]">
                        <ul class="relative space-y-0.5 p-4 py-0">
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app'}" to="/app" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-components class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">My
                                            District</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app/users'}" to="/app/users" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-users class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Neighbors</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <h2
                                class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>EVENTS</span>
                            </h2>
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app/events?type=all'}" to="/app/events?type=all" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-list-check class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">All
                                            Events</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app/events?type=incoming'}" to="/app/events?type=incoming" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-bell-bing class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Incoming
                                            Events</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app/events?type=attending'}" to="/app/events?type=attending" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-send class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Events
                                            I Will Attend</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app/events?type=outdated'}" to="/app/events?type=outdated" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-archive class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Outdated
                                            Events</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <h2
                                class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <span>ADMIN</span>
                            </h2>
                            <li class="nav-item">
                                <NuxtLink to="/admin/muhtar-applications">
                                    <div class="flex items-center">
                                        <icon-user-plus class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Muhtar Applications</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <h2
                                class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>ACCOUNT</span>
                            </h2>
                            <li class="nav-item">
                                <NuxtLink :class="{'active':router.currentRoute.value.fullPath === '/app/profile'}" to="/app/profile" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-user class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            Profile</span>
                                    </div>
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink @click="nuxtApp.$auth.signOut(); close()">
                                    <div class="flex items-center">
                                        <icon-logout class="shrink-0 rotate-90 group-hover:!text-primary" />
                                        <span
                                            class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Sign
                                            Out</span>
                                    </div>
                                </NuxtLink>
                            </li>
                        </ul>
                    </perfect-scrollbar>
                </client-only>
                <span @click="setDistricts">CLICK</span>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useAppStore } from '@/stores/index';
const store = useAppStore();
const router = useRouter()
const {setDistricts} = useFirebaseStore();
const nuxtApp = useNuxtApp()
onMounted(() => {
    setTimeout(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');

        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];

                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    });
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
