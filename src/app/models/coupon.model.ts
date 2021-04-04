export class Coupon {
    id: number
    amount: number
    category: number
    title: string
    startDate: Date
    endDate: Date
    description: string
    price: number
    imageURL: string

    constructor(
        id: number,
        amount: number,
        category: number,
        title: string,
        startDate: Date,
        endDate: Date,
        description: string,
        price: number,
        imageURL: string) {
        this.id = id
        this.amount = amount
        this.category = category
        this.title = title
        this.startDate = startDate
        this.endDate = endDate
        this.description = description
        this.price = price
        this.imageURL = imageURL
    }
}