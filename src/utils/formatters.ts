const currencyFormatter = new Intl.NumberFormat("ru-RU", {minimumFractionDigits: 2})

export function formatAmount(amount: number): string {
    return currencyFormatter.format(Math.abs(amount))
}

export function formatDate(date: number): string {
    const dateObject = new Date(date);
    
    return dateObject.toLocaleString("ru", {day: "numeric", month: "numeric", weekday: "short"})
}