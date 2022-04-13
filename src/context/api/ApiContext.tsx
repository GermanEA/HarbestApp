import React, { createContext, useEffect, useReducer } from 'react';

import { apiReducer } from './ApiReducer';
import { apiInitialState } from './initialStates';

import { Product, ProductsList } from './apiInterfaces';
import axiosApi from '../../api/axiosApi';
import baseUrl from '../../api/conecction';
import Toast from 'react-native-toast-message';

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
    recoverProductListInit: (page: number, itemsPerPage: number, active?: boolean) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (produt: Product) => Promise<void>;
    searchProduct: (_id: string) => Promise<void>;
    createProduct: (product: Product) => Promise<void>
}

/** Se utiliza para controlar tanto el sistema de autentificación, como las credenciales y tokens del usuario logueado */
/** Creación del context */
export const ApiContext = createContext( {} as ApiContextProps );

/** Creación del proveedor del context */
export const ApiProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer( apiReducer, apiInitialState );

    useEffect(() => {
        recoverProductListInit(0, 10);
    }, [])

    /**
     * Función para recuperar la lista de productos inicial
     * @author Germán Estrade
     * @async
     */
    const recoverProductListInit = async (page: number, itemsPerPage: number, active: boolean = true) => {
        dispatch({ type: 'loadingTrue' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.get<ProductsList>(`?page=${ page }&itemsPerPage=${ itemsPerPage }&active=${ active }`);
            
            dispatch({ 
                type: 'recoverProductList', 
                payload: { 
                    ProductsList: resp.data,
                } 
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error a la hora de recuperar la lista de productos'
            });

            dispatch({ type: 'loadingFalse' });
        }
    }  
    
    /**
     * Función para borrar un producto
     * @author Germán Estrade
     * @async
     */
     const deleteProduct = async (id: string) => {
        dispatch({ type: 'loadingTrue' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.delete<Product>(`/${ id }`);

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Producto borrado correctamente'
            });
            
            recoverProductListInit(0, 10);
        } catch (error: any) {
            dispatch({ type: 'loadingFalse' });

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Ha ocurrido un error al borrar el producto'
            });
        }
    } 

    /**
     * Función para actualizar un producto
     * @author Germán Estrade
     * @async
     */
     const updateProduct = async ( { _id, name, description, active, price }: Product ) => {
        dispatch({ type: 'loadingTrue' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.put<Product>(`/${ _id }`, { name, description, active: active + '', price });

            console.log(typeof(active));

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Producto actualizado correctamente'
            });
            
            recoverProductListInit(0, 10);
        } catch (error: any) {
            console.log(error);
            dispatch({ type: 'loadingFalse' });

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Ha ocurrido un error al actualizar el producto'
            });
        }
    }

    /**
     * Función para crear un producto
     * @author Germán Estrade
     * @async
     */
     const createProduct = async ( { name, description, active, price, SKU }: Product ) => {
        dispatch({ type: 'loadingTrue' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.post<Product>('', { name, description, active, price, SKU });

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Producto creado correctamente'
            });
            
            recoverProductListInit(0, 10);
        } catch (error: any) {
            console.log(error);
            dispatch({ type: 'loadingFalse' });

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Ha ocurrido un error al crear el producto'
            });
        }
    }

    /**
     * Función para buscar un producto
     * @author Germán Estrade
     * @async
     */
    const searchProduct = async (  _id: string ) => {
        dispatch({ type: 'loadingTrue' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.get<Product>(`/${ _id }`);

            dispatch({ 
                type: 'recoverProductList', 
                payload: { 
                    ProductsList: {
                        list: [resp.data],
                        totalCount: 1
                    },
                } 
            });
            
        } catch (error: any) {
            console.log(error);
            dispatch({ type: 'loadingFalse' });

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Ha ocurrido un error al buscar el producto'
            });
        }
    }
    
    return (
        <ApiContext.Provider value={{
            ...state,
            recoverProductListInit,
            deleteProduct,
            updateProduct,
            searchProduct,
            createProduct
        }}>
            { children }
        </ApiContext.Provider>
    )
}