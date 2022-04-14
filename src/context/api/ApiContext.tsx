import React, { createContext, useEffect, useReducer } from 'react';

import Toast from 'react-native-toast-message';

import axiosApi from '../../api/axiosApi';
import baseUrl from '../../api/conecction';
import { apiReducer } from '../../reducers/ApiReducer';
import { apiInitialState } from './initialStates';
import { Product, ProductsList } from './apiInterfaces';

/** Interface del objeto que manejará el context */
export interface ApiState {
    isLoading: boolean;
    filterActive: boolean;
    productList: ProductsList;
    currentProduct: Product;
    currentPage: number;
}

/** Tipo de las propiedades que expondrá context */
type ApiContextProps = {
    isLoading: boolean;
    filterActive: boolean;
    productList: ProductsList;
    currentProduct: Product;
    currentPage: number;
    recoverProductListInit: (active: boolean, page?: number, itemsPerPage?: number) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (produt: Product) => Promise<void>;
    searchProduct: (_id: string) => Promise<void>;
    createProduct: (product: Product) => Promise<void>;
    changeFilterActive: () => void;
}

/** Creación del context */
export const ApiContext = createContext( {} as ApiContextProps );

/** Creación del proveedor del context */
export const ApiProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer( apiReducer, apiInitialState );

    useEffect(() => {
        recoverProductListInit();
    }, [])

    useEffect(() => {
        recoverProductListInit(state.filterActive);
    }, [state.filterActive])

    const changeFilterActive = () => {
        dispatch({
            type: 'FILTER_ACTIVE_PRODUCTS',
            payload: {
                active: !state.filterActive
            }
        })
    }

    /**
     * Función para recuperar la lista de productos inicial
     * @author Germán Estrade
     * @param {boolean} active - Variable que define si se buscan los productos que estén activos o no
     * @param {number} page - Número de la página
     * @param {number} itemsPerPage - Número de productos a recuperar por página
     * @async
     */
    const recoverProductListInit = async (active: boolean = true, page: number = state.currentPage, itemsPerPage: number = 5, ) => {
        dispatch({ type: 'LOADING_TRUE' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.get<ProductsList>(`?page=${ page }&itemsPerPage=${ itemsPerPage }&active=${ active }`);
            
            dispatch({
                type: 'RECOVER_PRODUCT_LIST', 
                payload: { 
                    ProductsList: resp.data,
                    currentPage: page
                } 
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error a la hora de recuperar la lista de productos'
            });

            dispatch({ type: 'LOADING_FALSE' });
        }
    }  
    
    /**
     * Función para borrar un producto
     * @author Germán Estrade
     * @param {string} id - Id del producto
     * @async
     */
     const deleteProduct = async (id: string) => {
        dispatch({ type: 'LOADING_TRUE' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.delete<Product>(`/${ id }`);

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Producto borrado correctamente'
            });
            
            recoverProductListInit(state.filterActive);
        } catch (error: any) {
            dispatch({ type: 'LOADING_FALSE' });

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
     * @param {Product} product - Objeto del producto
     * @async
     */
     const updateProduct = async ( { _id, name, description, active, price }: Product ) => {
        dispatch({ type: 'LOADING_TRUE' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.put<Product>(`/${ _id }`, { name, description, active: active + '', price });

            console.log(typeof(active));

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Producto actualizado correctamente'
            });
            
            recoverProductListInit(state.filterActive);
        } catch (error: any) {
            console.log(error);
            dispatch({ type: 'LOADING_FALSE' });

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
     * @param {Product} product - Objeto del producto
     * @async
     */
     const createProduct = async ( { name, description, active, price, SKU }: Product ) => {
        dispatch({ type: 'LOADING_TRUE' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.post<Product>('', { name, description, active, price, SKU });

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Producto creado correctamente'
            });
            
            recoverProductListInit(state.filterActive);
        } catch (error: any) {
            console.log(error);
            dispatch({ type: 'LOADING_FALSE' });

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
     * @param {string} id - Id del producto
     * @async
     */
    const searchProduct = async (  id: string ) => {
        dispatch({ type: 'LOADING_TRUE' });

        try {
            axiosApi.defaults.baseURL = baseUrl;
            const resp = await axiosApi.get<Product>(`/${ id }`);

            dispatch({ 
                type: 'RECOVER_PRODUCT_LIST', 
                payload: { 
                    ProductsList: {
                        list: [resp.data],
                        totalCount: 1,
                        nextPage: 0
                    },
                    currentPage: 0
                } 
            });
            
        } catch (error: any) {
            console.log(error);
            dispatch({ type: 'LOADING_FALSE' });

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
            createProduct,
            changeFilterActive
        }}>
            { children }
        </ApiContext.Provider>
    )
}