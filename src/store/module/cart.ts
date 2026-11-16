import {computed, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import {ProductModel} from '@/model/product-model'
import type {BasketModel} from '@/model/basket-model'
import {basketLineTotal, basketTotal, normalizeQuantity} from '@/model/basket-model'

const LOCAL_STORAGE_NAME = 'cart'

export const useCartStore = defineStore('cart', () => {
    const lines = ref<BasketModel[]>([])
    let loaded = false

    const itemCount = computed((): number => {
        return lines.value.reduce((total: number, line: BasketModel): number => total + line.quantity, 0)
    })

    const totalPrice = computed((): number => basketTotal(lines.value))

    const findLine = (productId: number | null): BasketModel | undefined => {
        return lines.value.find((line: BasketModel): boolean => line.product.id === productId)
    }

    const totalItemByProduct = (product: ProductModel): number => {
        return findLine(product.id)?.quantity ?? 0
    }

    const totalPriceByProduct = (product: ProductModel): number => {
        const line = findLine(product.id)

        return line ? basketLineTotal(line) : 0
    }

    const isProductInCart = (product: ProductModel): boolean => {
        return totalItemByProduct(product) > 0
    }

    const addProduct = (product: ProductModel): void => {
        const line = findLine(product.id)

        if (line) {
            line.quantity++
        } else {
            lines.value.push({product: {...product}, quantity: 1})
        }
    }

    const changeQuantity = (line: BasketModel, quantity: number): void => {
        line.quantity = normalizeQuantity(quantity)
    }

    const removeLine = (lineToRemove: BasketModel): void => {
        lines.value = lines.value.filter((line: BasketModel): boolean => line !== lineToRemove)
    }

    const removeProduct = (product: ProductModel): void => {
        const line = findLine(product.id)
        if (!line) {
            return
        }

        if (line.quantity > 1) {
            line.quantity--
        } else {
            removeLine(line)
        }
    }

    const removeProductById = (productId: number | null): void => {
        lines.value = lines.value.filter((line: BasketModel): boolean => line.product.id !== productId)
    }

    const updateProductData = (product: ProductModel): void => {
        const line = findLine(product.id)
        if (line) {
            line.product = {...product}
        }
    }

    const getLines = (): BasketModel[] => {
        return lines.value
    }

    const clearCartData = (): void => {
        lines.value = []
    }

    const loadCartData = (): void => {
        try {
            const data = localStorage.getItem(LOCAL_STORAGE_NAME)
            const parsed = data ? JSON.parse(data) : []

            lines.value = Array.isArray(parsed)
                ? parsed
                    .filter((line: any): boolean => line?.product?.id != null)
                    .map((line: any): BasketModel => ({
                        product: ProductModel.fromApi(line.product),
                        quantity: normalizeQuantity(line.quantity)
                    }))
                : []
        } catch {
            lines.value = []
        }
    }

    // Created in the store scope (not in a component), so it lives as long as the store.
    watch(lines, (): void => {
        if (loaded) {
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(lines.value))
        }
    }, {deep: true})

    /** Client only, idempotent. */
    const initializeCart = (): void => {
        if (loaded || !import.meta.client) {
            return
        }

        loadCartData()
        loaded = true
    }

    return {
        lines,
        itemCount,
        totalPrice,
        totalItemByProduct,
        totalPriceByProduct,
        isProductInCart,
        getLines,
        addProduct,
        changeQuantity,
        removeProduct,
        removeProductById,
        updateProductData,
        removeLine,
        initializeCart,
        clearCartData
    }
})
