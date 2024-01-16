import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin( async nuxtApp => {
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

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)

    auth.authStateReady().then(res => {
        store.user = auth.currentUser
    })

    await new Promise (resolve => {
        auth.onAuthStateChanged(function(user){
            store.user = user
            store.authChecked = true
            if(!user){
                navigateTo("/auth/sign-in")
            }
            resolve(user)
        })
    })
})