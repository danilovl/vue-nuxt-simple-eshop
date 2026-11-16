const APP_VERSION = '1.0.0'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            version: (): void => console.log(`Demo application version '${APP_VERSION}'`)
        }
    }
})
