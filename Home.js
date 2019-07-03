import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Home extends Component{
    static navigationOptions = {
        title : 'Welcome to Home Screen',
      };
    render(){
        
        return (
            <View>
                <Text>
                    Home Screen !!

                </Text>
            </View>
        );
    }
}