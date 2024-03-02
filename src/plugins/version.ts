export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties.$version = (): void => console.log(`Demo application version '1.0.0'`)
})
