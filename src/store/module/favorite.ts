import {computed, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import {ProductModel} from '@/model/product-model'

const LOCAL_STORAGE_NAME = 'favorite'

export const useFavoriteStore = defineStore('favorite', () => {
    const favorites = ref<ProductModel[]>([])
    let loaded = false

    const itemCount = computed((): number => favorites.value.length)

    const getFavorites = computed((): ProductModel[] => favorites.value)

    const isProductIsFavorite = (product: ProductModel): boolean => {
        return favorites.value.some((item: ProductModel): boolean => item.id === product.id)
    }

    const addProduct = (product: ProductModel): void => {
        if (!isProductIsFavorite(product)) {
            favorites.value.push({...product})
        }
    }

    const removeProduct = (product: ProductModel): void => {
        removeProductById(product.id)
    }

    const removeProductById = (productId: number | null): void => {
        favorites.value = favorites.value.filter((item: ProductModel): boolean => item.id !== productId)
    }

    const updateProductData = (product: ProductModel): void => {
        const index = favorites.value.findIndex((item: ProductModel): boolean => item.id === product.id)
        if (index > -1) {
            favorites.value[index] = {...product}
        }
    }

    const addOrRemoveProduct = (product: ProductModel): void => {
        if (isProductIsFavorite(product)) {
            removeProduct(product)
        } else {
            addProduct(product)
        }
    }

    const clearFavoriteData = (): void => {
        favorites.value = []
    }

    const loadFavoriteData = (): void => {
        try {
            const data = localStorage.getItem(LOCAL_STORAGE_NAME)
            const parsed = data ? JSON.parse(data) : []

            favorites.value = Array.isArray(parsed)
                ? parsed.filter((item: any): boolean => item?.id != null).map(ProductModel.fromApi)
                : []
        } catch {
            favorites.value = []
        }
    }

    watch(favorites, (): void => {
        if (loaded) {
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(favorites.value))
        }
    }, {deep: true})

    /** Client only, idempotent. */
    const initializeFavorite = (): void => {
        if (loaded || !import.meta.client) {
            return
        }

        loadFavoriteData()
        loaded = true
    }

    return {
        favorites,
        itemCount,
        getFavorites,
        isProductIsFavorite,
        initializeFavorite,
        addOrRemoveProduct,
        addProduct,
        removeProduct,
        removeProductById,
        updateProductData,
        clearFavoriteData
    }
})
