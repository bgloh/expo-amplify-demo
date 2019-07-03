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



// reset password component
/*class resetPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
    email: '',
    verificationCode :'',
    errormessage: '',
    animating: true,
    opacity: 0
    }
  

  resetPassword = ()=>{        
    // activity indicator
    if (this.state.email != '')
    this.setState({opacity: 1});
   
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

}*/


export default class forgotPassword extends Component{
    static navigationOptions = {
        title : 'FORGOT PASSWORD',
      };
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
        this.resetPassword = this.resetPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.stripspace = this.stripspace.bind(this);

    }
    stripspace =(input)=>{
        return input.replace(/\s/gi,"");
    };
    resetPassword = ()=>{        
        // activity indicator
        if (this.state.email != '')
        this.setState({opacity: 1});
       
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
                console.log(data);
                this.setState({opacity: 0});
            }
        )
        .catch(err => console.log(err));
    };
    
    render(){       
         // local variables
         //var eMail, passWord;
         const {navigate} = this.props.navigation;

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
                 
                  <View style={styles.buttonContainer} >
                  <Button title='RESET PASSWORD' onPress={this.resetPassword} ></Button>
                  </View>
                {/*  <Button title='Sign-out' onPress={this.signOutUser} ></Button> */}
                  <View>
                  <ActivityIndicator size="large" opacity={this.state.opacity} ></ActivityIndicator>
                  </View>


                {/*  reset password  */}  

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
              </ScrollView>
            </KeyboardAvoidingView>
        );
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