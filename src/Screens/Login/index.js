import React, {Component, useEffect} from 'react';
import {Container} from 'native-base';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import styles from './style';
import store from '../../Redux/store';
import {FbLogin} from '../../Redux/Actions/FbLoginAction';
import {GoogleLogin} from '../../Redux/Actions/GoogleLoginaAction';

const Login = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '107228495211-631plvhq99de2uro3nl2e1418bqg83u9.apps.googleusercontent.com',
    });
  }, []);

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
            store.dispatch(GoogleLogin());
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
};

export default Login;
