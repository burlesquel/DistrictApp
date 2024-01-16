import {setDoc, getDoc, doc} from "firebase/firestore"

export default function(){
    const { $firestore } = useNuxtApp()
    async function createUser(id,email, {...args} ){
       const docRef = doc($firestore, "users", id)
        await setDoc(docRef, {
            email,
            ...args,
            role:0
        })
    }

    async function getUserById(id){
        const docRef = doc($firestore, "users", id);
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            return docSnap.data()
        }
        else{
            return null
        }
    }
    return {
        createUser,
        getUserById
    }
}