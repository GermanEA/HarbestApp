import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    title: string | undefined;
    color: string;
    colorText: string;
    isSubtitle: boolean;
    subtitleText: string;
    marginBottom?: number;
    icon: string;
    navigation: () => void;
};

/**
 * Componente que muestra el header principal en las pantallas con la función de navegar hacia atrás
 * @author Germán Estrade
 * @callback navigation - Función de navegación por el "stack" de pantallas
 * @param {string | undefined} title - Título del header
 * @param {string} color - Color de fondo
 * @param {string} colorText - Color del texto
 * @param {boolean} isSubtitle - Variable para activar el subtítulo
 * @param {string} subtitleText - Texto del subtítulo
 * @param {number} [marginBottom] - Margen aplicable después del header
 * @param {string} icon - String con el nombre del icono
 */
export const CustomHeaderScreens = ( { title, color, colorText, isSubtitle, subtitleText, marginBottom, icon, navigation }: Props ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={ styles.header }>
            <View style={{ 
                ...styles.headerContainer, 
                backgroundColor: color,
                marginBottom: marginBottom
            }}>
                <Pressable
                    onPress = { navigation }
                >
                    <View style={{ 
                        backgroundColor: theme.globalColors.primaryText,
                        padding: 5,
                        borderRadius: 50
                    }}>
                        <Icon
                            size={ theme.globalFontsSize.iconLarge }
                            name={ icon }
                            color={ color }     
                        />
                    </View>
                </Pressable>
                <View>
                    <Text style={{ ...styles.headerText, color: colorText, fontSize: theme.globalFontsSize.xxxlarge }}>{ title }</Text>
                    { 
                        ( isSubtitle )
                            ? <Text style={{ ...styles.headerSubtitleText, color: colorText, fontSize: theme.globalFontsSize.normal }}>{ subtitleText }</Text>
                            : null
                    }
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginHorizontal: -10,
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        marginLeft: 10
    },
    headerSubtitleText: {
        marginLeft: 10
    }
});
