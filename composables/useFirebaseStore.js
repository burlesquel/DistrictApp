import { setDoc, getDoc, addDoc, doc, getDocs, updateDoc, collection, getCountFromServer, writeBatch, query, where, limit, startAfter, orderBy, arrayUnion, arrayRemove, serverTimestamp, Timestamp, documentId, deleteDoc } from "firebase/firestore"

const TWO_WEEKS_IN_SECONDS = 14 * 24 * 60 * 60

export default function () {
    const { $firestore, $auth } = useNuxtApp()
    const { uploadPhoto } = useFirebaseStorage()
    const store = useAppStore()

    async function createUser(id, email, data = {}) {
        const docRef = doc($firestore, "users", id)
        await setDoc(docRef, {
            email,
            ...data,
            role: 0,
            created:serverTimestamp()
        })
    }

    async function updateUser(id, data = {}) {
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
        await updateUser(store.user.id, { photoURL: url })
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
                    id: county_id,
                    city_id,
                    name: county.name
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

    async function getMyDistrict() {
        const district_id = store.user.districtId
        const districtRef = doc($firestore, "district", district_id)
        const district = (await getDoc(districtRef)).data()
        return district
    }


    async function getDistrictMeta(district_id) {
        if (typeof district_id !== "string") {
            district_id = store.user.districtId
        }
        const districtRef = doc($firestore, "district", district_id)
        const district = (await getDoc(districtRef)).data()
        const countyRef = doc($firestore, "county", district.county_id)
        const county = (await getDoc(countyRef)).data()
        const cityRef = doc($firestore, "city", district.city_id)
        const city = (await getDoc(cityRef)).data()
        const numOfPeopleSnapshot = await getCountFromServer(query(collection($firestore, 'users'), where('districtId', '==', district_id)))
        const numOfPeople = numOfPeopleSnapshot.data().count
        let director;
        console.log(district);
        if (district.director_id) {
            const directorRef = doc($firestore, "users", district.director_id)
            director = (await getDoc(directorRef)).data()
        }
        console.log(director);
        return {
            ...district,
            city,
            county,
            numOfPeople,
            director
        }
    }

    async function updateDistrict(district_id, data = {}) {
        const docRef = doc($firestore, "district", district_id)
        await updateDoc(docRef, data)
    }

    async function updateDistrictPreview(district_id, file) {
        let url = await uploadPhoto("images/district-previews", district_id, file)
        await updateDistrict(district_id, { previewURL: url })
    }

    async function createPost(type, user_id, district_id, data = {}) {
        const colRef = collection($firestore, "posts")
        if (data.starts) {
            data.starts = Timestamp.fromDate(new Date(data.starts))
        }
        if (data.ends) {
            data.ends = Timestamp.fromDate(new Date(data.ends))
        }
        await addDoc(colRef, {
            type,
            user_id,
            district_id,
            ...data,
            attendees: [],
            likes:[],
            created: serverTimestamp()
        })
    }

    async function getPosts(district_id) {
        console.log("getting posts with the id of ", district_id);
        const colRef = collection($firestore, "posts")
        let q = query(colRef,
            where("district_id", "==", district_id),
            where("type", "==", "post"),
            orderBy("created", "desc"),
            limit(10))
        let data = await getDocs(q)
        const user_ids = [...new Set(Array.from(data.docs, post => post.data().user_id))]
        const users = await getUsersData(user_ids)
        return Array.from(data.docs, (post) => {
            let data = post.data()
            let user = users.find(user => user.id === data.user_id)
            return {
                id:post.id,
                user:{
                    id:user.id,
                    ...user.data()
                },
                ...data
            }
        })
    }

    async function likePost(post_id){
        console.log(post_id);
        const docRef = doc($firestore, "posts", post_id)
        let post = (await getDoc(docRef)).data()
        if(post.likes.includes(store.user.id)){
            await updateDoc(docRef, {
                likes:arrayRemove(store.user.id)
            })
        }
        else{
            await updateDoc(docRef, {
                likes:arrayUnion(store.user.id)
            })
        }

    }

    async function createEvent(data) {
        await createPost("event", store.user.id, store.user.districtId, data)
    }

    async function getEvents(district_id, filter = {}) {
        const colRef = collection($firestore, "posts")
        let q = query(colRef,
            where("district_id", "==", district_id),
            where("type", "==", "event"))
        switch (filter.type) { // all, incoming, attending, outdated
            case "all":
                q = query(q, orderBy("created", "desc"))
                break;
            case "incoming":
                let twoWeeksLater = new Date()
                twoWeeksLater.setDate(twoWeeksLater.getDate() + 14)
                q = query(q, where('starts', "<", Timestamp.fromDate(twoWeeksLater)))
                q = query(q, where('starts', ">", Timestamp.fromDate(new Date())))
                q = query(q, orderBy('starts'))
                q = query(q, orderBy("created", "desc"))
                break;
            case "attending":
                let attendingEventIds = Array.isArray(store.user.attending_events) && store.user.attending_events.length > 0 ? store.user.attending_events : ["dummy_id"]
                if (Array.isArray(attendingEventIds)) {
                    q = query(q, where(documentId(), "in", attendingEventIds))
                    q = query(q, orderBy(documentId()))
                }
                break;
            case "outdated":
                q = query(q, where('ends', "<", Timestamp.fromDate(new Date())))
                q = query(q, orderBy('ends'))
                q = query(q, orderBy("created", "desc"))
                break;
        }

        q = query(q, limit(12))
        if (filter.nextPage) {
            let lastElem = filter.nextPage
            q = query(q, startAfter(lastElem))
        }
        return await getDocs(q)
    }

    async function getSingleEvent(post_id){
        let docRef = doc($firestore, "posts", post_id)
        return await getDoc(docRef)
    }

    async function deleteEvent(post_id) {
        let docRef = doc($firestore, "posts", post_id)
        await deleteDoc(docRef)
    }

    async function attendEvent(post_id) {
        let eventRef = doc($firestore, "posts", post_id)
        await updateDoc(eventRef, {
            attendees: arrayUnion(store.user.id)
        })
    }

    async function leaveEvent(post_id) {
        let eventRef = doc($firestore, "posts", post_id)
        await updateDoc(eventRef, {
            attendees: arrayRemove(store.user.id)
        })
    }

    async function getComments(post_id) {
        const colRef = collection($firestore, "comments")
        let q = query(colRef, where("post_id", "==", post_id), orderBy("created", "desc"))
        let comments = await getDocs(q)
        let user_ids = [...new Set(Array.from(comments.docs, comment => comment.data().user_id))]
        let users = await getUsersData(user_ids)
        return Array.from(comments.docs, comment => {
            let user = users.find(user => user.id === comment.data().user_id)
            comment.user = {...user.data(), id:user.id}
            return comment
        })
    }

    async function createComment(post_id, user_id, text) {
        let data = {
            post_id,
            user_id,
            text,
            created: serverTimestamp()
        }
        const colRef = collection($firestore, "comments")
        await addDoc(colRef, data)
    }

    async function deleteComment(comment_id) {
        let docRef = doc($firestore, "comments", comment_id)
        await deleteDoc(docRef)
    }

    async function getUsersData(user_ids = []) {
        const colRef = collection($firestore, "users")
        let q = query(colRef, where(documentId(), "in", user_ids))
        let users = await getDocs(q)
        return users.docs
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
        getMyDistrict,
        getDistrictMeta,
        updateDistrictPreview,
        setCounties,
        setDistricts,
        createPost,
        getPosts,
        likePost,
        createEvent,
        getEvents,
        getSingleEvent,
        deleteEvent,
        attendEvent,
        leaveEvent,
        getComments,
        createComment,
        deleteComment,
        getUsersData
    }
}