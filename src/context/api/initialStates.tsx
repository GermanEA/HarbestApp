import { ApiState } from "./ApiContext";
import { ProductCreate } from "./apiInterfaces";

export const apiInitialState: ApiState = {
    isLoading: false,
    current_product: {
        _id: '',
        name: '',
        description: '',
        active: false,
        price: 0,
        SKU: ''
    },
    productList: {
        totalCount: 0,
        list: []
    }
}

export const initProductCreate: ProductCreate = {
    SKU: '',
    name: '',
    description: '',
    active: true,
    price: ''
}