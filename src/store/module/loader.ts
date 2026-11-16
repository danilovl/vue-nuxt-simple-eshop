import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
    // Counter instead of a flag so that parallel requests don't hide the loader too early.
    const pending = ref<number>(0)

    const isLoading = computed((): boolean => pending.value > 0)

    const setLoading = (loading: boolean): void => {
        pending.value = Math.max(0, pending.value + (loading ? 1 : -1))
    }

    const track = async <T>(action: () => Promise<T>): Promise<T> => {
        setLoading(true)
        try {
            return await action()
        } finally {
            setLoading(false)
        }
    }

    return {
        pending,
        isLoading,
        setLoading,
        track
    }
})
