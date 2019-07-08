import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsmobile from '../aws-exports';
import ResetPassword from './resetpassword';
import SetNewPassword from './setnewpassword';

Amplify.configure({Auth: awsmobile});



export default class forgotPassword extends Component{

constructor(props){
    super(props);
    this.state ={
        isResetPasswordDone : false
    }
    this.setResetPasswordDone = this.setResetPasswordDone.bind(this);
}

setResetPasswordDone = ()=>{
    this.setState({ isResetPasswordDone: true });
}


    static navigationOptions = {
        title : 'FORGOT PASSWORD',
      };
 
    render() {       
        let isResetPasswordDone = this.state.isResetPasswordDone;

        if (!isResetPasswordDone)
            return <ResetPassword setResetPasswordDone={this.setResetPasswordDone} /> 
        else
         return <SetNewPassword navigation={this.props.navigation}/> 

       
}
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputTextContainer: {
        padding: 10,
    },

    inputText: {
        fontSize: 18,
    },

    buttonContainer : {
        padding : 10,      
    }

  });