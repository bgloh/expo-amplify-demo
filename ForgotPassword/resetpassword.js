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

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            errormessage: '',
            animating: true,
            opacity: 0
        };
     //   this.resetPassword = this.resetPassword.bind(this);
      //  this.setNewPassword = this.setNewPassword.bind(this);
      //  this.stripspace = this.stripspace.bind(this);

    }
    stripspace =(input)=>{
        return input.replace(/\s/gi,"");
    };
    resetPassword = ()=>{        
        // activity indicator
        if (this.state.email != '')
        this.setState({opacity: 1});
       
        this.props.handler(10);
        // remove white spaces
        eMail = this.stripspace(this.state.email);
        
        // request reset password
        Auth.forgotPassword(eMail) 
            .then(data => {
                this.setState({opacity: 0});
                //this.setState({animating: false});
                //this.setState({errormessage: data}); 
                console.log(data);
            })
            .catch(err => {this.setState({errormessage: err.message})  });
    };

    render(){
        return(

            <View>
            <Text>
              {this.state.errormessage}
            </Text>

            <View style={styles.inputTextContainer} >
            <TextInput style={styles.inputText}  onChangeText={(email)=> {
                this.setState({email});
              } 
            }
            value={this.state.email}
            placeholder = "e-mail address">
            </TextInput>
            </View>
           
            <View style={styles.buttonContainer} >
            <Button title='RESET PASSWORD' onPress={this.resetPassword} ></Button>
            </View>
          {/*  <Button title='Sign-out' onPress={this.signOutUser} ></Button> */}
            <View>
            <ActivityIndicator size="large" opacity={this.state.opacity} ></ActivityIndicator>
            </View>
        </View>
        )
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
  

  export default ResetPassword;
  