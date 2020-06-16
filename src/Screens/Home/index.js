import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';

class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home screen</Text>
        <TouchableOpacity
          style={{backgroundColor: 'black', alignItems: 'center', height: 50}}
          onPress={() => {
            this.props.navigation.navigate('Signin');
          }}>
          <Text style={{color: 'white', marginTop: 10, fontSize: 20}}>
            SIGN IN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            alignItems: 'center',
            height: 50,
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}>
          <Text style={{color: 'white', marginTop: 10, fontSize: 20}}>
            SIGN UP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            alignItems: 'center',
            height: 50,
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('Account');
          }}>
          <Text style={{color: 'white', marginTop: 10, fontSize: 20}}>
            Account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;
