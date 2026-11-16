import currencyFilter from '@/plugins/filter/currency-filter'
import transFilter from '@/plugins/filter/trans-filter'
import truncateFilter from '@/plugins/filter/truncate-filter'

const filters = {
    currencyFilter,
    transFilter,
    truncateFilter
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $filters: typeof filters
    }
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties.$filters = filters
})
