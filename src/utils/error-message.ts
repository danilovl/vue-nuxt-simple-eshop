import {isAxiosError} from 'axios'

export function errorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        return error.response?.data?.error ?? error.message
    }

    return error instanceof Error ? error.message : String(error)
}
