import React, { useContext } from 'react'
import { StyleProp, ViewStyle, View, ActivityIndicator } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    style?: StyleProp<ViewStyle>;
    size?: number;
    dark?: boolean;
}

/**
 * Componente que muestra el indicador de actividad a pantalla completa
 * @author Germán Estrade
 * @param {StyleProp<ViewStyle>} [style] - Estilo a aplicar al contenedor del indicador
 * @param {number} [size] - Tamaño del indicador
 * @param {boolean} [dark] - Activar o desactivar el color negro del indicador
 */
export const CustomActivityIndicator = ( { style, size = 100, dark = true }: Props ) => {

    const { theme } = useContext( ThemeContext );

    const color = theme.globalColors.primaryText;

    return (
        <View style={[ style, { flex: 1, justifyContent: 'center', alignContent: 'center'}]}>
            <ActivityIndicator color={ color } size={ size }/>
        </View>
    )
}
