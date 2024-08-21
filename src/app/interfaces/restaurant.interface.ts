export interface Restaurant {
    name: string,
    telephone: string,
    address: string,
    dishes: Dish[],
}

export interface Dish {
    name: string;
    price: number;
}