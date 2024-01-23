<script setup>
import { ref, onMounted } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
useHead({ title: 'Invoice Add' });
definePageMeta({
    layout: "app-default"
})

const {uploadPhoto} = useFirebaseStorage()
const {createEvent} = useFirebaseStore()
function onImageSelect(e) {
    let file = e.target.files[0]
    console.log(file);
    selectedImage.value = URL.createObjectURL(file)
    console.log(selectedImage.value);
}
const imageInput = ref(null)
const selectedImage = ref(null)

const selectedType = ref("outdoor")

const startTime = ref('2022-07-05 12:00');
const endTime = ref('2022-07-05 12:00');
const rangeCalendar = ref({
    dateFormat: 'Y-m-d H:i',
    enableTime: true,
    position: 'auto left',
});

async function onSave(e){
    const {title, image, address, description, notes} = e.target
    const data = {
        title: title.value, 
        address: address.value, 
        description: description.value, 
        notes: notes.value,
        starts:startTime.value,
        ends:endTime.value
    }
    if(image.files.length > 0){
        const image_url = await uploadPhoto("images/posts", crypto.randomUUID(), image.files[0])
        data.preview_url = image_url
    }
    await createEvent(data)
    console.log("event has been created..");
}

</script>


<template>
    <form @submit.prevent="onSave" class="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div class="flex flex-col flex-wrap justify-between px-4">
            <div class="flex items-center">
                <label for="title" class="mb-0 w-1/5 ltr:mr-2 rtl:ml-2">EVENT TITLE</label>
                <input id="title" type="text" required name="title" class="form-input"
                    placeholder="Event Title" />
            </div>
            <div class="w-full py-4 flex items-center justify-between">
                <input ref="imageInput" @input="onImageSelect" type="file" name="image" accept=".jpg,.jpeg,.png" id=""
                    class="w-100 h-100 absolute hidden">
                <label for="reciever-name" class="mb-0 w-1/5 ltr:mr-2 rtl:ml-2">EVENT PREVIEW</label>
                <div class="relative">
                    <div @click="imageInput.click()"
                        class="absolute left-0 right-0 top-0 bottom-0 bg-black opacity-0 transition hover:opacity-30 rounded-2xl flex justify-center items-center cursor-pointer">
                        <icon-camera class="text-white w-20 h-20" />
                    </div>
                    <img class="max-w-96" :src="selectedImage ?? '/app/images/event-placeholder.gif'" alt="" srcset="">
                </div>
            </div>
        </div>
        <hr class="my-6 border-[#e0e6ed] dark:border-[#1b2e4b]" />
        <div class="mt-8 px-4">
            <div class="flex flex-col justify-between lg:flex-row">
                <div class="mb-6 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
                    <div class="text-lg">Main Details</div>
                    <!-- <div class="mt-4 flex items-center">
                        <label for="reciever-name" class="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">Type: </label>
                        <select v-model="selectedType" required name="type" id="type">
                            <option selected value="outdoor">Outdoor</option>
                            <option value="online">Online</option>
                        </select>
                    </div> -->
                    <div v-if="selectedType === 'outdoor'" class="mt-4 flex items-center">
                        <label for="address" class="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">Address:</label>
                        <textarea id="address" type="text" required name="address" class="form-input flex-1"
                            placeholder="Address"></textarea>
                    </div>
                    <!-- <div v-if="selectedType === 'outdoor'" class="mt-4 flex items-center">
                        <label for="address" class="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">Address:</label>
                        <textarea id="address" type="text" required name="address" class="form-input flex-1"
                            placeholder="Address"></textarea>
                    </div>
                    <div v-if="selectedType === 'online'" class="mt-4 flex items-center">
                        <label for="gmlink" class="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">Google Meet Link:</label>
                        <input id="gmlink" type="text" required name="gmlink" class="form-input flex-1"
                            placeholder="Google Meet Link" />
                    </div> -->
                    <div class="mt-4 flex items-center">
                        <label for="time" class="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">Start Time:</label>
                        <flat-pickr v-model="startTime" class="form-input" :config="rangeCalendar"></flat-pickr>
                    </div>
                    <div class="mt-4 flex items-center">
                        <label for="time" class="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">End Time:</label>
                        <flat-pickr v-model="endTime" class="form-input" :config="rangeCalendar"></flat-pickr>
                    </div>
                </div>
                <div class="w-full lg:w-1/2">
                    <div class="w-full mb-2">
                        <div class="text-lg mb-2">Description:</div>
                        <textarea id="description" required name="description" rows="3" class="form-textarea"
                            placeholder="The description of the event."></textarea>
                    </div>
                    <div class="w-full mb-2">
                        <div class="text-lg mb-2">Notes:</div>
                        <textarea id="notes" required name="notes" rows="3" class="form-textarea" placeholder="Notes about the event."></textarea>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-success gap-2">
            <icon-save class="ltr:mr-2 rtl:ml-2 shrink-0" />
            Save
        </button>
    </form>
</template>