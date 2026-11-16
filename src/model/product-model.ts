export class ProductModel {
    constructor(
        public readonly id: number | null,
        public title: string,
        public description: string,
        public price: number,
        public rating: number,
        public ratingCount: number,
        public image: string
    ) {
    }

    /**
     * Returns a plain object (not a class instance): products are kept in Pinia state,
     * which is serialized into the SSR payload, and only POJOs can be serialized.
     */
    static fromApi(data: any): ProductModel {
        return {
            id: data?.id != null ? Number(data.id) : null,
            title: String(data?.title ?? ''),
            description: String(data?.description ?? ''),
            price: Number(data?.price) || 0,
            rating: Number(data?.rating) || 0,
            ratingCount: Number(data?.ratingCount) || 0,
            image: String(data?.image ?? '')
        }
    }
}
