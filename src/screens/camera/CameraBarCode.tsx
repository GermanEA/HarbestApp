import React, { useContext, useRef } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/Navigator';

import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import Toast from 'react-native-toast-message';
import BarcodeMask from 'react-native-barcode-mask';

interface Props extends StackScreenProps<RootStackParams, 'CameraBarCode'>{};

/** Pantalla que abre la cámara para escanear un código de barras */
export const CameraBarCode = ( { navigation }: Props ) => {

    const camera = useRef(null);

    /**
     * Función que redirige a la pantalla de resultados con el producto escaneado
     * @author Publyland
     * @param {BarCodeReadEvent} event - Objeto con los detalles del evento al capturar el código de barras
     */
    const takeBarCode = async (event: BarCodeReadEvent) => {
        const barCode: string = event.data;

        if( barCode !== '' ) {
            // searchingPrincipal(barCode);
            // navigation.replace('ResultsScreen');
        } else {
            navigation.goBack();

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Se ha producido un error',
                text2: 'El código de barras no es correcto'
            });
        }
    };

    return (
        <SafeAreaView style={ styles.globalContainer }>
            <View style={ styles.container }>
                <RNCamera
                    ref={ camera }
                    style={ styles.preview }
                    type={ RNCamera.Constants.Type.back }
                    flashMode={ RNCamera.Constants.FlashMode.off }
                    captureAudio={ false }
                    androidCameraPermissionOptions={{
                        title: 'Activar permisos de cámara',
                        message: 'Necesitamos tu permiso para usar la cámara',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onBarCodeRead={(event) => {
                        takeBarCode(event);
                    }}
                    onStatusChange={(event) => {
                        if( event.cameraStatus === 'NOT_AUTHORIZED' ) {
                            navigation.goBack();

                            Toast.show({
                                type: 'error',
                                position: 'bottom',
                                text1: 'Se ha producido un error',
                                text2: 'Active el permiso para la cámara'
                            });
                        }
                    }}
                >
                    <BarcodeMask />
                </RNCamera>
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
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
