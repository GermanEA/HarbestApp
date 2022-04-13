import { ProductsList } from './apiInterfaces';
import { ApiState } from './ApiContext';

type ApiAction = 
    | { type: 'recoverProductList', payload: { ProductsList: ProductsList } }

export const apiReducer = ( state: ApiState, action: ApiAction ): ApiState => {

    switch ( action.type ) {
        case 'recoverProductList':            
            return {
                ...state,
                productList: action.payload.ProductsList
            }
    
        default:
            return state;
    }

}