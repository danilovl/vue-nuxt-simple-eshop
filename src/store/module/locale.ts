import {computed} from 'vue'
import {defineStore} from 'pinia'
import {useCookie} from '#imports'
import LocaleConstant from '@/constant/locale-constant'

const LOCALES: Record<string, string> = {
    [LocaleConstant.EN]: 'English',
    [LocaleConstant.RU]: 'Russian'
}

const isSupportedLocale = (locale: unknown): locale is string => {
    return typeof locale === 'string' && Object.prototype.hasOwnProperty.call(LOCALES, locale)
}

export const useLocaleStore = defineStore('locale', () => {
    // A cookie (unlike localStorage) is available during SSR, so server and client render the same language.
    const locale = useCookie<string>('locale', {
        default: (): string => LocaleConstant.EN,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax'
    })

    if (!isSupportedLocale(locale.value)) {
        locale.value = LocaleConstant.EN
    }

    const getLocale = computed((): string => locale.value)
    const getLocalesSelect = computed((): { text: string, value: string }[] => {
        return Object.keys(LOCALES).map((key: string) => ({
            text: LOCALES[key],
            value: key
        }))
    })

    const setLocale = (value: string): void => {
        locale.value = isSupportedLocale(value) ? value : LocaleConstant.EN
    }

    return {
        locale,
        getLocale,
        getLocalesSelect,
        setLocale
    }
})
