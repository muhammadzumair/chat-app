import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import store from '../../Redux/store';
const Chat = props => {
  const logout = async () => {
    LoginManager.logOut();
    auth().signOut();
    await GoogleSignin.signOut();
  };

  useEffect(() => {
    console.log(store.getState().UserReducer.user.displayName);
  });
  return (
    <View>
      <Text>chat box</Text>
      <Button title="logout" onPress={() => logout()} />
    </View>
  );
};
export default Chat;
