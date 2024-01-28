<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/index';
defineProps({
    post: { required: true },
    district: { required: true }

})
useHead({ title: 'Widgets' });
const store = useAppStore()
</script>

<template>
    <div class="panel h-full my-3">
        <div class="mb-5 flex items-start border-b border-[#e0e6ed] py-3 dark:border-[#1b2e4b]">
            <div class="shrink-0 rounded-full ring-2 ring-white-light ltr:mr-4 rtl:ml-4 dark:ring-dark">
                <img :src="post.user.photoURL ?? '/app/images/district-placeholder.jpg'" alt="" class="h-10 w-10 rounded-full object-cover" />
            </div>
            <div class="font-semibold">
                <NuxtLink :to="`/app/profile/${post.user.id}`">
                    <h6>{{ post.user.displayName }}</h6>
                </NuxtLink>
                <p class="mt-1 text-xs text-white-dark">Monday, Nov 18</p>
            </div>
        </div>
        <div>
            <div class="text-black">
               {{ post.text }}
            </div>
            <div class="bottom-0 flex w-full items-center justify-between py-5">
                <div class="flex items-center">
                    <icon-heart @click="$emit('like')" class="w-5 h-5 mr-1 text-danger hover:fill-danger inline relative" :class="{'fill-danger':post.likes.includes(store.user.id)}" />
                    <span class="dark:text-info">{{ post.likes.length }}</span>
                </div>
            </div>
        </div>
    </div>
</template>