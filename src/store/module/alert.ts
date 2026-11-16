import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {AlertModel} from '@/model/alert-model'

const ALERT_LIFETIME_MS = 3000

export const useAlertStore = defineStore('alert', () => {
    const alerts = ref<AlertModel[]>([])

    const getAlerts = (): AlertModel[] => {
        return alerts.value
    }

    const removeAlertById = (id: number): void => {
        alerts.value = alerts.value.filter((item: AlertModel): boolean => item.id !== id)
    }

    const addAlert = (alert: AlertModel): void => {
        // plain copy: the state may be serialized into the SSR payload
        alerts.value.push({id: alert.id, type: alert.type, text: alert.text})

        if (import.meta.client) {
            setTimeout((): void => removeAlertById(alert.id), ALERT_LIFETIME_MS)
        }
    }

    return {
        alerts,
        getAlerts,
        addAlert,
        removeAlertById
    }
})
