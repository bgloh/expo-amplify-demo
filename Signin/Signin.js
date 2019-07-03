import React, {Component} from 'react';
import {
    keyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Amplify, {Auth} from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure({Auth: awsmobile});

export default class Signin extends Component{
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            errormessage: ''
        };
        this.signInUser = this.signInUser.bind(this);
    }

    signInUser = ()=>{
        Auth.signIn(this.state.email, this.state.password)
            .then(user => {this.props.navigation.navigate('Profile',user)})
            .catch(err => {this.setState({errormessage: err.message})  });
    };

    render(){
        return (
            <keyboardAvoidingView behavior="padding">
              <ScrollView keyboardShouldPersistTaps='never'  scrollEnabled={false}>
                <View>
                  <Text>
                    {this.state.errormessage}
                  </Text>
                  <TextInput  onChangeText={(email)=>this.setState({email})} 
                              value={this.state.email}
                              placeholder = "EMAIL ADDRESS">
                    
                  </TextInput>
                </View>
              </ScrollView>
            </keyboardAvoidingView>
        )
    }
}