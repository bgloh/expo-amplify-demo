import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import signin from './Signin/signin';
import SignupScreen from './Signup/signup';
import forgotPassword from './ForgotPassword/forgotpassword_ver2';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
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