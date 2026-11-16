export default function truncateFilter(value: string | null | undefined, limit = 150): string {
    const text = value ?? ''

    return text.length > limit ? `${text.substring(0, limit - 3)}...` : text
}
