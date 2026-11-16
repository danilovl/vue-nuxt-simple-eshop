import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import Axios from 'axios'
import type {AxiosInstance} from 'axios'
import {useCookie} from '#imports'
import type {AuthModel} from '@/model/auth-model'
import {useApiUrls} from '@/constant/api-constant'

const TOKEN_COOKIE = 'user-token'
const TOKEN_MAX_AGE = 60 * 60

const authorizationHeader = (token: string | null | undefined): string => `Authentication<${token ?? ''}>`

export const useAuthStore = defineStore('auth', () => {
    const api = useApiUrls()

    // Cookie instead of localStorage: the token is also available during SSR (route guard, admin requests).
    const jwt = useCookie<string | null>(TOKEN_COOKIE, {
        default: (): null => null,
        maxAge: TOKEN_MAX_AGE,
        sameSite: 'lax'
    })

    // null = not verified yet, true/false = result of the server check
    const verified = ref<boolean | null>(null)
    let verifyRequest: Promise<boolean> | null = null

    const isAuthenticated = computed((): boolean => !!jwt.value && verified.value !== false)

    const authenticatedAxios = (): AxiosInstance => {
        return Axios.create({
            headers: {
                Authorization: authorizationHeader(jwt.value)
            }
        })
    }

    const setAuthenticated = (token: string): void => {
        jwt.value = token
        verified.value = true
        verifyRequest = null
    }

    const logout = (): void => {
        jwt.value = null
        verified.value = false
        verifyRequest = null
    }

    const verifyToken = async (token: string): Promise<boolean> => {
        const response = await Axios.post(api.VERIFY_TOKEN_URL, null, {
            headers: {Authorization: authorizationHeader(token)}
        })

        return response.data?.success === true
    }

    /**
     * Verifies the stored token once. Network errors don't log the user out,
     * they just mean the user is not considered authenticated right now.
     */
    const initializeAuthenticate = (): Promise<boolean> => {
        const token = jwt.value
        if (!token) {
            verified.value = false

            return Promise.resolve(false)
        }

        if (verified.value !== null) {
            return Promise.resolve(verified.value)
        }

        if (verifyRequest === null) {
            verifyRequest = verifyToken(token)
                .then((isValid: boolean): boolean => {
                    if (isValid) {
                        verified.value = true
                    } else {
                        logout()
                    }

                    return isValid
                })
                .catch((): boolean => false)
                .finally((): void => {
                    verifyRequest = null
                })
        }

        return verifyRequest
    }

    const authenticate = async (credentials: AuthModel): Promise<boolean> => {
        try {
            const response = await Axios.post(api.LOGIN_URL, credentials)
            if (response.data?.success === true && typeof response.data.token === 'string') {
                setAuthenticated(response.data.token)

                return true
            }
        } catch {
            // handled by the caller via the return value
        }

        return false
    }

    return {
        jwt,
        verified,
        isAuthenticated,
        authenticate,
        authenticatedAxios,
        logout,
        initializeAuthenticate
    }
})
