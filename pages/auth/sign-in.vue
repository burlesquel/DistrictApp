<script setup>
import { useAppStore } from '@/stores/index';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
useHead({ title: 'Login Boxed' });
const router = useRouter();
const { registerUser, authorizeWithGoogle, login } = useFirebaseAuth()
definePageMeta({
    layout: 'app-auth',
});
const errors = {
    "auth/invalid-credential": "Invalid credentials. Try something different.",
    "auth/missing-password": "Please enter a password.",
    "auth/missing-email": "Please enter an email.",
    "auth/timeout": "The page timed out."
}
const onLogin = (e) => {
    const { email, password } = e.target
    login(email.value, password.value).catch(err => {
        console.log(err.message);
        const toast = Swal.mixin({
            toast: true,
            position: "bottom-start",
            showConfirmButton: false,
            timer: 3000,
            title: errors[err.code] ?? err.message
        });
        toast.fire()
    })
}
const onGoogleAuth = authorizeWithGoogle
</script>

<template>
    <div>
        <div class="absolute inset-0">
            <img src="/app/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>

        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/app/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <img src="/app/images/auth/coming-soon-object1.png" alt="image"
                class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/app/images/auth/coming-soon-object2.png" alt="image"
                class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/app/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/app/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                <div
                    class="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">

                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in
                            </h1>
                            <p class="text-base font-bold leading-normal text-white-dark">Enter your email and password to
                                login</p>
                        </div>
                        <form class="space-y-5 dark:text-white" @submit.prevent="onLogin">
                            <div>
                                <label for="Email">Email</label>
                                <div class="relative text-white-dark">
                                    <input id="Email" name="email" type="email" required placeholder="Enter Email"
                                        class="form-input ps-10 placeholder:text-white-dark" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-mail :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="Password">Password</label>
                                <div class="relative text-white-dark">
                                    <input id="Password" name="password" type="password" required placeholder="Enter Password"
                                        class="form-input ps-10 placeholder:text-white-dark" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-lock-dots :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <button type="submit"
                                class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                Sign in
                            </button>
                        </form>
                        <div class="relative my-7 text-center md:mb-9">
                            <span
                                class="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                            <span
                                class="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                        </div>
                        <div class="mb-10 md:mb-[60px]">
                            <button @click="onGoogleAuth"
                                class="btn !mt-6 w-full border border-red-200 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                <icon-google class="mr-4" /><span>SIGN IN WITH GOOGLE</span>
                            </button>
                        </div>
                        <div class="text-center dark:text-white">
                            Don't have an account ?
                            <NuxtLink to="/auth/sign-up"
                                class="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                SIGN UP
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
