import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"
import {getStorage} from "firebase/storage"
import { setDoc, getDoc, doc, getDocs, updateDoc, collection, WriteBatch, writeBatch, query, where } from "firebase/firestore"
export default defineNuxtPlugin(async nuxtApp => {
    const config = useRuntimeConfig()
    const store = useAppStore()
    const firebaseConfig = {
        apiKey: "AIzaSyDeoA9AZQfU1htxUxoGO6M2LbJGChS5OJ4",
        authDomain: "mahalleapp-8c649.firebaseapp.com",
        projectId: "mahalleapp-8c649",
        storageBucket: "mahalleapp-8c649.appspot.com",
        messagingSenderId: "965204160771",
        appId: "1:965204160771:web:b99e2d24cf0547cd44f936",
        measurementId: "G-25R57CCPDQ"
    };

    const app = initializeApp(firebaseConfig)

    const analytics = getAnalytics(app)
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const storage = getStorage(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)

    nuxtApp.vueApp.provide('storage', storage)
    nuxtApp.provide('storage', storage)

     await new Promise( resolve => {
        auth.authStateReady().then(async res => {
            if(!auth.currentUser){
                navigateTo("/auth/sign-in")
                resolve(false)
            }
            const docRef = doc(firestore, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            store.user = {id:docSnap.id,...docSnap.data()}
            resolve(store.user)
        })
     })

    auth.onAuthStateChanged(async function (user) {
        if (!auth.currentUser) {
            navigateTo("/auth/sign-in")
        }
        const docRef = doc(firestore, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        store.user = {id:docSnap.id,...docSnap.data()}
    })

    console.log(auth.currentUser);
})