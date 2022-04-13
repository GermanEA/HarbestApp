import React, { useContext } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCardHidden } from '../components/products/ProductCardHidden';
import { ApiContext } from '../context/api/ApiContext';
import { View, Text } from 'react-native';

export const HomeScreen = () => {

    const { productList } = useContext(ApiContext);

    return (
        <SwipeListView
            keyExtractor= { (item, index) => item._id }
            style={{ marginTop: 5 }}
            showsVerticalScrollIndicator={ false }
            // ListEmptyComponent={ () => <EmptyListMessage message='No hay productos' /> }
            data={ productList.list }
            renderItem={ (item) => 
                // <ProductCard 
                //     key={ item.item.SKU }
                //     item={ item.item } 
                //     handleOnPress={ () => console.log('pulsando') }
                // /> 
                <View>
                    <Text>{item.item.name}</Text>
                </View>
            }
            renderHiddenItem={ (item) => 
                // <ProductCardHidden
                //     id={ item.item.SKU }
                //     uuid={ item.item.SKU }
                // />
                <View>
                    <Text>{item.item.description}</Text>
                </View>
            }
            disableRightSwipe={ true }
            rightOpenValue={ -190 }
            stopRightSwipe={ -220 }
            // onEndReached={ handleOnEndReached }
            onEndReachedThreshold={ 0.4 }
            // ListFooterComponent={(
            //     !endPaginated
            //         ? <CustomActivityIndicator size={ 30 } style={{ margin: 10 }}/> 
            //         : null
            // )}
        />
    )
}
