import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    id: string;
    sku: string;
    callbackUpdate: () => void;
    callbackDelete: () => void;
}

/**
 * Tarjeta secundaria para pintar las opciones de añadir cantidad y agregar un producto
 * @author Germán Estrade
 * @callback callbackUpdate - Función para borrar un producto
 * @callback callbackDelete - Función para actualizar un producto
 * @param {string} id - Identificador del producto
 * @param {string} sku - SKU del producto
 * @see ResultScreen
 */
export const ProductCardHidden = ( { id, sku, callbackDelete, callbackUpdate }: Props ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={{ 
            ...styles.cardHiddenContainer, 
            backgroundColor: theme.globalColors.primaryText 
        }}>
            <TouchableOpacity
                onPress={ callbackUpdate }
                activeOpacity={ 0.9 }
                style={{ ...styles.btnContainer, backgroundColor: theme.globalColors.white }}
            >
                <Text style={{ fontSize: theme.globalFontsSize.small, color: theme.globalColors.primaryText }}>Actualizar</Text>
                <Icon
                    size={ theme.globalFontsSize.iconLarge }
                    name='sync'
                    color={ theme.globalColors.primaryText }
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={ callbackDelete }
                activeOpacity={ 0.9 }
                style={{ ...styles.btnContainer, backgroundColor: theme.globalColors.white }}
            >
                <Text style={{ fontSize: theme.globalFontsSize.small, color: theme.globalColors.primaryText }}>Borrar</Text>
                <Icon
                    size={ theme.globalFontsSize.iconLarge }
                    name='trash'
                    color={ theme.globalColors.primaryText }
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHiddenContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5
    },
    btnContainer: {
        width: 80,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5
    },
});

