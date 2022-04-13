import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, AppState, Dimensions } from 'react-native';

import { Theme } from '@react-navigation/native';

/** Interface del objeto que manejará el context */
interface ThemeState extends Theme {
    currentTheme: string;
    globalColors: GlobalColors;
    globalFontsSize: FontsSize;
}

/** Estado inicial del objeto que manejará el context */
interface GlobalColors {
    primary: string,
    primaryText: string,
    success: string,
    successText: string,
    info: string,
    infoText: string,
    warning: string,
    warningText: string,
    danger: string,
    dangerText: string,
    priceWarning: string,
    priceFeatured: string,
    greyLight: string,
    greyMedium: string,
    greyDark: string,
    white: string,
    black: string
}

interface FontsSize {
    buttonMenu: number,
    buttonMenuBig: number,
    xxsmall: number,
    xsmall: number,
    small: number,
    normal: number,
    large: number,
    xlarge: number,
    xxlarge: number,
    xxxlarge: number,
    iconSmall: number,
    iconNormal: number,
    iconLarge: number,
    iconLarge25: number,
    iconLarge30: number,
    iconLarge33: number,
    iconXtraLarge: number,
    iconHeaderBar: number,
    iconCard: number
}

/** Tipo de las propiedades que expondrá context */
interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

/** Se utiliza para proveer el diseño de colores de la aplicación */
/** Creación del context */
export const ThemeContext = createContext({} as ThemeContextProps );

/** Creación del proveedor del context */
export const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const screen = Dimensions.get('screen');
    const globalColorsInit: GlobalColors = {
        primary: '#dae6cf',
        primaryText: '#8CB369',
        success: '#00C851',
        successText: '#007E33',
        info: '#33b5e5',
        infoText: '#0099CC',
        warning: '#ffbb33',
        warningText: '#FF8800',
        danger: '#ff4444',
        dangerText: '#CC0000',
        priceWarning: '#CC0000',
        priceFeatured: '#007E33',
        greyLight: '#e6e6e6',
        greyMedium: '#cacaca',
        greyDark: '#8a8a8a',
        white: '#ffffff',
        black: '#131313'
    }

    const globalColorsInitDark: GlobalColors = { 
        primary: 'green',
        primaryText: 'white',
        success: '#00C851',
        successText: '#007E33',
        info: '#33b5e5',
        infoText: '#0099CC',
        warning: '#ffbb33',
        warningText: '#FF8800',
        danger: '#ff4444',
        dangerText: '#CC0000',
        priceWarning: '#CC0000',
        priceFeatured: '#007E33',
        greyLight: '#e6e6e6',
        greyMedium: '#cacaca',
        greyDark: '#8a8a8a',
        white: '#ffffff',
        black: '#131313'
    }

    const widthPixel = screen.width * screen.scale;

    const fontsSizeInit: FontsSize = {
        buttonMenu: widthPixel <= 720 ? 10 : 14,
        buttonMenuBig: widthPixel <= 720 ? 16 : 20,
        xxsmall: widthPixel <= 720 ? 6 : 7,
        xsmall: widthPixel <= 720 ? 7 : 8,
        small: widthPixel <= 720 ? 8 : 10,
        normal: widthPixel <= 720 ? 10 : 12,
        large: widthPixel <= 720 ? 12 : 14,
        xlarge: widthPixel <= 720 ? 14 : 16,
        xxlarge: widthPixel <= 720 ? 16 : 18,
        xxxlarge: widthPixel <= 720 ? 18 : 20,
        iconSmall: widthPixel <= 720 ? 8 : 10,
        iconNormal: widthPixel <= 720 ? 12 : 14,
        iconLarge: widthPixel <= 720 ? 18 : 20,
        iconLarge25: widthPixel <= 720 ? 23 : 25,
        iconLarge30: widthPixel <= 720 ? 28 : 30,
        iconLarge33: widthPixel <= 720 ? 31 : 33,
        iconXtraLarge: widthPixel <= 720 ? 36 : 40,
        iconHeaderBar: widthPixel <= 720 ? 30 : 35,
        iconCard: widthPixel <= 720 ? 28 : 30,
    }

    const lightTheme: ThemeState = {
        currentTheme: 'light',        
        dark: false,
        colors: {
            primary: 'black',            
            background: 'white',
            card: 'red',
            text: 'orange',
            border: 'pink',
            notification: 'teal',
        },
        globalColors: globalColorsInit,
        globalFontsSize: fontsSizeInit
    }
    
    const darkTheme: ThemeState = {
        currentTheme: 'dark',
        dark: true,
        colors: {
            primary: 'white',
            background: 'black',
            card: 'red',
            text: 'orange',
            border: 'pink',
            notification: 'teal',
        },
        globalColors: globalColorsInitDark,
        globalFontsSize: fontsSizeInit
    }

    const [theme, setTheme] = useState((Appearance.getColorScheme() === 'dark') ? lightTheme : lightTheme)

    useEffect(() => {
        (Appearance.getColorScheme() === 'dark') ? setDarkTheme() : setLightTheme()
    }, [])

    useEffect(() => {
        const listener = ( status: any ) => {
            if( status === 'active' ) {
                ( Appearance.getColorScheme() === 'light' )
                    ? setLightTheme()
                    : setDarkTheme()
            }
        }
        
        const appState = AppState.addEventListener( 'change', listener )

        return () => {
            appState.remove();
        }
    }, [])

    const setDarkTheme = () => {
        setTheme(darkTheme);
    }

    const setLightTheme = () => {
        setTheme(lightTheme);
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setDarkTheme,
            setLightTheme
        }}>
            { children }
        </ThemeContext.Provider>
    )
}
