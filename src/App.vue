<template>
    <div>
        <NuxtPage/>
    </div>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted} from 'vue'
import {useLocaleStore} from '@/store/module/locale'
import {useAuthStore} from '@/store/module/auth'
import {useCartStore} from '@/store/module/cart'
import {useFavoriteStore} from '@/store/module/favorite'

const localeStore = useLocaleStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

if (process.client) {
    onMounted(async (): Promise<any> => {
        localeStore.initializeLocale()
        await authStore.initializeAuthenticate()
        cartStore.initializeCart()
        favoriteStore.initializeFavorite()
    })
}

const app = getCurrentInstance()
const version = app?.appContext.config.globalProperties.$version
version()
</script>
