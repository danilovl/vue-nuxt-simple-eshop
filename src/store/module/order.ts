import {ref} from 'vue'
import {defineStore} from 'pinia'
import Axios from 'axios'
import type {OrderModel} from '@/model/order-model'
import {AlertModel} from '@/model/alert-model'
import AlertConstant from '@/constant/alert-constant'
import {useApiUrls} from '@/constant/api-constant'
import {useAuthStore} from '@/store/module/auth'
import {useLoaderStore} from '@/store/module/loader'
import {useAlertStore} from '@/store/module/alert'
import {errorMessage} from '@/utils/error-message'

export const useOrderStore = defineStore('order', () => {
    const api = useApiUrls()
    const authStore = useAuthStore()
    const loaderStore = useLoaderStore()
    const alertStore = useAlertStore()

    const orders = ref<OrderModel[]>([])

    const getOrders = (): OrderModel[] => {
        return orders.value
    }

    const loadOrders = async (): Promise<void> => {
        try {
            const response = await loaderStore.track(() => authStore.authenticatedAxios().get(api.ORDERS_URL))
            orders.value = Array.isArray(response.data) ? response.data : []
        } catch (error: unknown) {
            alertStore.addAlert(new AlertModel(AlertConstant.ERROR, errorMessage(error)))
        }
    }

    /** Toggles the processed flag; the local state changes only after the server confirms it. */
    const toggleOrderProcessed = async (order: OrderModel): Promise<void> => {
        const updated: OrderModel = {...order, processed: !order.processed}

        try {
            await loaderStore.track(() => authStore.authenticatedAxios().put(`${api.ORDERS_URL}/${order.id}`, updated))
            order.processed = updated.processed
        } catch (error: unknown) {
            alertStore.addAlert(new AlertModel(AlertConstant.ERROR, errorMessage(error)))
        }
    }

    /** @returns id of the created order, or null when the order could not be stored */
    const storeOrder = async (order: OrderModel): Promise<number | null> => {
        if (order.basket.length === 0) {
            return null
        }

        try {
            const response = await loaderStore.track(() => Axios.post(api.ORDERS_URL, order))

            return response.data?.id ?? null
        } catch (error: unknown) {
            alertStore.addAlert(new AlertModel(AlertConstant.ERROR, errorMessage(error)))

            return null
        }
    }

    return {
        orders,
        getOrders,
        loadOrders,
        toggleOrderProcessed,
        storeOrder
    }
})
