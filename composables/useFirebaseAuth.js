import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default function () {
    const { $auth } = useNuxtApp()
    const firebaseStore = useFirebaseStore()

    const authorizeWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        signInWithPopup($auth, provider).then(async user => {
            const userExists = await firebaseStore.getUserById(user.user.uid)
            if(!userExists){
                firebaseStore.createUser(user.user.uid,  user.user.email, {displayName:user.user.displayName, photoURL:user.user.photoURL, phoneNumber:user.user.phoneNumber})
            }
            navigateTo("/app")
        })
    }
    const registerUser = async (email, password) => {
        const user = await createUserWithEmailAndPassword($auth, email, password)
        firebaseStore.createUser(user.user.uid, user.user.email, user.user.displayName )
        navigateTo("/app")
    }
    const login = async (email, password) => {
        await signInWithEmailAndPassword($auth, email, password)
        navigateTo("/app")
    }
    return {
        registerUser,
        login,
        authorizeWithGoogle
    }
}