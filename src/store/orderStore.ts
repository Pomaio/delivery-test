import { createContext } from "react";

export interface IOrderPrice {
    price?: number,
    delivery?: number,
    changeOrderPrice?: (value: Omit<IOrderPrice, 'changeOrderPrice'>) => void
}

export const OrderStore = createContext<IOrderPrice>({});