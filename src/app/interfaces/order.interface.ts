import { Dish } from "./restaurant.interface";

export interface Order {
    _id?: string,
    userId: string,
    userName: string,
    restaurantId: string,
    restaurantName: string,
    items: OrderItem[],
    totalPrice: number,
    createdAt: Date,
    updatedAt: Date,
    status: 'Pending' | 'Confirmed' | 'Delivered'
}
  
export interface OrderItem {
    _id?: string,
    dish: Dish,
    quantity: number,
}