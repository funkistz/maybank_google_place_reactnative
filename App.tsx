/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Button } from 'antd-mobile-rn';
import { Provider } from 'react-redux';
import { store } from './src/store';
import HomePage from './src/pages/HomePage';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <AutocompleteDropdownContextProvider>
        <SafeAreaView >
          <HomePage />
        </SafeAreaView>
      </AutocompleteDropdownContextProvider>
    </Provider>
  );
}

export default App;
