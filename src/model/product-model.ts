export class ProductModel {
    constructor(
        public readonly id: string | number | null,
        public title: string,
        public description: string,
        public price: number,
        public rating: number,
        public ratingCount: number,
        public image: string
    ) {
    }
}
