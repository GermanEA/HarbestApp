import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    message: string;
}

/**
 * Componente que se muestra cuando un listado está vacío
 * @author Germán Estrade
 * @param {string} message - Mensaje a mostrar
 */
export const EmptyListMessage = ( { message }: Props ) => {
    const { theme } = useContext( ThemeContext );

    return (
        <View style={ styles.container }>
            <Icon
                name='eye-off-outline'
                size={ theme.globalFontsSize.iconXtraLarge }
                color={ theme.globalColors.primaryText }
            />
            <Text style={{ color: theme.globalColors.primaryText, fontSize: theme.globalFontsSize.normal }}>{ message }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
