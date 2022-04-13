import { ProductsList } from './apiInterfaces';
import { ApiState } from './ApiContext';

type ApiAction = 
    | { type: 'recoverProductList', payload: { ProductsList: ProductsList } }
    | { type: 'loadingTrue' }
    | { type: 'loadingFalse' }

export const apiReducer = ( state: ApiState, action: ApiAction ): ApiState => {

    switch ( action.type ) {
        case 'recoverProductList':            
            return {
                ...state,
                isLoading: false,
                productList: action.payload.ProductsList
            }

        case 'loadingTrue':            
            return {
                ...state,
                isLoading: true
            }

        case 'loadingFalse':            
            return {
                ...state,
                isLoading: false
            }
    
        default:
            return state;
    }

}