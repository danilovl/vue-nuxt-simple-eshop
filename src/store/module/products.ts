import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import Axios from 'axios'
import {ProductModel} from '@/model/product-model'
import {AlertModel} from '@/model/alert-model'
import AlertConstant from '@/constant/alert-constant'
import {useApiUrls} from '@/constant/api-constant'
import transFilter from '@/plugins/filter/trans-filter'
import {useLoaderStore} from '@/store/module/loader'
import {useAlertStore} from '@/store/module/alert'
import {useAuthStore} from '@/store/module/auth'
import {useCartStore} from '@/store/module/cart'
import {useFavoriteStore} from '@/store/module/favorite'
import {errorMessage} from '@/utils/error-message'

type Pages = Record<number, ProductModel[]>

export const useProductsStore = defineStore('products', () => {
    const api = useApiUrls()
    const loaderStore = useLoaderStore()
    const alertStore = useAlertStore()
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const favoriteStore = useFavoriteStore()

    const currentPage = ref<number>(1)
    const pageSize = ref<number>(12)
    const totalVisible = ref<number>(8)
    const pages = ref<Pages>({})
    const searchTerm = ref<string>('')
    const totalCount = ref<number>(0)

    // Only the response of the latest request is applied (protects against out-of-order responses).
    let lastRequestId = 0

    const serverPageCount = computed((): number => Math.ceil(totalCount.value / pageSize.value))

    const alertError = (error: unknown): void => {
        alertStore.addAlert(new AlertModel(AlertConstant.ERROR, errorMessage(error)))
    }

    const alertSuccess = (key: string): void => {
        alertStore.addAlert(new AlertModel(AlertConstant.SUCCESS, transFilter(key)))
    }

    const getState = () => ({
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        totalVisible: totalVisible.value,
        totalCount: totalCount.value
    })

    const getCurrentPage = (): number => currentPage.value

    const pageCount = (): number => serverPageCount.value

    const getSearchTerm = (): string => searchTerm.value

    const processedCurrentPageProducts = (): ProductModel[] => pages.value[currentPage.value] ?? []

    const isProducts = (): boolean => processedCurrentPageProducts().length > 0

    const clearPages = (): void => {
        pages.value = {}
    }

    const fetchPage = async (page: number): Promise<void> => {
        const requestId = ++lastRequestId

        const params = new URLSearchParams({
            _page: String(page),
            _limit: String(pageSize.value)
        })
        if (searchTerm.value !== '') {
            params.set('q', searchTerm.value)
        }

        try {
            const response = await loaderStore.track(() => Axios.get(`${api.PRODUCTS_URL}?${params.toString()}`))
            if (requestId !== lastRequestId) {
                return
            }

            totalCount.value = Number(response.headers['x-total-count']) || 0
            pages.value[page] = Array.isArray(response.data) ? response.data.map(ProductModel.fromApi) : []
        } catch (error: unknown) {
            if (requestId === lastRequestId) {
                alertError(error)
            }
        }
    }

    /** Loads the current page unless it is already loaded (e.g. transferred from SSR). */
    const getData = async (): Promise<void> => {
        if (pages.value[currentPage.value] === undefined) {
            await fetchPage(currentPage.value)
        }
    }

    const reloadCurrentPage = async (): Promise<void> => {
        clearPages()
        await fetchPage(currentPage.value)

        // the last page may have become empty (e.g. after a delete)
        if (currentPage.value > 1 && currentPage.value > serverPageCount.value) {
            currentPage.value = Math.max(1, serverPageCount.value)
            await fetchPage(currentPage.value)
        }
    }

    const setCurrentPage = async (page: number): Promise<void> => {
        currentPage.value = page
        await getData()
    }

    const setSearchTerm = async (term: string): Promise<void> => {
        const normalized = term.trim()
        if (normalized === searchTerm.value) {
            return
        }

        searchTerm.value = normalized
        currentPage.value = 1
        clearPages()
        await fetchPage(1)
    }

    const addProduct = async (product: ProductModel): Promise<boolean> => {
        try {
            const {id: _id, ...payload} = product
            await loaderStore.track(() => authStore.authenticatedAxios().post(api.PRODUCTS_URL, payload))
            alertSuccess('alert.product_has_been_added')
        } catch (error: unknown) {
            alertError(error)

            return false
        }

        await reloadCurrentPage()

        return true
    }

    const updateProduct = async (product: ProductModel): Promise<boolean> => {
        try {
            const response = await loaderStore.track(
                () => authStore.authenticatedAxios().put(`${api.PRODUCTS_URL}/${product.id}`, product)
            )
            const updated = ProductModel.fromApi(response.data)

            for (const items of Object.values(pages.value)) {
                const index = items.findIndex((item: ProductModel): boolean => item.id === updated.id)
                if (index > -1) {
                    items[index] = updated
                }
            }
            cartStore.updateProductData(updated)
            favoriteStore.updateProductData(updated)

            alertSuccess('alert.product_has_been_updated')

            return true
        } catch (error: unknown) {
            alertError(error)

            return false
        }
    }

    const removeProduct = async (product: ProductModel): Promise<boolean> => {
        try {
            await loaderStore.track(() => authStore.authenticatedAxios().delete(`${api.PRODUCTS_URL}/${product.id}`))
            alertSuccess('alert.product_has_been_removed')
        } catch (error: unknown) {
            alertError(error)

            return false
        }

        cartStore.removeProductById(product.id)
        favoriteStore.removeProductById(product.id)
        await reloadCurrentPage()

        return true
    }

    const getProduct = async (id: number): Promise<ProductModel | null> => {
        try {
            const response = await loaderStore.track(() => Axios.get(`${api.PRODUCTS_URL}/${id}`))

            return ProductModel.fromApi(response.data)
        } catch (error: unknown) {
            alertError(error)

            return null
        }
    }

    return {
        currentPage,
        pageSize,
        totalVisible,
        pages,
        searchTerm,
        totalCount,
        getState,
        getData,
        getCurrentPage,
        processedCurrentPageProducts,
        pageCount,
        getSearchTerm,
        setSearchTerm,
        getProduct,
        setCurrentPage,
        removeProduct,
        addProduct,
        updateProduct,
        isProducts
    }
})
