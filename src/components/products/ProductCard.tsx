import React, { useContext } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/theme/ThemeContext';

import { getCredentials } from '../../helpers/localStorage';
import { Product } from '../../context/product/productDetailsInterface';
import { FadeInImage } from '../common/FadeInImage';
import { SearchContext } from '../../context/search/SearchContext';

interface Props {
    item: Product,
    handleOnPress: () => void;
}

/**
 * Tarjeta principal para pintar los detalles de un producto desde el catálogo de productos
 * @author Publyland
 * @callback handleOnPress - Función para navegar a la pantalla de detalles de un producto
 * @param {Product} item - Objeto con los detalles del producto
 * @see ResultScreen
 */
export const ProductCard = ( { item, handleOnPress }: Props ) => {

    const baseURL = getCredentials('baseURL');
    const { theme } = useContext( ThemeContext );
    const { handleOnPressAddFav } = useContext( SearchContext );

    return (
        <Pressable
            onPress={ handleOnPress }
        >
            <View style={{ ...styles.productContainer, backgroundColor: theme.globalColors.secondaryBackground }}>
                <FadeInImage
                    uri={ baseURL + item.imagen }
                    key={ item.id }
                    style={ styles.productImage }
                    styleView={ styles.productImageView }
                />

                <View style={{
                    flex: 1
                }}>
                    <View style={ styles.productHeader }>
                        <Text style={{ ...styles.productHeaderText, fontSize: theme.globalFontsSize.large }}>{ item.nombre }</Text>
                        <Pressable
                            onPress={ () => handleOnPressAddFav(item.id, item.favorito) }
                        >
                            <Icon
                                size={ theme.globalFontsSize.iconLarge25 }
                                name={ ( !item.favorito || item.favorito === 'true') ? 'heart' : 'heart-outline' }
                                color={ theme.globalColors.primary }
                            />
                        </Pressable>
                    </View>
                    <View style={ styles.productPrize }>
                        <View style={{ ...styles.productPrizeRow }}>
                            {
                                ( item.txtpromo !== '' ) 
                                    ? <Text style={[
                                        { ... styles.productTextPromo, color: theme.globalColors.white, fontSize: theme.globalFontsSize.large },
                                        ( item.txtpromo === 'AHORRO' ) ? { color: theme.globalColors.danger } : { color: theme.globalColors.warning }
                                    ]}>{ item.txtpromo }</Text> 

                                    : <Text></Text>
                            }
                        </View>

                        <View style={ styles.productPrizeRow }>
                            {
                                ( parseFloat(item.pvptarifa) !== parseFloat(item.pvpneto.replace(',', '.')) ) ? <Text style={{ ...styles.productTextOffer, color: theme.globalColors.priceWarning, fontSize: theme.globalFontsSize.large }}>{ item.pvptarifa } €</Text> : <Text></Text>
                            }
                        </View>

                        <View style={ styles.productPrizeRow }>
                            <Text style={{ ...styles.productTextNet, fontSize: theme.globalFontsSize.large }}>{ item.pvpneto } €</Text>
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
        marginRight: 5
    },
    productPrize: {
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    productPrizeRow: {
        width: '33%',
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