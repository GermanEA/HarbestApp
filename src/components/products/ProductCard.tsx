import React, { useContext } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Product } from '../../context/api/apiInterfaces';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { FadeInImage } from '../common/FadeInImage';

interface Props {
    item: Product,
    handleOnPress: () => void;
}

/**
 * Tarjeta principal para pintar los detalles de un producto desde el catálogo de productos
 * @author Germán Estrade
 * @callback handleOnPress - Función para navegar a la pantalla de detalles de un producto
 * @param {Product} item - Objeto con los detalles del producto
 */
export const ProductCard = ( { item, handleOnPress }: Props ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <Pressable
            onPress={ handleOnPress }
        >
            <View style={{ ...styles.productContainer, backgroundColor: theme.globalColors.primary }}>
                <FadeInImage
                    key={ item._id }
                    style={ styles.productImage }
                    styleView={ styles.productImageView }
                />

                <View style={{
                    flex: 1
                }}>
                    <View style={ styles.productHeader }>
                        <Text style={{ ...styles.productHeaderText, fontSize: theme.globalFontsSize.large, color: theme.globalColors.successText }}>{ item.name }</Text>
                        <Pressable
                            onPress={ () => console.log(item.SKU, item.active) }
                        >
                            <Icon
                                size={ theme.globalFontsSize.iconLarge }
                                name={ ( item.active === true ) ? 'checkmark' : 'close' }
                                color={ ( item.active === true ) ? theme.globalColors.success : theme.globalColors.danger }
                            />
                        </Pressable>
                    </View>
                    <View style={ styles.productDescription }>
                        <Text style={{ fontSize: theme.globalFontsSize.large }}>{ item.description }</Text>
                    </View>
                    <View style={ styles.productPrize }>
                        <View style={ styles.productPrizeRow }>
                            <Text style={{ ...styles.productTextNet, fontSize: theme.globalFontsSize.large }}>{ item.price.toFixed(2).replace('.', ',') } €</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 5
    },
    productImage: {
        width: 55,
        height: 55,        
    },
    productImageView: {
        marginRight: 15,
        borderWidth: 1,
        borderColor: 'black'
    },
    productHeader: {
        flex: 1,
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    productHeaderText: {
        flex: 1,
        marginRight: 5,
        fontWeight: 'bold'
    },
    productDescription: {
        width: '100%',
    },
    productPrize: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    productPrizeRow: {
        width: '100%',
        alignItems: 'flex-end'
    },
    productTextPromo: {
        flex: 1,
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    productTextOffer: {
        textDecorationStyle: 'solid', 
        textDecorationLine: 'line-through'
    },
    productTextNet: {
        fontWeight: 'bold'
    },
});