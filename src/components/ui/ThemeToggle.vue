<template>
    <button
        type="button"
        class="btn-icon"
        :aria-label="$filters.transFilter('btn.toggle_theme')"
        :title="$filters.transFilter('btn.toggle_theme')"
        @click="themeStore.toggleTheme()"
    >
        <!-- the real theme (system preference) is only known in the browser -->
        <ClientOnly>
            <font-awesome-icon :icon="themeStore.isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"/>
            <template #fallback>
                <font-awesome-icon icon="fa-solid fa-moon"/>
            </template>
        </ClientOnly>
    </button>
</template>

<script setup lang="ts">
import {useThemeStore} from '@/store/module/theme'

const themeStore = useThemeStore()
</script>
