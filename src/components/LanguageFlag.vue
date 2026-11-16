<template>
    <label class="lang-select" :title="$filters.transFilter('btn.language')">
        <font-awesome-icon icon="fa-solid fa-globe" class="lang-icon"/>
        <span class="visually-hidden">{{ $filters.transFilter('btn.language') }}</span>
        <select v-model="locale">
            <option v-for="option in localeStore.getLocalesSelect" :key="option.value" :value="option.value">
                {{ option.value.toUpperCase() }}
            </option>
        </select>
    </label>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useLocaleStore} from '@/store/module/locale'

const localeStore = useLocaleStore()

// <html lang> is set reactively in layout/Main.vue (useHead), also during SSR.
const locale = computed({
    get: (): string => localeStore.getLocale,
    set: (value: string): void => localeStore.setLocale(value)
})
</script>

<style scoped>
.lang-select {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 2.5rem;
    margin: 0;
    padding: 0 0.5rem 0 0.75rem;
    border-radius: 0.75rem;
    color: var(--bs-body-color);
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.lang-select:hover {
    background: var(--app-surface-2);
}

.lang-select:focus-within {
    outline: 2px solid var(--bs-primary);
    outline-offset: 2px;
}

.lang-icon {
    margin-right: 0.375rem;
    color: var(--app-muted);
}

select {
    border: 0;
    background: transparent;
    color: inherit;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    appearance: none;
    padding-right: 0.25rem;
}

select:focus {
    outline: none;
}

select option {
    color: #0f172a;
}
</style>
