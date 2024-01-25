<script setup>
import Loading from '../loading.vue';
const props = defineProps({
    selectedEvent: { required: true },
    district: { required: true }
})
const store = useAppStore()
const { getComments, getUsersData, createComment, deleteComment } = useFirebaseStore()
const commentsData = ref([])
const users = ref(null)
const loading = ref(true)

const comments = computed(() => {
    return Array.from(commentsData.value, comment => comment.data())
})

async function onComment(e) {
    let text = e.target.comment.value
    e.target.comment.value = ""
    await createComment(props.selectedEvent.id, store.user.id, text)
    await refreshComments()
}

watch(comments, async () => {
    let userIds = Array.from(comments.value, comment => comment.user_id)
    try {
        let data = await getUsersData(userIds)
        users.value = Array.from(data, user => {
            return { ...user.data(), id: user.id }
        })
    }
    catch (err) {
        console.log(err);
    }
    loading.value = false
})

onMounted(async () => {
    commentsData.value = await getComments(props.selectedEvent.id)
})

async function refreshComments() {
    loading.value = true
    commentsData.value = await getComments(props.selectedEvent.id)
}
</script>

<template v-if="selectedEvent">
    <div>
        <div class="flex flex-wrap items-center justify-between p-4">
            <div class="flex items-center">
                <button type="button" class="hover:text-primary ltr:mr-2 rtl:ml-2" @click="$emit('back')">
                    <icon-arrow-left class="w-5 h-5 rotate-180" />
                </button>
                <h4 class="text-base font-medium ltr:mr-2 rtl:ml-2 md:text-lg line-clamp-1">
                    {{ selectedEvent.title }}
                </h4>
            </div>
        </div>
        <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
        <div class="relative p-4">
            <div class="flex flex-wrap justify-between">
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
                            selectedEvent.created.toDate().toDateString() }}</div>
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                        <client-only>
                            <template v-if="district.director_id === store.user.id">
                                <button title="Delete this event" type="button" class="text-danger"
                                    @click="$emit('deleteEvent')">
                                    <icon-trash-lines class="w-7 h-7" />
                                </button>
                                <NuxtLink :to="`/app/edit-event/${selectedEvent.id}`" title="Edit this event" type="button"
                                    class="text-blue-600">
                                    <icon-edit class="w-6 h-6" />
                                </NuxtLink>
                            </template>
                            <template v-else>
                                <button v-if="store.user.attending_events?.includes(selectedEvent.id)"
                                    @click="$emit('leaveEvent')" type="button" title="Attend to this event"
                                    class="group text-danger ltr:ml-2 rtl:mr-2 flex flex-row items-center gap-1">
                                    <icon-x class="w-7 h-7 grou p-hover:fill-danger"
                                        :class="{ 'fill-danger': selectedEvent.isFav }" />
                                    Leave
                                </button>
                                <button v-else @click="$emit('attendEvent')" type="button" title="Attend to this event"
                                    class="group text-primary ltr:ml-2 rtl:mr-2 flex flex-row items-center gap-1">
                                    <icon-square-check class="w-7 h-7 group-hover:fill-primary"
                                        :class="{ 'fill-primary': selectedEvent.isFav }" />
                                    Attend
                                </button>
                            </template>
                        </client-only>
                    </div>
                </div>
            </div>
            <div class="mt-8 flex flex-col gap-4">
                <div class="max-w-full text-[1rem]">{{ selectedEvent.description }}</div>
                <div>
                    <img class="w-5/6" :src="selectedEvent.preview_url" alt="">
                </div>
            </div>
        </div>
        <div class="p-4">
            <form @submit.prevent="onComment">
                <label for="">Make a comment:</label>
                <textarea name="comment" id="desc" rows="3" class="form-textarea resize-none"
                    placeholder="Make a comment.."></textarea>
                <button type="submit" class="btn btn-primary ml-auto">Send</button>
            </form>
            <span class="text-[1rem] text-gray-600">Comments made on this event:</span>
            <Loading v-if="loading" />
            <template v-else-if="users">
                <div v-for="comment in comments" class="flex flex-col gap-3">
                    <div class="flex w-max items-center mt-6">
                        <div class="flex-none">
                            <div class="rounded-full bg-gray-300 p-0.5 dark:bg-gray-700">
                                <img class="h-8 w-8 rounded-full object-cover"
                                    :src="users.find(user => user.id === comment.user_id).photoURL ?? '/app/images/district-placeholder.jpg'" />
                            </div>
                        </div>
                        <div class="ltr:ml-2 rtl:mr-2">
                            <div class="font-semibold">{{ users.find(user => user.id === comment.user_id).displayName }}
                            </div>
                            <div class="text-sx text-white-dark">{{
                                selectedEvent.created.toDate().toDateString() }}</div>
                        </div>
                    </div>
                    <p class="pl-2">
                        {{ comment.text }}
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>