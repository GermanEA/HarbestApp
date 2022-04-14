import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = () => {
    
    const opacity  = useRef( new Animated.Value(0) ).current;
    const opacityBtn  = useRef( new Animated.Value(1) ).current;
    const top = useRef( new Animated.Value(-140) ).current;
    const scale = useRef( new Animated.Value(1) ).current;

    /**
     * Animación de "FadeIn"
     * @author Germán Estrade
     * @param {number} duration - Duración de la animación
     */
    const fadeIn = ( duration: number = 300 ) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true
            }
        ).start();
    }

    /**
     * Animación de "Fadeout"
     * @author Germán Estrade
     */
    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    /**
     * Animación de opacidad al pulsar un botón
     * @author Germán Estrade
     */
    const onPressBtn = () => {
        Animated.sequence([
            Animated.timing(
                opacityBtn,
                {
                    toValue: 0.5,
                    duration: 150,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                opacityBtn,
                {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true
                }
            )
        ]).start();
    }

    /**
     * Animación para los filtros de las pantallas de facturas y mis pedidos
     * @author Germán Estrade
     * @param {number} initPosition - Posición Y inicial de la animación
     * @param {number} finalPosition - Posición Y final de la animación
     * @param {number} duration - Duración de la animación
     */
    const startMovingPosition = ( initPosition: number, finalPosition: number, duration: number = 300 ) => {

        top.setValue(initPosition);

         Animated.timing(
            top,
            {
                toValue: finalPosition,
                duration: duration,
                useNativeDriver: true,
                // easing: Easing.bounce
            }
        ).start();
    }

    /**
     * Animación para los números de notificaciones pendientes y cantidad de productos en el carrito
     * @author Germán Estrade
     * @param {number} maxValue - Valor máximo del escalado
     * @param {number} minValue - Valor mínimo del escalado
     */
    const pulse = ( maxValue: number, minValue: number ) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, 
                {
                    toValue: maxValue,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: minValue,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: maxValue,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: minValue,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }


    return {
        opacity,
        opacityBtn,
        top,
        scale,
        fadeIn,
        fadeOut,
        onPressBtn,
        startMovingPosition,
        pulse
    }
}
