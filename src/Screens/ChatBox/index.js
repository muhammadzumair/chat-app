import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import {Item} from 'native-base';

const ChatBox = () => {
  const [message, setmessage] = useState();
  const [sendMsg, SetSendMsg] = useState();
  const [NewChat, SetNewChat] = useState(false);
  const [Key, SetKey] = useState();
  const [FirstChat, SetFirstChat] = useState(false);
  const [MsgArr, SetMsgArr] = useState([]);
  const [isthisUpdate, SetisthisUpdate] = useState(true);
  const UserUid = store.getState().UserReducer.user.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  useEffect(() => {
    console.log(ActiveUserUid, 'userchat');
    console.log(UserUid, 'userchat');
    console.log(Key, 'key');

    firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(DocData => {
        console.log(DocData.data(), 'data');
        if (DocData.data().ChatId) {
          const Filter = DocData.data()?.ChatId.filter(v => {
            return v?.Uid == ActiveUserUid;
          });
          console.log(Filter.length, 'filternnn');
          if (Filter.length == 0) {
            SetNewChat(true);
            console.log('no uid ');
          } else {
            Filter.map(item => {
              SetKey(item?.ChatKey);
              if (isthisUpdate) {
                firestore()
                  .collection('chat')
                  .doc(item?.ChatKey)
                  .collection('Chats')
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(MsgData => {
                      console.log(MsgData.data().Msg, 'msgggg');
                      MsgArr.push(MsgData.data())
                      SetMsgArr([...MsgArr]);
                    });
                  });
                SetisthisUpdate(false);
              }
              console.log(item?.ChatKey, 'item?.ChatKey');
            });
          }
        } else {
          SetFirstChat(true);
          console.log('no Chatid ');
        }
      });
  }, []);
  const send = () => {
    SetSendMsg(message);
    setmessage('');
    const chatObj = {
      Msg: message,
      Uid: store.getState().UserReducer?.user?.uid,
    };

    if (FirstChat) {
      console.log('no chatid ');

      firestore()
        .collection('chat')
        .add({})
        .then(PushKey => {
          console.log(PushKey._documentPath._parts[1], 'FirstChat');
          firestore()
            .collection('chat')
            .doc(PushKey._documentPath._parts[1])
            .collection('Chats')
            .add(chatObj);
          const ChatId = [
            {
              Uid: ActiveUserUid,
              ChatKey: PushKey._documentPath._parts[1],
            },
          ];

          firestore()
            .collection('Users')
            .doc(UserUid)
            .set({ChatId}, {merge: true});
          firestore()
            .collection('Users')
            .doc(ActiveUserUid)
            .set(
              {
                ChatId: [
                  {Uid: UserUid, ChatKey: PushKey._documentPath._parts[1]},
                ],
              },
              {merge: true},
            );
          SetKey(PushKey);
          SetFirstChat(false);
        });
    }

    if (NewChat) {
      console.log('no uid ');

      firestore()
        .collection('chat')
        .add({})
        .then(PushKey => {
          firestore()
            .collection('chat')
            .doc(PushKey._documentPath._parts[1])
            .collection('Chats')
            .add(chatObj);

          firestore()
            .collection('Users')
            .doc(UserUid)
            .update({
              ChatId: firestore.FieldValue.arrayUnion({
                Uid: ActiveUserUid,
                ChatKey: PushKey._documentPath._parts[1],
              }),
            });

          firestore()
            .collection('Users')
            .doc(ActiveUserUid)
            .update({
              ChatId: firestore.FieldValue.arrayUnion({
                Uid: UserUid,
                ChatKey: PushKey._documentPath._parts[1],
              }),
            });

          SetKey(PushKey);
          SetNewChat(false);
        });
    } else if (!FirstChat && !NewChat) {
      console.log('else hai');
      firestore()
        .collection('chat')
        .doc(Key)
        .collection('Chats')
        .add(chatObj);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
{
MsgArr.map(v=>{
  return(
    <View>
<Text>{v.Msg}</Text>
      </View>
  )
})}
      </ScrollView>
      <View style={styles.MsgBoxView}>
        <TextInput
          placeholder="Type a message"
          style={styles.MsgBoxInput}
          autoCapitalize="sentences"
          onChangeText={text => {
            setmessage(text);
          }}
          multiline
          value={message}
        />
        <TouchableOpacity
          onPress={() => {
            send();
          }}>
          <Ionicons
            name="md-send"
            size={40}
            color="black"
            style={styles.MsgBoxIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBox;
