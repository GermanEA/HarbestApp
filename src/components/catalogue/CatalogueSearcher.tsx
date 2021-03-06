import React, { useContext } from 'react'
import { KeyboardTypeOptions, Platform, View, StyleSheet, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { CustomInput } from '../form/CustomInput';

interface Props {
    value: string,
    keyboard?: KeyboardTypeOptions,
    pass?: boolean,
    placeholder?: string,
    length?: number,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
    handleOnChange: (value: string) => void,
    handleOnPress: () => void,
    handleOnPressCamera: () => void
}

interface ResultSuggestion {
    value: string;
    label: string;
}

/**
 * Componente que pinta el buscador principal en el catálogo. El buscador por "contenido-texto".
 * @author Germán Estrade
 * @callback handleOnChange - Función para setear el estado del input de búsqueda
 * @callback handleOnPress - Función que redirige a la pantalla de resultados
 * @callback handleOnPressCamera - Función que redirige a la pantalla de la cámara
 * @param {string} value - Valor del input
 * @param {KeyboardTypeOptions} [keyboard] - Tipo de teclado que se mostrará al pinchar dentro del input
 * @param {boolean} [pass] - Activar o no la visibilidad del input tipo password
 * @param {string} [placeholder] - Contenido del placeholder del input
 * @param {number} [length] - Valor máximo del número de caracteres que se pueden insertar en el input
 * @param {'none' | 'sentences' | 'words' | 'characters'} [autoCapitalize]
 */
export const CatalogueSearcher = ( props: Props ) => {

    const { placeholder, keyboard, pass, value, length, autoCapitalize, handleOnChange, handleOnPress, handleOnPressCamera } = props;
    const { theme } = useContext( ThemeContext );

    return (
        <View style={ { ...styles.container, backgroundColor: theme.globalColors.primary } }>
            
            <Pressable
                onPress={ handleOnPressCamera }
                style={ styles.button }
            >
                <Icon
                    name='camera-outline'
                    size={ theme.globalFontsSize.iconLarge30 }
                    color={ theme.globalColors.primaryText }
                    style={ styles.icon }
                />
            </Pressable>

            <Pressable
                onPress={ handleOnPress }
                style={ styles.button }
            >
                <Icon
                    name='search'
                    size={ theme.globalFontsSize.iconLarge30 }
                    color={ theme.globalColors.primaryText }
                    style={ styles.icon }
                />
            </Pressable>

            <View
                style={[ 
                    { ...styles.input },
                    ( Platform.OS === 'ios') && styles.inputIOS
                ]}
            >
                <CustomInput
                    handleOnChange={ handleOnChange }
                    pass={ pass ? pass : false }
                    value= { value }
                    placeholder={ placeholder }
                    keyboard={ keyboard ? keyboard : 'default' }
                    length={ length }
                    autoCapitalize={ autoCapitalize }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -10,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: -16,
    },
    input: {
        flex: 1,
        color: 'black',
        margin: 5,
        marginBottom: 0,
        paddingVertical: 5
    },
    inputIOS:{
        // Dar estilos en IOS al subrayado
    },
    icon: {
        marginRight: 10
    },
    button: {
        marginTop: 10
    }
});
