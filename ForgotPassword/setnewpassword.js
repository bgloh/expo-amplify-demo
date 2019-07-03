import React, {Component} from 'react';
import {
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

class SetNewPassword extends Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            newPassword: '',
            verificationCode:'',
            errormessage: '',
            animating: true,
            opacity: 0
        };
        this.setNewPassword = this.setNewPassword.bind(this);
        this.stripspace = this.stripspace.bind(this);

    }
    stripspace =(input)=>{
        return input.replace(/\s/gi,"");
    };
    
    // Collect confirmation code and new password, then
    setNewPassword = ()=>{
        // variables removed from white spaces
        const email = this.stripspace(this.state.email);
        const verificationCode = this.stripspace(this.state.verificationCode);
        const newPassword = this.stripspace(this.state.newPassword);
  
        // check input fields and start activityIndicator
        if (email != '' && verificationCode !== '' && newPassword !=='')
          this.setState({opacity: 1});
  
          Auth.forgotPasswordSubmit(email,verificationCode,newPassword)
          .then(
              data =>{
                  //console.log(data);
                  this.setState({opacity: 0});
                  // move to signin screen
                  this.props.navigation.navigate('SigninScreen');
              }
          )
          .catch(err => console.log(err));
      };

    render(){
    
        return(
        <View>
            <View style={styles.inputTextContainer} >
                  <TextInput style={styles.inputText}  onChangeText={(email)=> {
                      this.setState({email});
                    } 
                  }
                  value={this.state.email}
                  placeholder = "e-mail address">
                  </TextInput>
            </View>

            <View style={styles.inputTextContainer} >
                  <TextInput  style={styles.inputText} 
                              onChangeText={(verificationCode)=>this.setState({verificationCode})} 
                              value={this.state.verificationCode}
                              placeholder = "verification code">
                  </TextInput>
            </View>
                 

            <View style={styles.inputTextContainer} >
                  <TextInput  style={styles.inputText} 
                              onChangeText={(newPassword)=>this.setState({newPassword})} 
                              value={this.state.newPassword}
                              placeholder = "new password">
                  </TextInput>
            </View>

            <View style={styles.buttonContainer} >
                  <Button title='SET NEW PASSWORD' 
                     onPress={this.setNewPassword} ></Button>
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
  

  export default SetNewPassword;
  