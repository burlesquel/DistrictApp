<script setup>
import { ref } from 'vue';
import Post from '~/components/app/Post.vue';
useHead({ title: 'Mahalle App' });
definePageMeta({
    layout: "app-default"
})
const store = useAppStore()
const { getDistrictMeta, updateDistrictPreview, createPost, getPosts, likePost, createMuhtarApplication } = useFirebaseStore()

// getDistrictMeta()
let { data: district, pending: districtPending, refresh: refreshDistrict } = useAsyncData('cities', getDistrictMeta, { server: false, lazy: false })
let { data: posts, pending: postsPending, refresh: refreshPosts } = useAsyncData('posts', () => getPosts(store.user.districtId), { server: false, lazy: false })

const previewInput = ref(null)

const onImageSelection = async (e) => {
    if (district.director_id === store.user.id) {
        let file = e.target.files[0]
        await updateDistrictPreview(district.value.id, file)
        await refreshDistrict()
    }
}

const onPost = async (e) => {
    let text = e.target.post.value
    e.target.post.value = ""
    await createPost("post", store.user.id, district.value.id, {
        text
    })
    await refreshPosts()
}

const onLike = async (post_id) => {
    await likePost(post_id)
    await refreshPosts()
}

const onMuhtarApply = async () => {
    await createMuhtarApplication()
    await refreshDistrict()
}
</script>

<template>
    <div v-if="!districtPending">
        <div class="panel">
            <div class="flex flex-col-reverse gap-4 md:flex-row justify-between">
                <div class="flex flex-col justify-between items-start gap-4 px-4 w-full md:w-1/2">
                    <div>
                        <div class="text-2xl font-semibold uppercase">{{ district.name }}</div>
                        <div class="text-lg uppercase">{{ district.city.name }} - {{ district.county.name }}</div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400  text-white min-w-32">
                            <div class="flex justify-between">
                                <div class="text-md font-semibold ltr:mr-1 rtl:ml-1"><icon-menu-users />Resident</div>
                            </div>
                            <div class="mt-5 flex items-center">
                                <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ district.numOfPeople }}</div>
                            </div>
                        </div>
                        <div class="panel bg-gradient-to-r from-violet-500 to-violet-400 text-white min-w-32">
                            <div class="flex justify-between">
                                <div class="text-md font-semibold ltr:mr-1 rtl:ml-1"><icon-user-plus />Muhtar</div>
                            </div>
                            <div v-if="district.director" class="mt-5 flex items-center gap-2">
                                <img class="h-8 w-8 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    :src="district.director.photoURL ?? '/app/images/avatar-placeholder.jpg'" alt="" />
                                <div class="text-2xl font-semibold ltr:mr-3 rtl:ml-3">{{ district.director.displayName }}
                                </div>
                            </div>
                            <template v-else>
                                <div v-if="district.canApplyForMuhtar" class="mt-5 flex flex-col justify-center">
                                    <span class="text-xs">This district hasn't any director yet.</span>
                                    <div @click="onMuhtarApply" class="text-xl cursor-pointer font-bold ltr:mr-3 rtl:ml-3">Click to apply
                                    </div>
                                </div>
                                <div v-else class="mt-5 flex flex-col justify-center">
                                    <span class="text-xs">You have sent your director application.</span>
                                    <div class="text-xl font-bold ltr:mr-3 rtl:ml-3"></div>
                                </div>
                            </template>

                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2 relative">
                    <img class="h-[360px] w-full object-cover object-bottom"
                        :src="district.previewURL ?? '/app/images/district-placeholder.jpg'" alt="" srcset="">
                    <div v-if="district.director_id === store.user.id" @click="previewInput.click()"
                        class="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-opacity-25 bg-black opacity-0 hover:opacity-100 cursor-pointer">
                        <icon-camera class="text-white w-20 h-20" />
                        <input @input="onImageSelection" ref="previewInput" hidden type="file" name="" id="">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel mt-4">
            <h1 class="text-xl font-semibold text-gray-700 mb-4">What is happening?</h1>
            <form @submit.prevent="onPost">
                <label for="post">Create a post:</label>
                <textarea name="post" id="desc" rows="3" class="form-textarea resize-none"
                    placeholder="Create a post.."></textarea>
                <button type="submit" class="btn btn-primary ml-auto m-3">Send</button>
            </form>
            <div v-if="postsPending">
                <Loading />
            </div>
            <template v-else>
                <Post v-for="post of posts" :post="post" :district="district" @like="onLike(post.id)" />
            </template>
        </div>
    </div>
    <div v-else class="w-100 h-80 flex justify-center items-center">
        <span
            class="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-20 h-20"></span>
    </div>
</template>
