export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties.$router.beforeEach((to, from, next) => {
        if (!process.client) {
            next()
        }

        const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
        const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

        if (nearestWithTitle) {
            document.title = nearestWithTitle.meta.title
        }

        if (!nearestWithMeta) {
            return next()
        }

        next()
    })
})
