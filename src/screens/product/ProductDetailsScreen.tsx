import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Dimensions, Image, ScrollView, Linking, SafeAreaView, Platform } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/Navigator';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { CustomHeaderScreens } from '../../components/common/CustomHeaderScreens';
import { FadeInImage } from '../../components/common/FadeInImage';


interface Props extends StackScreenProps<RootStackParams, 'ProductDetailsScreen'>{};

/** Pantalla con los detalles de un producto */
export const ProductDetailsScreen = ({ route, navigation }: Props) => {

    const { product: { SKU, active, description, name, price, _id } } = route.params;
    
    const { theme } = useContext( ThemeContext );     

    return (
        <SafeAreaView style={{ ...styles.globalContainer, backgroundColor: theme.globalColors.white }}>
            <View style={ styles.globalWrapper }>
                <CustomHeaderScreens
                    title={ name }
                    color={ theme.globalColors.primary } 
                    colorText={ theme.globalColors.primaryText }
                    navigation={ navigation.goBack }
                    isSubtitle={ true }
                    subtitleText={ SKU } 
                    icon='arrow-back-outline' 
                />

                <View style={{ flex: 1 }}>
                    <View style={{ ...styles.image }}>
                        <FadeInImage
                            key={ _id }
                            style={ styles.productImage }
                        />
                    </View>

                    <View style={{ ...styles.description, backgroundColor: theme.globalColors.primary }}>
                        <View style={ styles.descriptionRow }>
                            <Text style={{ ...styles.price, color: theme.globalColors.primaryText }}>{ price.toFixed(2).replace('.', ',') } €</Text>
                            <Text style={{ ...styles.active, color: active ? theme.globalColors.info : theme.globalColors.danger }}>{ active ? 'Activo' : 'Desactivado' }</Text>
                        </View>

                        <View>
                            <Text style={{ ...styles.name, color: theme.globalColors.successText }}>{ name }</Text>
                            <Text style={{ ...styles.nameDesc, color: theme.globalColors.greyDark }}>{ description }</Text>
                        </View>
                    </View>
                </View>
                            
            </View>            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1
    },
    globalWrapper: {
        flex: 1,
        marginHorizontal: 10
    },
    productImage: {
        width: 300,
        height: 300,        
    },
    image: {
        flex: 1
    },
    description: {
        flex: 0.8,
        marginHorizontal: -10,
        paddingHorizontal: 20,
        paddingTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    descriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    price: {
        fontWeight: 'bold',
        fontSize: 30
    },
    active: {
        fontSize: 20,
        textAlignVertical: 'center'
    },
    name: {
        fontSize: 40,
        textAlign: 'center',
        marginVertical: 20
    },
    nameDesc: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});


