export interface Transaction {
    category: string,
    subCategory: string,
    time: number,
    amount: number, 
    account: string,
    place: string,
    comment: string,
    id: string,
    reportId: string|undefined,
}
