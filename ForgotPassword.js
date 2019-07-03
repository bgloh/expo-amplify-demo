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
import Amplify, {Auth} from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure({Auth: awsmobile});

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

        // local variables
        var eMail, passWord;
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
        this.setState({opacity: 1});
        Auth.forgotPasswwordSubmit(eMail,this.state.verificationCode,this.state.newPassword)
        .then(
            data =>{
                console.log(data);
                this.setState({opacity: 0});
            }
        )
        .catch(err => console.log(err));
    };
    
    render(){
        
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
                     onPress={()=>this.setNewPassword} ></Button>
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