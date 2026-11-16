<template>
    <div>
        <NuxtPage/>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useNuxtApp} from '#imports'
import {useAuthStore} from '@/store/module/auth'
import {useCartStore} from '@/store/module/cart'
import {useFavoriteStore} from '@/store/module/favorite'
import {useThemeStore} from '@/store/module/theme'

const {$version} = useNuxtApp()
const authStore = useAuthStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const themeStore = useThemeStore()

onMounted((): void => {
    themeStore.initializeTheme()

    // Local data first: it must not depend on the API being reachable.
    cartStore.initializeCart()
    favoriteStore.initializeFavorite()

    // Never rejects, a failed verification just means "not authenticated".
    void authStore.initializeAuthenticate()

    $version()
})
</script>
