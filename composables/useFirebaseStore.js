import { setDoc, getDoc, doc, getDocs, updateDoc, collection, getCountFromServer, writeBatch, query, where } from "firebase/firestore"
export default function () {
    const { $firestore, $auth } = useNuxtApp()
    const {uploadPhoto} = useFirebaseStorage()
    const store = useAppStore()

    async function createUser(id, email, { ...args }) {
        const docRef = doc($firestore, "users", id)
        await setDoc(docRef, {
            email,
            ...args,
            role: 0
        })
    }

    async function updateUser(id, data={}){
        const docRef = doc($firestore, "users", id)
        await updateDoc(docRef, data)
        await refreshUser()
    }

    async function refreshUser() {
        const docRef = doc($firestore, "users", store.user.id);
        const docSnap = await getDoc(docRef);
        store.user = { id: docSnap.id, ...docSnap.data() }
    }
    
    async function updateProfilePhoto(file) {
        const url = await uploadPhoto("images/profile-photos", store.user.id, file)
        await updateUser(store.user.id, {photoURL:url})
    }

    async function getUserById(id) {
        const docRef = doc($firestore, "users", id);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("data:", docSnap.data());
            return docSnap.data()
        }
        else {
            return null
        }
    }

    async function setCounties(cities) {
        const districts = []
        for (let city of cities) {
            let city_id = city.id
            city.counties.forEach(async (county, index) => {
                let county_id = `${city_id}-${index}`
                let data = {
                    id:county_id,
                    city_id,
                    name:county.name
                }
                let docRef = doc($firestore, 'county', county_id)
                await setDoc(docRef, data)
                console.log(county_id);
            })
        }
        const CHUNK_SIZE = 100
        for (let i = 0; i < districts.length; i += CHUNK_SIZE) {
            const chunk = districts.slice(i, i + CHUNK_SIZE);
            let batch = writeBatch($firestore)
            chunk.forEach(item => {
                let docRef = doc($firestore, 'district', item.id)
                batch.set(docRef, item);
            });
            console.log(batch);
            await batch.commit();
            console.log("batch commited");
        }
    }

    async function setDistricts(cities) {
        const districts = []
        for (let city of cities) {
            let city_id = city.id
            city.counties.forEach(async (county, index) => {
                let county_id = `${city_id}-${index}`
                let county_index = index
                county.districts.forEach(async (district, index_) => {
                    let id = `${city_id}-${county_index}-${index_}`
                    let data = {
                        id,
                        city_id,
                        county_id,
                        name: district
                    }
                    districts.push(data)
                    // let docRef = doc($firestore, 'district', id)
                    // await setDoc(docRef, data)
                    // console.log(county_id);
                })
            })
        }
        const CHUNK_SIZE = 100
        for (let i = 0; i < districts.length; i += CHUNK_SIZE) {
            const chunk = districts.slice(i, i + CHUNK_SIZE);
            let batch = writeBatch($firestore)
            chunk.forEach(item => {
                let docRef = doc($firestore, 'district', item.id)
                batch.set(docRef, item);
            });
            console.log(batch);
            await batch.commit();
            console.log("batch commited");
        }
    }

    async function getAllCities() {
        const querySnapshot = await getDocs(collection($firestore, 'city'))
        return Array.from(querySnapshot.docs, doc => doc.data())
    }

    async function getCounties(city_id) {
        const counties = query(collection($firestore, 'county'), where('city_id', '==', String(city_id)))
        const querySnapshot = await getDocs(counties)
        return Array.from(querySnapshot.docs, doc => doc.data())
    }

    async function getDistricts(county_id) {
        const districts = query(collection($firestore, 'district'), where('county_id', '==', county_id))
        const querySnapshot = await getDocs(districts)
        return Array.from(querySnapshot.docs, doc => doc.data())
    }

    async function selectDistrict(district_id) {
        const docRef = doc($firestore, "users", $auth.currentUser.uid)
        await updateDoc(docRef, {
            districtId: district_id
        })
        await refreshUser()
    }

    async function getDistrictMeta(district_id){
        if(typeof district_id !== "string"){
            district_id = store.user.districtId
        }
        console.log("GETTING DISTRICT META WITH: ", district_id)
        const docRef = doc($firestore, "district", district_id)
        const district = (await getDoc(docRef)).data()
        const numOfPeopleSnapshot = await getCountFromServer(query(collection($firestore, 'users'), where('districtId', '==', district_id)))
        const numOfPeople = numOfPeopleSnapshot.data().count
        let director;
        if(district.directorId){
            const directorRef = doc($firestore, "user", district.directorId)
            director = (await getDoc(directorRef)).data()
        }
        return {
            ...district,
            numOfPeople,
            director
        }
        
    }

    return {
        createUser,
        updateUser,
        updateProfilePhoto,
        refreshUser,
        getUserById,
        getAllCities,
        getCounties,
        getDistricts,
        selectDistrict,
        getDistrictMeta,

        setCounties,
        setDistricts
    }
}