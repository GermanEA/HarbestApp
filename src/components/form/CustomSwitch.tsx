import React, { useContext } from 'react'
import { KeyboardTypeOptions, Text, StyleSheet, StyleProp, TextStyle, ColorValue, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    name?: string,
    trackColor: { false: ColorValue, true: ColorValue},
    thumbColor: ColorValue,
    ios_backgroundColor: ColorValue,
    onValueChange: (value: boolean) => void,
    value: boolean
}

/**
 * Componente custom de input de texto
 * @author Germán Estrade
 * @callback handleOnChange - Función que se dispara al cambiar el texto introducido en el input para guardar su estado
 * @param {string} [name] - Nombre del título del input
 * @param {string} [placeholder] - Texto del placeholder
 * @param {KeyboardTypeOptions} keyboard - Tipo de teclado al pulsar sobre el input
 * @param {boolean} pass - Activar o no la visibilidad del input tipo password
 * @param {string} value - Valor del input insertado por el usuario
 * @param {number} [length] - Valor máximo del número de caracteres que se pueden insertar en el input
 * @param {'none' | 'sentences' | 'words' | 'characters'} [autoCapitalize] - Tipo de capitalización elegida
 * @param {boolean} [multiline] - Activar si es un input de tipo multilínea
 * @param {number} [numberLines] - El número de líneas a mostrar por defecto
 * @param {StyleProp<TextStyle>} [style] - Estilo custom del input
 */
export const CustomSwitch = ( { name, trackColor, thumbColor, ios_backgroundColor, value, onValueChange }: Props ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={ styles.wrapper }>
            {
                name &&
                    <Text style={{ ...styles.inputName, color: theme.globalColors.primaryText, fontSize: theme.globalFontsSize.large }}>{ name }</Text>
            }

            <Switch
                trackColor={ trackColor }
                thumbColor={ thumbColor }
                ios_backgroundColor={ ios_backgroundColor }
                onValueChange={ onValueChange }
                value={ value }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputName: {
        marginBottom: 5
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    inputTextTop: {
        textAlignVertical: 'top'
    }
});
