import {onMounted, ref} from 'vue'
import type {Ref} from 'vue'

/**
 * false on the server and during hydration, true after mount.
 *
 * Cart and favorites live in localStorage, which the server can't read. Components showing them
 * render the "empty" state first (identical markup on server and client, no hydration mismatch)
 * and switch to the real state once mounted.
 */
export function useIsMounted(): Ref<boolean> {
    const mounted = ref<boolean>(false)

    onMounted((): void => {
        mounted.value = true
    })

    return mounted
}
