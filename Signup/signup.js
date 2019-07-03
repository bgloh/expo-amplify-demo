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

Amplify.configure({Auth: awsmobile});

export default class signup extends Component{
    static navigationOptions = {
        title : 'sign up',
      };
      constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            verificationCode: '',
            errormessage: '',
            animating: true,
            confirmButtonDisabled: true,
            signupButtonDisabled: false,
            opacity: 0
        };
        this.signInUser = this.signUpUser.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.stripspace = this.stripspace.bind(this);

        // local variables
        var eMail, password;
        
    }
    


    stripspace =(input)=>{
        return input.replace(/\s/gi,"");
    };
    signUpUser = ()=>{
        // activity sign
        if (this.state.email != '' && this.state.password != '')
        this.setState({opacity: 1});
       
        // remove white spaces
        eMail = this.stripspace(this.state.email);
        passWord=this.stripspace(this.state.password);
          
        Auth.signUp(eMail, passWord) 
            .then(user => {
              // Stop ActivityIndicator
                this.setState({animating: false});
                this.setState({opacity: 0});
              // Clear error message
                this.setState({errormessage: ''});
               // Enable confirm button and Disable signup button.
                this.setState({confirmButtonDisabled:false});
                this.setState({signupButtonDisabled:true});
            })
            .catch(err => {this.setState({errormessage: err.message})  });
    };

    signOutUser = ()=>{
        this.setState({opacity: 0});
        Auth.signOut()
        .then(data => {this.setState({errormessage: data})})
        .catch(err => {this.setState({errormessage: err})});
    }

    confirmSignUp = ()=>{
      Auth.confirmSignUp(eMail,this.state.verificationCode, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    }).then(data =>  {
                        this.setState({errormessage: data});
                        this.props.navigation.navigate('SigninScreen');
                      })
      .catch(err => {this.setState({errormessage: err.message})  });   
    }
    
    render(){

        return (
            <KeyboardAvoidingView behavior="padding">
              <ScrollView keyboardShouldPersistTaps='never'  scrollEnabled={false}>
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
                 

                  <View style={styles.inputTextContainer} >
                  <TextInput  style={styles.inputText} 
                              onChangeText={(password)=>this.setState({password})} 
                              value={this.state.password}
                              placeholder = "password">
                  </TextInput>
                  </View>
                 
                  <View style={styles.buttonContainer} >
                  <Button title='Sign up' onPress={this.signUpUser}
                          disabled= {this.state.signupButtonDisabled} ></Button>
                  </View>
                {/*  <Button title='Sign-out' onPress={this.signOutUser} ></Button> */}
                  <View>
                  <ActivityIndicator size="large" opacity={this.state.opacity} ></ActivityIndicator>
                  </View>

                   <View style={styles.inputTextContainer} >
                  <TextInput  style={styles.inputText} 
                              onChangeText={(verificationCode)=>this.setState({verificationCode})} 
                              value={this.state.verificationCode}
                              placeholder = "verification code">
                  </TextInput>
                  </View>

                  <View style={styles.buttonContainer} >
                  <Button title='Confirm' onPress={this.confirmSignUp} 
                          disabled={this.state.confirmButtonDisabled} ></Button>
                  </View>

                </View>
              </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputTextContainer: {
        height: 50,
        padding: 10,
    },

    inputText: {
        fontSize: 18,
    },

    buttonContainer : {
        height : 50,
        padding : 10,
        
    }

  });