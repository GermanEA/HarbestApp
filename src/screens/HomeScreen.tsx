import React, { useContext, useState } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCardHidden } from '../components/products/ProductCardHidden';
import { ApiContext } from '../context/api/ApiContext';
import { View, Text, StyleSheet } from 'react-native';
import { EmptyListMessage } from '../components/common/EmptyListMessage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/theme/ThemeContext';
import { CustomActivityIndicator } from '../components/common/CustomActivityIndicator';
import { CustomHeaderScreens } from '../components/common/CustomHeaderScreens';
import { CatalogueSearcher } from '../components/catalogue/CatalogueSearcher';
import Toast from 'react-native-toast-message';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{};

export interface FilterState {
    principal: string;
}

export const HomeScreen = ({ navigation }: Props) => {

    const { theme } = useContext( ThemeContext );
    const { productList, isLoading } = useContext(ApiContext);

    const [searchFormState, setSearchFormState] = useState<FilterState>({
        principal: '',
    });

    /**
     * Función que redirige a la pantalla de resultados cuando se busca con el buscador principal de texto
     * @author Publyland
     */
     const handleOnPressSearchingPrincipal = () => {
        if( searchFormState.principal === '' ) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Debes rellenar el texto de búsqueda'
            })
        } else {
            console.log('Pulsando para buscar')
        }
    }

    return (
        <SafeAreaView style={{ ...styles.globalContainer, backgroundColor: theme.globalColors.white }}>
            <View style={ styles.globalWrapper }>
                <CustomHeaderScreens
                    title='Listado de Productos'
                    color={ theme.globalColors.primary }
                    colorText={ theme.globalColors.primaryText }
                    navigation={ () => {} }
                    isSubtitle={ true }
                    subtitleText='Relación de productos'
                    marginBottom={ 10 }
                    icon='create-outline'
                />

                <CatalogueSearcher
                    placeholder='Inserta un ID de producto'
                    value={ searchFormState.principal }
                    handleOnChange={ (value) => setSearchFormState({ ...searchFormState, principal: value }) }
                    handleOnPress={ handleOnPressSearchingPrincipal }
                    handleOnPressCamera={ () => navigation.navigate('CameraBarCode') }
                />

                {/* Listado de productos */}
                <View style={{ flex: 1 }}>
                {
                    ( isLoading )
                        ? <CustomActivityIndicator
                            style={{ position: 'absolute', alignSelf: 'center' }}
                            size={ 50 }
                        />
                        : <SwipeListView
                            keyExtractor= { (item, index) => item._id }
                            style={{ marginTop: 5 }}
                            showsVerticalScrollIndicator={ false }
                            ListEmptyComponent={ () => <EmptyListMessage message='No hay productos' /> }
                            data={ productList.list }
                            renderItem={ (item) => 
                                <ProductCard 
                                    key={ item.item.SKU }
                                    item={ item.item } 
                                    handleOnPress={ () => navigation.navigate('ProductDetailsScreen', { product: item.item }) }
                                />
                            }
                            renderHiddenItem={ (item) => 
                                <ProductCardHidden
                                    id={ item.item._id }
                                    sku={ item.item.SKU }
                                    callbackUpdate={ () => console.log(item.item._id) }
                                    callbackDelete={ () => console.log(item.item._id) }
                                />
                            }
                            // disableRightSwipe={ true }
                            leftOpenValue={ 100 }
                            stopLeftSwipe={ 120 }
                            rightOpenValue={ -100 }
                            stopRightSwipe={ -120 }
                            // onEndReached={ handleOnEndReached }
                            onEndReachedThreshold={ 0.4 }
                            // ListFooterComponent={(
                            //     !endPaginated
                            //         ? <CustomActivityIndicator size={ 30 } style={{ margin: 10 }}/> 
                            //         : null
                            // )}
                        />
                }
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
    }
});
