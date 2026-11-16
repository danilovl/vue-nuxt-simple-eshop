<template>
    <div>
        <div class="page-header">
            <div>
                <h1>{{ $filters.transFilter('text.dashboard') }}</h1>
                <p>{{ $filters.transFilter('text.dashboard_hint') }}</p>
            </div>
            <nav class="segmented" aria-label="Admin">
                <router-link :to="{name: 'admin_product_list'}" :class="{active: isProductRoute}">
                    <font-awesome-icon icon="fa-solid fa-box-open"/>
                    {{ $filters.transFilter('btn.products') }}
                </router-link>
                <router-link :to="{name: 'admin_order_list'}">
                    <font-awesome-icon icon="fa-solid fa-receipt"/>
                    {{ $filters.transFilter('btn.orders') }}
                </router-link>
            </nav>
        </div>

        <!-- key: create/edit share ProductEditor, it must be re-created per route -->
        <router-view :key="route.fullPath"/>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const isProductRoute = computed((): boolean => {
    return route.name === 'admin_product_create' || route.name === 'admin_product_edit'
})
</script>
