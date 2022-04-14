import { ApiState } from "./ApiContext";
import { ProductCreate } from "./apiInterfaces";

export const apiInitialState: ApiState = {
    isLoading: false,
    filterActive: true,
    currentPage: 0,
    currentProduct: {
        _id: '',
        name: '',
        description: '',
        active: false,
        price: 0,
        SKU: ''
    },
    productList: {
        totalCount: 0,
        list: [],
        nextPage: 0
    }
}

export const initProductCreate: ProductCreate = {
    SKU: '',
    name: '',
    description: '',
    active: true,
    price: ''
}