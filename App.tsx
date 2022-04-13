import 'react-native-gesture-handler';
import React from 'react';
import { Text, TextInput } from 'react-native';
import { Navigator } from './src/navigator/Navigator';

import Toast from 'react-native-toast-message';

import { ApiProvider } from './src/context/api/ApiContext';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <ApiProvider>
      { children }
    </ApiProvider>
  )
}

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
((TextInput as unknown) as TextInputWithDefaultProps).defaultProps = ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

const App = () => {

  return (
    <AppState>      
      <Navigator />
      <Toast />
    </AppState>
  )
}

export default App;


