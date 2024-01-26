<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/index';
defineProps({
    post: { required: true },
    district: { required: true }

})
useHead({ title: 'Widgets' });
</script>

<template>
    <div class="panel h-full">
        <div class="-m-5 mb-5 flex items-start border-b border-[#e0e6ed] p-5 dark:border-[#1b2e4b]">
            <div class="shrink-0 rounded-full ring-2 ring-white-light ltr:mr-4 rtl:ml-4 dark:ring-dark">
                <img :src="district.previewURL ?? '/app/images/district-placeholder.jpg'" alt="" class="h-10 w-10 rounded-full object-cover" />
            </div>
            <div class="font-semibold">
                <h6>{{ district.name }}</h6>
                <p class="mt-1 text-xs text-white-dark">Monday, Nov 18</p>
            </div>
        </div>
        <div>
            <div class="pb-8 text-black">
               {{ post.text }}
            </div>
            <div class="absolute bottom-0 -mx-5 flex w-full items-center justify-between p-5">
                <div class="flex items-center">
                    <icon-thumb-up @click="$emit('like')" class="w-5 h-5 text-info inline ltr:mr-1.5 rtl:ml-1.5 relative -top-0.5" />
                    <span class="dark:text-info">{{ post.likes.length }}</span>
                </div>
            </div>
        </div>
    </div>
</template>