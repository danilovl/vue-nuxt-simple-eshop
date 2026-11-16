import type {ProductModel} from '@/model/product-model'

export class BasketModel {
    constructor(
        public product: ProductModel,
        public quantity: number
    ) {
    }
}

/**
 * Plain function instead of a class method: basket lines are serialized
 * (localStorage, SSR payload, API) and lose their prototype on the way back.
 */
export function basketLineTotal(line: BasketModel): number {
    return Number(line.product.price) * line.quantity
}

export function basketTotal(lines: BasketModel[]): number {
    return lines.reduce((total: number, line: BasketModel): number => total + basketLineTotal(line), 0)
}

export function normalizeQuantity(value: unknown): number {
    const quantity = Math.floor(Number(value))

    return Number.isFinite(quantity) && quantity > 0 ? quantity : 1
}
