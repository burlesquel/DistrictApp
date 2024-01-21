import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
export default function () {
    const { $storage } = useNuxtApp()

    async function uploadPhoto(folderPath, name, file){
        const folderRef = ref($storage, `${folderPath}/${name}.jpg`)
        const snapshot = await uploadBytes(folderRef, file)
        return await getDownloadURL(snapshot.ref)
    }
    
    return {
        uploadPhoto
    }
}