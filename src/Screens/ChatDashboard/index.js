import React from 'react';
import {View, Text, Button} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

const Chat = props => {
  const logout = () => {
    LoginManager.logOut();
    auth().signOut();
  };
  return (
    <View>
      <Text>chat box</Text>
      <Button title="logout" onPress={() => logout()} />
    </View>
  );
};
export default Chat;
