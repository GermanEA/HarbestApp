import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ApiContext } from '../../context/api/ApiContext';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    isEnabled: boolean
}

/**
 * Componente para generar la paginación del listado de productos
 * @author Germán Estrade
 * @param {boolean} isEnabled - Variable que define si se buscan los productos que estén activos o no
 */
export const Pagination = ( { isEnabled }: Props ) => {

    const { theme } = useContext( ThemeContext );
    const { productList, currentPage, recoverProductListInit } = useContext(ApiContext);

    return (
        <View style={ styles.paginationContainer }>
            <View style={ styles.paginationRow }>
            {
                currentPage > 0
                    ? <Pressable
                        onPress={ () => recoverProductListInit( isEnabled, currentPage - 1 ) }
                        style={{ ...styles.btn, backgroundColor: theme.globalColors.primaryText }}
                    >
                        <Text style={{ color: theme.globalColors.white }}>Anterior</Text>
                    </Pressable>
                    : null
            }
            </View>

            <View style={ styles.paginationRow }>
                <Text>Página { currentPage + 1 }</Text>
            </View>

            <View style={ styles.paginationRow }>
            {
                productList.nextPage > 0
                    ? <Pressable
                        onPress={ () => recoverProductListInit( isEnabled, currentPage + 1 ) }
                        style={{ ...styles.btn, backgroundColor: theme.globalColors.primaryText }}
                    >
                        <Text style={{ color: theme.globalColors.white }}>Próxima</Text>
                    </Pressable>
                    : null
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({    
    paginationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    paginationRow: {
        width: '33%',
        alignItems: 'center',
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5
    }
});