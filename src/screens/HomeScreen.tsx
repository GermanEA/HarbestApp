import React, { useContext, useEffect, useState } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCardHidden } from '../components/products/ProductCardHidden';
import { ApiContext } from '../context/api/ApiContext';
import { View, Text, StyleSheet, Modal, Pressable, ViewStyle, Keyboard } from 'react-native';
import { EmptyListMessage } from '../components/common/EmptyListMessage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/theme/ThemeContext';
import { CustomActivityIndicator } from '../components/common/CustomActivityIndicator';
import { CustomHeaderScreens } from '../components/common/CustomHeaderScreens';
import { CatalogueSearcher } from '../components/catalogue/CatalogueSearcher';
import Toast from 'react-native-toast-message';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import { Product } from '../context/api/apiInterfaces';
import { CustomInput } from '../components/form/CustomInput';
import { CustomSwitch } from '../components/form/CustomSwitch';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{};

export interface FilterState {
    principal: string;
}

export interface FormCreate {
    name:        string;
    description: string;
    active:      boolean;
    price:       string;
    SKU:         string;
}

const initProductCreate = {
    SKU: '',
    name: '',
    description: '',
    active: true,
    price: ''
}

export const HomeScreen = ({ navigation }: Props) => {

    const { theme } = useContext( ThemeContext );
    const { current_product, productList, isLoading, deleteProduct, updateProduct, searchProduct, createProduct } = useContext(ApiContext);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [productUpdate, setProductUpdate] = useState<Product>(current_product);

    const [isEnabled, setIsEnabled] = useState<boolean>(productUpdate.active);

    const [nameForm, setNameForm] = useState<string>(productUpdate.name);
    const [descriptionForm, setDescriptionForm] = useState<string>(productUpdate.description);
    const [priceForm, setPriceForm] = useState<string>(productUpdate.price.toFixed(2));

    const [modalVisibleCreate, setModalVisibleCreate] = useState<boolean>(false);
    const [isEnabledCreate, setIsEnabledCreate] = useState<boolean>(true);

    const [formCreate, setFormCreate] = useState<FormCreate>(initProductCreate);

    const [searchFormState, setSearchFormState] = useState<FilterState>({ principal: '' });

    useEffect(() => {
        setNameForm(productUpdate.name);
        setDescriptionForm(productUpdate.description);
        setPriceForm(productUpdate.price.toFixed(2));
        setIsEnabled(productUpdate.active);
    }, [productUpdate])
    

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
            });
        } else {
            searchProduct(searchFormState.principal);
        }
    }

    /**
     * Función que redirige a la pantalla de resultados cuando se busca con el buscador principal de texto
     * @author Publyland
     */
    const handleOnPressUpdate = (product: Product) => {
        setProductUpdate(product);
        setModalVisible(true);
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchCreate = () => setIsEnabledCreate(previousState => !previousState);

    const handleUpdateProduct = () => {
        setModalVisible(!modalVisible);

        const productToUpdate: Product = {
            SKU: productUpdate.SKU,
            _id: productUpdate._id,
            active: isEnabled,
            name: nameForm,
            description: descriptionForm,
            price: parseFloat(priceForm)
        }

        updateProduct(productToUpdate);
    }

    const handleCreateProduct = () => {
        Keyboard.dismiss();

        if( formCreate.SKU === '' || formCreate.name === '' || formCreate.description === '' || formCreate.price === '' ) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Debes rellenar todos los campos',
                topOffset: 5
            });

            return;
        }

        const validationPrice = isNaN(parseFloat(formCreate.price)) ? false : true;

        if( !validationPrice ) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Debes introducir un número válido como precio',
                topOffset: 5
            });

            return;
        }

        setModalVisibleCreate(!modalVisibleCreate);

        const productToCreate: Product = {
            SKU: formCreate.SKU,
            _id: '',
            active: isEnabledCreate,
            name: formCreate.name,
            description: formCreate.description,
            price: parseFloat(formCreate.price)
        }

        createProduct(productToCreate);
        setFormCreate(initProductCreate);
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
                                    callbackUpdate={ () => handleOnPressUpdate(item.item) }
                                    callbackDelete={ () => deleteProduct(item.item._id) }
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

                { 
                    modalVisible 
                        ? <Modal
                            animationType="slide"
                            transparent={ true }
                            visible={ modalVisible }
                            onRequestClose={ () => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={ styles.centeredView }>
                                <View style={ styles.modalView }>
                                    <Text style={styles.modalText}>Actualiza el siguiente producto</Text>
                                    <Text style={styles.modalTextSku}>{ productUpdate.SKU }</Text>
                                    <CustomInput 
                                        name='Nombre'
                                        handleOnChange={ setNameForm }
                                        pass={ false }
                                        value={ nameForm }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Descripción'
                                        handleOnChange={ setDescriptionForm }
                                        pass={ false }
                                        value={ descriptionForm }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Precio'
                                        handleOnChange={ setPriceForm }
                                        pass={ false }
                                        value={ priceForm }
                                        style={ styles.inputWidth }
                                        keyboard='decimal-pad'
                                    />
                                    <CustomSwitch
                                        name={ isEnabled ? 'Activado' : 'Desactivado' }
                                        trackColor={{ false: theme.globalColors.greyLight, true: theme.globalColors.primary }}
                                        thumbColor={ isEnabled ? theme.globalColors.primaryText : theme.globalColors.greyMedium }
                                        ios_backgroundColor={ theme.globalColors.primaryText }
                                        onValueChange={ toggleSwitch }
                                        value={ isEnabled }
                                    />
                                    <View style={ styles.btnWrapper }>
                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => setModalVisible(false) }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Cerrar</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => handleUpdateProduct() }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Actualizar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    : null
                }

                <View style={ styles.btnCreateSticky }>
                    <Pressable 
                        onPress={ () => setModalVisibleCreate(true) }
                        style={{ ...styles.btnCreate, backgroundColor: theme.globalColors.successText }}
                    >
                        <Text style={{ color: theme.globalColors.white }}>Añadir</Text>
                    </Pressable>
                </View>

                { 
                    modalVisibleCreate 
                        ? <Modal
                            animationType="slide"
                            transparent={ true }
                            visible={ modalVisibleCreate }
                            onRequestClose={ () => {
                                setModalVisible(!modalVisibleCreate);
                            }}
                        >
                            <View style={ styles.centeredView }>
                                <View style={ styles.modalView }>
                                    <Text style={styles.modalText}>Crea un nuevo producto</Text>
                                    <CustomInput 
                                        name='Código SKU'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, SKU: value }) }
                                        pass={ false }
                                        value={ formCreate.SKU }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Nombre'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, name: value }) }
                                        pass={ false }
                                        value={ formCreate.name }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Descripción'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, description: value }) }
                                        pass={ false }
                                        value={ formCreate.description }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Precio'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, price: value }) }
                                        pass={ false }
                                        value={ formCreate.price }
                                        style={ styles.inputWidth }
                                        keyboard='decimal-pad'
                                    />
                                    <CustomSwitch
                                        name={ isEnabledCreate ? 'Activado' : 'Desactivado' }
                                        trackColor={{ false: theme.globalColors.greyLight, true: theme.globalColors.primary }}
                                        thumbColor={ isEnabled ? theme.globalColors.primaryText : theme.globalColors.greyMedium }
                                        ios_backgroundColor={ theme.globalColors.primaryText }
                                        onValueChange={ toggleSwitchCreate }
                                        value={ isEnabledCreate }
                                    />
                                    <View style={ styles.btnWrapper }>
                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => setModalVisibleCreate(false) }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Cerrar</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => handleCreateProduct() }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Crear</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    : null
                }
                
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        flex: 1,
        textAlign: 'center',
        margin: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTextSku: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputWidth: {
        width: 300
    },
    btnWrapper: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCreateSticky: {
        width: 100,
        height: 40,
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 15,
        marginRight: 10,
        zIndex: 2,        
        backgroundColor: 'transparent'
    },
    btnCreate: {
        flex: 1,
        textAlign: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
