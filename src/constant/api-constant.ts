import {useRuntimeConfig} from '#imports'

export type ApiUrls = {
    BASE_URL: string;
    PRODUCTS_URL: string;
    ORDERS_URL: string;
    LOGIN_URL: string;
    VERIFY_TOKEN_URL: string;
}

/**
 * Must be called synchronously inside a Nuxt context (component or store setup),
 * the result can then be used freely after any `await`.
 */
export function useApiUrls(): ApiUrls {
    const BASE_URL = String(useRuntimeConfig().public.apiBase).replace(/\/+$/, '')

    return {
        BASE_URL,
        PRODUCTS_URL: `${BASE_URL}/products`,
        ORDERS_URL: `${BASE_URL}/orders`,
        LOGIN_URL: `${BASE_URL}/login`,
        VERIFY_TOKEN_URL: `${BASE_URL}/verify-token`
    }
}
