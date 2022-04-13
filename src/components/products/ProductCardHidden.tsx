import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { AddCartCataloque } from './AddCartCatalogue';

interface Props {
    id: string;
    uuid: string;
}

/**
 * Tarjeta secundaria para pintar las opciones de añadir cantidad y agregar un producto
 * @author Publyland
 * @param {string} id - Identificador del producto
 * @param {string} uuid - Uuid del producto
 * @see ResultScreen
 */
export const ProductCardHidden = ( { id, uuid }: Props ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={{ 
            ...styles.cardHiddenContainer, 
            backgroundColor: theme.globalColors.success 
        }}>
            <AddCartCataloque
                id={ id }
                uuid={ uuid }
                styleBtnAddWrapper={ styles.btnAddWrapper }
                styleQuantityContainer={ styles.quantityContainer }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardHiddenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 5,
        marginBottom: 5,
    },
    quantityContainer: {
        paddingHorizontal: 0,
    },
    btnAddWrapper: {        
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

