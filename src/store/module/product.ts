import {ref} from 'vue'
import {defineStore} from 'pinia'
import Axios from 'axios'
import {ProductModel} from '@/model/product-model'
import {AlertModel} from '@/model/alert-model'
import AlertConstant from '@/constant/alert-constant'
import {useApiUrls} from '@/constant/api-constant'
import {useLoaderStore} from '@/store/module/loader'
import {useAlertStore} from '@/store/module/alert'
import {useCartStore} from '@/store/module/cart'
import {useFavoriteStore} from '@/store/module/favorite'
import {errorMessage} from '@/utils/error-message'

export const useProductStore = defineStore('product', () => {
    const api = useApiUrls()
    const loaderStore = useLoaderStore()
    const alertStore = useAlertStore()
    const cartStore = useCartStore()
    const favoriteStore = useFavoriteStore()

    const product = ref<ProductModel | null>(null)

    const getProduct = (): ProductModel | null => {
        return product.value
    }

    const setProduct = (value: ProductModel | null): void => {
        product.value = value
    }

    /** Loads the product detail. Skips the request when the product is already loaded (e.g. by SSR). */
    const initializeProduct = async (productId: number): Promise<void> => {
        if (product.value?.id === productId) {
            return
        }

        // Never show a previously opened product while (or if) the new one fails to load.
        setProduct(null)

        if (!Number.isInteger(productId) || productId < 1) {
            return
        }

        try {
            const response = await loaderStore.track(() => Axios.get(`${api.PRODUCTS_URL}/${productId}`))
            const loaded = ProductModel.fromApi(response.data)

            setProduct(loaded)

            // keep snapshots stored in the cart / favorites in sync with the current data
            cartStore.updateProductData(loaded)
            favoriteStore.updateProductData(loaded)
        } catch (error: unknown) {
            alertStore.addAlert(new AlertModel(AlertConstant.ERROR, errorMessage(error)))
        }
    }

    return {
        product,
        getProduct,
        setProduct,
        initializeProduct
    }
})
