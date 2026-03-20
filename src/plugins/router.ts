export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties.$router.beforeEach((to) => {
        if (!process.client) {
            return
        }

        const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

        if (nearestWithTitle && typeof nearestWithTitle.meta.title === 'string') {
            document.title = nearestWithTitle.meta.title
        }
    })
})
