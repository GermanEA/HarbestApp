import React, { useContext } from 'react'
import { Text, StyleSheet, ColorValue, View } from 'react-native';
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
 * Componente custom de switch de texto
 * @author Germán Estrade
 * @callback onValueChange - Función que se dispara al cambiar para guardar su estado
 * @param {string} [name] - Nombre del título del input
 * @param {ColorValue} trackColor - Color para el circulo del switch
 * @param {ColorValue} thumbColor - Color para el fondo del switch
 * @param {ColorValue} ios_backgroundColor - Color para IOS
 * @param {boolean} value - Valor que tiene el switch
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
