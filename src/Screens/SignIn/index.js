import React, {Component, useEffect} from 'react';
import {Container} from 'native-base';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import styles from './style';
import store from '../../Redux/store';
import {FbLogin} from '../../Redux/Actions/FbLoginAction';

export default class Signin extends Component {
  state = {
    email: '',
    Password: '',
  };

  // componentDidMount() {
  //   auth().onAuthStateChanged(User => {
  //     console.log(User, 'user');
  //   });
  // }

  render() {
    // console.log(this.state.email, 'email');
    // console.log(auth, 'auth');
    return (
      <Container>
        <View
          style={{
            marginTop: 50,
            border: 1,
            borderColor: 'grey',
            elevation: 2,
            borderRadius: 5,
            margin: 5,
            paddingRight: 10,
            height: 220,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: 'black',
              height: 50,
              borderRadius: 5,
              marginLeft: 10,
              marginTop: 20,
            }}
            onPress={() => {
              // this.Login();
            }}>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              Login With Google
            </Text>
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.hairline} />
            <Text>OR</Text>
            <View style={styles.hairline} />
          </View>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: 'black',
              height: 50,
              borderRadius: 5,
              marginLeft: 10,
              marginTop: 20,
            }}
            onPress={() => {
              store.dispatch(FbLogin(this.props));
            }}>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              Login with facebook
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
