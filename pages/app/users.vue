<script setup>
import { ref, onMounted } from 'vue';
import Loading from '~/components/loading.vue';

definePageMeta({
    layout: "app-default"
})

const store = useAppStore()
const router = useRouter()
const { getUsersByDistrict, getDistrictMeta } = useFirebaseStore()

const pending = ref(true)
const district = ref(null)
const contacts = ref(null)
onMounted(async () => {
    district.value = await getDistrictMeta(store.user.districtId)
    contacts.value = Array.from((await getUsersByDistrict(store.user.districtId)).docs, user => {
        let data = user.data()
        return {
            id: user.id,
            displayName: data.displayName,
            avatar: data.photoURL
        }
    })
    pending.value = false
    console.log(contacts.value);
})

</script>

<template>
    <div v-if="pending">
        <Loading />
    </div>
    <div v-else>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-xl">Contacts in {{ district.name }}</h2>
        </div>
        <div class="panel mt-5 overflow-hidden border-0 p-0">
            <div class="table-responsive">
                <table class="table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="cursor-pointer" @click="router.push(`/app/profile/${contact.id}`)" v-for="contact in contacts">
                            <td>
                                <div class="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-700">
                                    <img class="h-full w-full rounded-full object-cover"
                                        :src="contact.avatar ?? '/app/images/avatar-placeholder.jpg'" />
                                </div>
                            </td>
                            <td>
                                {{ contact.displayName }}
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>