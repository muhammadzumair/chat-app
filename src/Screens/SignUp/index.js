import React, {Component} from 'react';
import {Container, Form, Item, Input} from 'native-base';
import {Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import {Auth} from '../../Redux/Actions/AuthAction';
export default class SignUp extends Component {
  state = {
    email: '',
    Password: '',
  };

  signUp() {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.Password)
      .then(response => {
        console.log('User account created & signed in!');
        console.log(response, 'response');
        var obj = {
          uid: response.user.uid,
          email: response.user.email,
        };
        store.dispatch(Auth(response.user.uid));
        firestore()
          .collection('Users')
          .doc(response.user.uid)
          .set(obj);
        this.setState({email: '', Password: ''});
        this.props.navigation.navigate('profile');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.log(error);
      });
  }
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
          <Form>
            <Item>
              <Input
                placeholder="Email"
                onChangeText={email => {
                  this.setState({email: email});
                }}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={Password => {
                  this.setState({Password: Password});
                }}
              />
            </Item>
          </Form>
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
              this.signUp();
            }}>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
