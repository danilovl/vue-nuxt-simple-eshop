<template>
    <div v-if="productsStore.pageCount() > 1" class="d-flex justify-content-center mt-5">
        <vue-awesome-paginate
            v-model="page"
            :total-items="productsStore.totalCount"
            :items-per-page="productsStore.pageSize"
            :max-pages-shown="5"
        />
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useProductsStore} from '@/store/module/products'

const productsStore = useProductsStore()

const page = computed({
    get: (): number => productsStore.getCurrentPage(),
    set: (value: number): void => {
        void productsStore.setCurrentPage(value)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
})
</script>
