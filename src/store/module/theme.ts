import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {useCookie} from '#imports'

export type Theme = 'light' | 'dark'

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark'

/**
 * The initial theme is applied by an inline script in <head> (see nuxt.config.ts) before the first paint,
 * so the server never needs to know the system preference. The store only mirrors and changes it.
 */
export const useThemeStore = defineStore('theme', () => {
    // explicit user choice; empty = follow the system preference
    const preference = useCookie<Theme | null>('theme', {
        default: (): null => null,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax'
    })

    // resolved theme, known for sure only on the client
    const theme = ref<Theme>(isTheme(preference.value) ? preference.value : 'light')

    const isDark = computed((): boolean => theme.value === 'dark')

    const apply = (): void => {
        if (import.meta.client) {
            document.documentElement.setAttribute('data-bs-theme', theme.value)
        }
    }

    const setTheme = (value: Theme): void => {
        theme.value = value
        preference.value = value
        apply()
    }

    const toggleTheme = (): void => setTheme(isDark.value ? 'light' : 'dark')

    /** Client only: reads the theme the head script has already applied. */
    const initializeTheme = (): void => {
        if (!import.meta.client) {
            return
        }

        const applied = document.documentElement.getAttribute('data-bs-theme')
        theme.value = isTheme(applied) ? applied : 'light'
    }

    return {
        theme,
        isDark,
        setTheme,
        toggleTheme,
        initializeTheme
    }
})
