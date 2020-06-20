import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

const ChatBox = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.MsgBoxView}>
        <TextInput
          placeholder="Type a message"
          style={styles.MsgBoxInput}
          autoCapitalize="sentences"
          multiline
        />
        <Ionicons
          name="md-send"
          size={40}
          color="black"
          style={styles.MsgBoxIcon}
        />
      </View>
    </View>
  );
};

export default ChatBox;
