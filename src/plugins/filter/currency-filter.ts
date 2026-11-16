const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

export default function currencyFilter(value: number | string | null | undefined): string {
    return formatter.format(Number(value) || 0)
}
