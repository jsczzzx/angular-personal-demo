export interface Restaurant {
    _id?: string,
    name: string,
    telephone: string,
    address: string,
    coordinates: number[],
    type: string[],
    dishes: Dish[],
}

export interface Dish {
    _id?: string,
    name: string;
    price: number;
}