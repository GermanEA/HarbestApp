import React, { useContext } from 'react'
import { KeyboardTypeOptions, Text, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    name?: string,
    placeholder?: string,
    keyboard: KeyboardTypeOptions,
    pass: boolean,
    value: string,
    handleOnChange: (value: string) => void,
    length?: number,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    multiline?: boolean,
    numberLines?: number,
    style?: StyleProp<TextStyle>
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
export const CustomInput = ( { name, placeholder, keyboard, pass, value, length, autoCapitalize, multiline, numberLines, style, handleOnChange }: Props ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <>
            {
                name &&
                    <Text style={{ ...styles.inputName, color: theme.globalColors.primaryText, fontSize: theme.globalFontsSize.large }}>{ name }</Text>
            }

            <TextInput 
                style={[ 
                    { ...styles.input, borderColor: theme.globalColors.greyMedium },
                    multiline ? styles.inputTextTop : null,
                    style
                ]}
                placeholder={ placeholder }
                placeholderTextColor= 'grey'
                keyboardType={ keyboard }
                selectionColor={ theme.globalColors.primary }
                autoCapitalize={ autoCapitalize }
                autoCorrect={ false }
                secureTextEntry={ pass }
                onChangeText={ handleOnChange }
                value={ value }
                maxLength={ length }
                multiline={ multiline }
                numberOfLines={ numberLines }
            />
        </>
    )
}

const styles = StyleSheet.create({
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
