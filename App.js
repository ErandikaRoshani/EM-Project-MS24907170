import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {StatusBar} from 'react-native';
import { ProgressProvider } from './src/components/ProgressContext';

const App = () => {
  return (
        <ProgressProvider>
          <StatusBar
            animated
            backgroundColor="#0096C7"
            barStyle="dark-content"
          />
          <AppNavigator />
          </ProgressProvider>
  );
};
export default App;