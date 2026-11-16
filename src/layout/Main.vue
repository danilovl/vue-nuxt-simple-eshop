<template>
    <div class="app-shell">
        <Loader/>
        <a class="skip-link" href="#main-content" @click.prevent="skipToContent">Skip to content</a>
        <header-section/>

        <main id="main-content" class="app-main" tabindex="-1">
            <div class="container">
                <router-view/>
            </div>
        </main>

        <footer-section/>
        <Alert/>
    </div>
</template>

<script setup lang="ts">
import {useHead} from '#imports'
import {useRoute} from 'vue-router'
import FooterSection from '@/components/FooterSection.vue'
import HeaderSection from '@/components/HeaderSection.vue'
import Alert from '@/components/Alert.vue'
import Loader from '@/components/Loader.vue'
import {useLocaleStore} from '@/store/module/locale'
import transFilter from '@/plugins/filter/trans-filter'

const route = useRoute()
const localeStore = useLocaleStore()

// Reactive head: works for SSR and for client side navigation.
// The resolvers run while the head is rendered (outside the component context on the server),
// so the locale is passed explicitly instead of letting transFilter look up the store.
useHead({
    title: (): string => {
        const appName = transFilter('app.name', localeStore.getLocale)

        return typeof route.meta.title === 'string' ? `${route.meta.title} · ${appName}` : appName
    },
    htmlAttrs: {
        lang: (): string => localeStore.getLocale
    }
})

const skipToContent = (): void => {
    const main = document.getElementById('main-content')
    main?.focus()
    main?.scrollIntoView()
}
</script>

<style scoped>
.app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-main {
    flex: 1 0 auto;
    padding: 2rem 0 4rem;
}

.skip-link {
    position: absolute;
    left: 1rem;
    top: -3rem;
    z-index: 2000;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: var(--bs-primary);
    color: #fff;
    transition: top 0.2s ease;
}

.skip-link:focus {
    top: 1rem;
}
</style>
