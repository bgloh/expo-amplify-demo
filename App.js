import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import signin from './signin';
import Home from './Home';
import SignupScreen from './Friend';
import forgotPassword from './ForgotPassword';

import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'

Amplify.configure(awsmobile)

const MainNavigator = createStackNavigator ({
  SigninScreen: {screen: signin},
  SignupScreen: {screen: SignupScreen},
  ForgotPasswordScreen : {screen: forgotPassword}

});

const App = createAppContainer(MainNavigator);

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});