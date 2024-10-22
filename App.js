import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar animated backgroundColor="#0096C7" barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};
export default App;
