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

        // local variables
        
        
    }
    stripspace =(input)=>{
        return input.replace(/\s/gi,"");
    };
    signInUser = ()=>{
        // activity sign
        if (this.state.email != '' && this.state.password != '')
        this.setState({opacity: 1});
       
        // remove white spaces
        let eMail = this.stripspace(this.state.email);
        let passWord=this.stripspace(this.state.password);
        
        
        Auth.signIn(eMail, passWord) 
            .then(user => {
                this.setState({animating: false});
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
                  <Button title='Sign in' onPress={this.signInUser} ></Button>
                  </View>
                {/*  <Button title='Sign-out' onPress={this.signOutUser} ></Button> */}
                  <View>
                  <ActivityIndicator size="large" opacity={this.state.opacity} ></ActivityIndicator>
                  </View>

                  <View style={styles.buttonContainer} >
                  <Button title='Sign up' 
                     onPress={()=>navigate('SignupScreen',{name:'Jo'})} ></Button>
                  </View>

                  {/* forgot password */}
                  <View>
                    <TouchableOpacity onPress={()=>navigate('ForgotPasswordScreen')} >
                        <Text style= {{textAlign : 'center'}} >
                            Forgot Password
                        </Text>
                    </TouchableOpacity>

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
        height: 100,
        padding: 30,
    },

    inputText: {
        fontSize: 18,
    },

    buttonContainer : {
        height : 100,
        padding : 30,
        
    }

  });