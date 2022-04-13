import React, { useContext } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCardHidden } from '../components/products/ProductCardHidden';
import { ApiContext } from '../context/api/ApiContext';
import { View, Text } from 'react-native';
import { EmptyListMessage } from '../components/common/EmptyListMessage';

export const HomeScreen = () => {

    const { productList } = useContext(ApiContext);

    return (
        <SwipeListView
            keyExtractor= { (item, index) => item._id }
            style={{ marginTop: 5 }}
            showsVerticalScrollIndicator={ false }
            ListEmptyComponent={ () => <EmptyListMessage message='No hay productos' /> }
            data={ productList.list }
            renderItem={ (item) => 
                <ProductCard 
                    key={ item.item.SKU }
                    item={ item.item } 
                    handleOnPress={ () => console.log('pulsando') }
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
    )
}
