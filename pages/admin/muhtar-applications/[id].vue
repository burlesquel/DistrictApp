<script setup>
import { ref, onMounted } from 'vue';
import Loading from '~/components/loading.vue';

definePageMeta({
    layout: "app-default"
})
const store = useAppStore()
const router = useRouter()
const route = useRoute()
const { getMuhtarApplications, getDistrictMeta } = useFirebaseStore()

const district_id = route.params.id
console.log(district_id);

const pending = ref(true)
const district = ref(null)
const applications = ref(null)

onMounted(async () => {
    district.value = await getDistrictMeta(district_id)
    applications.value = await getMuhtarApplications(district_id)
    pending.value = false
})

</script>

<template>
    <div v-if="pending">
        <Loading />
    </div>
    <div v-else>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-xl">Muhtar applications in {{ district.name }}</h2>
        </div>
        <div class="panel mt-5 overflow-hidden border-0 p-0">
            <div class="table-responsive">
                <table class="table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>District</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="cursor-pointer" @click="router.push(`/app/profile/${application.user.id}`)"
                            v-for="application in applications">
                            <td>
                                <div class="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-700">
                                    <img class="h-full w-full rounded-full object-cover"
                                        :src="application.user.photoURL ?? '/app/images/avatar-placeholder.jpg'" />
                                </div>
                            </td>
                            <td>
                                {{ application.user.displayName }}
                            </td>
                            <td>{{ application.district.name }}</td>
                            <td><button class="btn btn-success">Accept</button></td>
                            <td><button class="btn btn-danger">Reject</button></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>