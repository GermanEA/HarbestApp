import React, { useContext, useState } from 'react';
import { ActivityIndicator, Animated, ImageStyle, StyleProp, View, ViewStyle } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { useAnimation } from '../../hooks/animation/useAnimation';

interface Props {
    style?: StyleProp<ImageStyle>;
    styleView?: StyleProp<ViewStyle>;
}

/**
 * Componente para mostrar las imágenes con un indicador de carga
 * @author Germán Estrade
 * @param {string} uri - URI de la imagen
 * @param {StyleProp<ImageStyle>} style - Estilo a aplicar a la imagen
 * @param {StyleProp<ViewStyle>} styleView - Estilo a aplicar al contenedor de la imagen
 */
export const FadeInImage = ({ style = {}, styleView = {} } : Props) => {

    const { opacity, fadeIn } = useAnimation();
    const [ isLoading, setIsLoading ] = useState( true );

    const { theme:{ colors }, } = useContext( ThemeContext );

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    return (
        <View style={{
            ...styleView as any,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            
            {
                isLoading && 
                    <ActivityIndicator 
                        style={{ position: 'absolute' }} 
                        color={ colors.primary }
                        size={ 30 }
                    />
            }

            <Animated.Image 
                source={ require('../../assets/img/no-image.png') }
                onLoadEnd={ finishLoading }
                style={{
                    ...style as any,
                    opacity
                }}
            />

        </View>
    )
}
