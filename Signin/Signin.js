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

export default class signin extends Component{
    static navigationOptions = {
        title : 'LUNGROW LOGIN',
      };
      constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            errormessage: '',
            animating: true,
            opacity: 0
        };
        this.signInUser = this.signInUser.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.stripspace = this.stripspace.bind(this);

    }
    stripspace =(input)=>{
        return input.replace(/\s/gi,"");
    };
    signInUser = ()=>{
      // remove white spaces
      let email = this.state.email;
      let password = this.state.password;
      email = email.trim();
      password = password.trim();
      
       // activity Indicator
        if (email != '' && password != '')
        this.setState({opacity: 1});       
        
        Auth.signIn(email, password) 
            .then(user => {
                this.setState({opacity: 0});
            })
            .catch(err => {this.setState({errormessage: err.message})  });
    };

    signOutUser = ()=>{
        this.setState({opacity: 0});
        Auth.signOut()
        .then(data => {this.setState({errormessage: data})})
        .catch(err => {this.setState({errormessage: err})});
    }
    
    render(){
        const {navigate} = this.props.navigation;
        return (
      //      <KeyboardAvoidingView behavior="padding">
              <ScrollView keyboardShouldPersistTaps='never'  scrollEnabled={false}>
                <View style={styles.container}>
                  <Text>
                    {this.state.errormessage}
                  </Text>

                  <View style={styles.inputTextContainer} >
                  <TextInput style={styles.inputText}   
                      onChangeText={(email)=> {
                      this.setState({email});
                    } 
                  }
                  value={this.state.email}
                  placeholder = "e-mail address">
                  </TextInput>
                  <Text>               </Text>
                  <TextInput  style={styles.inputText} 
                              onChangeText={(password)=>this.setState({password})} 
                              value={this.state.password}
                              placeholder = "password">
                  </TextInput>
                  </View>
                 
                  <View style={styles.buttonContainer} >
                  <Button title='Sign in' onPress={this.signInUser} ></Button>
                  </View>
                {/*  <Button title='Sign-out' onPress={this.signOutUser} ></Button> */}
                  <View>
                  <ActivityIndicator size="large" opacity={this.state.opacity} ></ActivityIndicator>
                  </View>

                   {/* forgot password */}
                   <View>
                    <TouchableOpacity onPress={()=>navigate('ForgotPasswordScreen')} >
                        <Text style= {{textAlign : 'center'}} >
                            Forgot Password
                        </Text>
                    </TouchableOpacity>

                  </View>


                  {/* signup button */}
                  <View style={styles.buttonSignup} >
                  <Button
                    color='lightgray'
                    title='Sign up' 
                     onPress={()=>navigate('SignupScreen',{name:'Jo'})} ></Button>
                  </View>
                  
                </View>
              </ScrollView>
      //      </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },

    inputTextContainer: {
        flex:2,
        flexDirection:'column',
        padding: 10,
        margin: 10,
    },

    inputText: {
        fontSize: 20,
    },

    buttonContainer : {
      //  height : 50,
        padding : 10,
        
    },
    buttonSignup : {
        flex: 1,
        flexDirection: 'row',
        margin : 50,
        padding : 10,
        justifyContent: 'center',
     //   alignItems: 'center'
       // marginBottom: 10,
    }

  });