<template>
    <div class="surface">
        <div class="admin-toolbar">
            <h2 class="admin-toolbar-title">{{ $filters.transFilter('btn.orders') }}</h2>
            <div class="segmented" role="tablist">
                <button
                    type="button"
                    role="tab"
                    :aria-selected="!showProcessed"
                    :class="{active: !showProcessed}"
                    @click="showProcessed = false"
                >
                    {{ $filters.transFilter('text.status_new') }}
                    <span class="segmented-count">{{ newCount }}</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    :aria-selected="showProcessed"
                    :class="{active: showProcessed}"
                    @click="showProcessed = true"
                >
                    {{ $filters.transFilter('text.status_processed') }}
                    <span class="segmented-count">{{ orderStore.orders.length - newCount }}</span>
                </button>
            </div>
        </div>

        <div v-if="displayOrders.length > 0" class="table-responsive">
            <table class="table table-hover table-modern">
                <thead>
                <tr>
                    <th>{{ $filters.transFilter('text.id') }}</th>
                    <th>{{ $filters.transFilter('text.customer') }}</th>
                    <th class="d-none d-md-table-cell">{{ $filters.transFilter('text.address') }}</th>
                    <th>{{ $filters.transFilter('text.status') }}</th>
                    <th class="text-end">{{ $filters.transFilter('text.total') }}</th>
                    <th class="text-end">{{ $filters.transFilter('text.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in displayOrders" :key="String(order.id)">
                    <td class="fw-bold">#{{ order.id }}</td>
                    <td>
                        <div class="d-flex flex-column">
                            <span class="fw-semibold">{{ order.name }}</span>
                            <a :href="`mailto:${order.email}`" class="small">{{ order.email }}</a>
                        </div>
                    </td>
                    <td class="d-none d-md-table-cell">
                        <div class="d-flex flex-column">
                            <span>{{ order.city }}</span>
                            <span class="small text-secondary">{{ order.address }}</span>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge" :class="order.processed ? 'is-done' : 'is-new'">
                            {{ $filters.transFilter(order.processed ? 'text.status_processed' : 'text.status_new') }}
                        </span>
                    </td>
                    <td class="text-end fw-bold text-nowrap">{{ $filters.currencyFilter(basketTotal(order.basket ?? [])) }}</td>
                    <td class="text-end">
                        <button
                            type="button"
                            class="btn btn-sm btn-pill text-nowrap"
                            :class="order.processed ? 'btn-ghost' : 'btn-soft'"
                            @click="orderStore.toggleOrderProcessed(order)"
                        >
                            <font-awesome-icon :icon="order.processed ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check'"/>
                            {{ $filters.transFilter(order.processed ? 'btn.mark_new' : 'btn.mark_processed') }}
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <Empty v-else icon="fa-solid fa-receipt" title="text.no_orders" text="text.dashboard_hint">
            <span></span>
        </Empty>
    </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import type {OrderModel} from '@/model/order-model'
import {basketTotal} from '@/model/basket-model'
import Empty from '@/components/Empty.vue'
import {useOrderStore} from '@/store/module/order'

const orderStore = useOrderStore()

// New (not processed) orders are what the administrator needs to see first.
const showProcessed = ref<boolean>(false)

const newCount = computed((): number => orderStore.orders.filter((order: OrderModel): boolean => !order.processed).length)

const displayOrders = computed((): OrderModel[] => {
    return orderStore.orders.filter((order: OrderModel): boolean => Boolean(order.processed) === showProcessed.value)
})

await orderStore.loadOrders()
</script>

<style scoped>
.admin-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--app-border);
}

.admin-toolbar-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 800;
}
</style>
