import currencyFilter from '@/plugins/filter/currency-filter'
import transFilter from '@/plugins/filter/trans-filter'
import truncateFilter from '@/plugins/filter/truncate-filter'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties.$filters = {
        currencyFilter,
        transFilter,
        truncateFilter
    }
})
