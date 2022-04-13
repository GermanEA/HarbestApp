import React, { createContext, useEffect, useReducer } from 'react';

import { apiReducer } from './ApiReducer';
import { apiInitialState } from './initialStates';

import { Product, ProductsList } from './apiInterfaces';
import axiosApi from '../../api/axiosApi';

/** Interface del objeto que manejará el context */
export interface ApiState {
    isLoading: boolean;
    productList: ProductsList;
    current_product: Product;
}

/** Tipo de las propiedades que expondrá context */
type ApiContextProps = {
    isLoading: boolean;
    productList: ProductsList;
    current_product: Product;
    recoverProductListInit: () => Promise<void>
}

/** Se utiliza para controlar tanto el sistema de autentificación, como las credenciales y tokens del usuario logueado */
/** Creación del context */
export const ApiContext = createContext( {} as ApiContextProps );

/** Creación del proveedor del context */
export const ApiProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer( apiReducer, apiInitialState );

    useEffect(() => {
        recoverProductListInit();
    }, [])

    /**
     * Función para recuperar la lista de productos inicial
     * @author Germán Estrade
     * @async
     */
    const recoverProductListInit = async () => {
        dispatch({ type: 'loadingTrue' });

        try {
            axiosApi.defaults.baseURL = 'http://10.0.2.2:9000/products';
            const resp = await axiosApi.get<ProductsList>('?page=0&itemsPerPage=10&active=true');

            console.log(resp.data);
            
            dispatch({ 
                type: 'recoverProductList', 
                payload: { 
                    ProductsList: resp.data,
                } 
            });
        } catch (error: any) {
            console.log(error);

            dispatch({ type: 'loadingFalse' });
        }
    }    
    
    return (
        <ApiContext.Provider value={{
            ...state,
            recoverProductListInit
        }}>
            { children }
        </ApiContext.Provider>
    )
}