<template>
    <router-link
        class="btn-icon"
        :to="{name: 'favorite'}"
        :aria-label="$filters.transFilter('text.favorites')"
    >
        <font-awesome-icon icon="fa-regular fa-heart"/>
        <!-- favorites live in localStorage, so the counter can only be rendered on the client -->
        <ClientOnly>
            <span v-if="favoriteStore.itemCount > 0" class="counter-badge">{{ favoriteStore.itemCount }}</span>
        </ClientOnly>
    </router-link>
</template>

<script setup lang="ts">
import {useFavoriteStore} from '@/store/module/favorite'

const favoriteStore = useFavoriteStore()
</script>
