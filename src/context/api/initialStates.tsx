import { ApiState } from "./ApiContext";

export const apiInitialState: ApiState = {
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