import enJson from '@/locale/en.json'
import ruJson from '@/locale/ru.json'
import LocaleConstant from '@/constant/locale-constant'
import {useLocaleStore} from '@/store/module/locale'

type Locale = Record<string, string>

const locales: Record<string, Locale> = {
    [LocaleConstant.EN]: enJson,
    [LocaleConstant.RU]: ruJson
}

/**
 * @param key translation key
 * @param locale explicit locale; when omitted the current locale from the store is used
 */
export default function transFilter(key: string, locale?: string): string {
    const chooseLocale = locale ?? useLocaleStore().getLocale
    const messages = locales[chooseLocale] ?? locales[LocaleConstant.EN]

    return messages[key] ?? locales[LocaleConstant.EN][key] ?? `[Trans error]: key ${key} not found`
}
