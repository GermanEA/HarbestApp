import { ProductsList } from '../context/api/apiInterfaces';
import { ApiState } from '../context/api/ApiContext';

export type ApiAction =
    | { type: 'RECOVER_PRODUCT_LIST', payload: { ProductsList: ProductsList, currentPage: number } }
    | { type: 'LOADING_TRUE' }
    | { type: 'LOADING_FALSE' }
    | { type: 'FILTER_ACTIVE_PRODUCTS', payload: { active: boolean } }

export const apiReducer = ( state: ApiState, action: ApiAction ): ApiState => {

    switch ( action.type ) {
        case 'RECOVER_PRODUCT_LIST':            
            return {
                ...state,
                isLoading: false,
                productList: action.payload.ProductsList,
                currentProduct: action.payload.ProductsList.list[0],
                currentPage: action.payload.currentPage
            }

        case 'LOADING_TRUE':            
            return {
                ...state,
                isLoading: true
            }

        case 'LOADING_FALSE':            
            return {
                ...state,
                isLoading: false
            }

        case 'FILTER_ACTIVE_PRODUCTS':            
            return {
                ...state,
                filterActive: action.payload.active,
                currentPage: 0
            }
    
        default:
            return state;
    }

}