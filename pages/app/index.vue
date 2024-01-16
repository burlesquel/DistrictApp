<script setup>
definePageMeta({
    layout:"app-default"
})
const store = useAppStore()
</script>

<template>
    <div>
        selam {{ store.user ? store.user : "guest" }} !
    </div>
</template>