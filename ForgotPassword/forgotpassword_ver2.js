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

Amplify.configure({Auth: awsmobile});






export default class forgotPassword extends Component{

constructor(props){
    super(props);
    this.state ={
        val: 1,
    }
    this.showData = this.showData.bind(this);
}

showData = (data)=>{
    const res = this.state.val + data;
    this.setState({val : this.state.val+1});
    console.log('response:'+this.state.val);
}

    static navigationOptions = {
        title : 'FORGOT PASSWORD',
      };
 
    render() {       
        return <ResetPassword handler={this.showData} />

       
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