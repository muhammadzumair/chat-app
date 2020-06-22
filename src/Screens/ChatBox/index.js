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

const ChatBox = () => {
  const [message, setmessage] = useState();
  const [sendMsg, SetSendMsg] = useState();
  const [NewChat, SetNewChat] = useState(false);
  const [Key, SetKey] = useState();
  const [FirstChat, SetFirstChat] = useState(false);
  const UserUid = store.getState().UserReducer.user.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  useEffect(() => {
    console.log(ActiveUserUid, 'userchat');
    console.log(UserUid, 'userchat');
    // firestore()
    //   .collection('Users')
    //   .doc(store?.getState()?.UserReducer?.user?.uid)
    //   .onSnapshot(docData => {
    //     // console.log(docData.data(), 'docdata');
    //     if (docData?.data()?.ChatId) {
    //       docData.data()?.ChatId.filter(v => {
    //         if (
    //           v.Uid == store.getState()?.ActiveChatReducer?.ChatUser?.UserUid
    //         ) {
    //           SetKey(v.key);
    //         } else {
    //           SetChatStart(true);
    //         }
    //       });
    //     } else {
    //       SetNewChat(true);
    //     }
    //   });

    // console.log(store?.getState()?.UserReducer?.user?.uid,"jjj")
    firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(DocData => {
        console.log(DocData.data(), 'data');
        if (DocData.data().ChatId) {
          DocData.data().ChatId.map(item => {
            if (item?.Uid == ActiveUserUid) {
              SetKey(item?.ChatKey);
              console.log(item?.ChatKey, 'item?.ChatKey');
            } else {
              SetNewChat(true);
              console.log('no uid ');
            }
          });
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
      Uid: store.getState().UserReducer.user.uid,
    };

    // firestore()
    //   .collection('Users').where("ChatId",'array-contains',)
    // firestore()
    //   .collection('chat')
    //   .add(chatObj)

    // const chatdata = firestore()
    //   .collection('chat')
    //   .add({})
    //   .then(key => {
    //     console.log(key._documentPath._parts[1], 'chat');
    //   });
    // if (NewChat) {
    //   firestore()
    //     .collection('chat')
    //     .add(chatObj)
    //     .then(key => {
    //       SetKey(key._documentPath._parts[1]);
    //       const pushkey = key._documentPath._parts[1];
    //       const ChatId = [
    //         {
    //           key: pushkey,
    //           Uid: store.getState()?.ActiveChatReducer?.ChatUser.UserUid,
    //         },
    //       ];

    //       firestore()
    //         .collection('Users')
    //         .doc(store.getState().UserReducer.user.uid)
    //         .set({ChatId}, {merge: true});
    //     });
    //   SetNewChat(false);
    // } else if (ChatStart) {
    //   firestore()
    //     .collection('chat')
    //     .add(chatObj)
    //     .then(key => {
    //       SetKey(key._documentPath._parts[1]);
    //       const pushkey = key._documentPath._parts[1];
    //       const ChatId = [
    //         {
    //           key: pushkey,
    //           Uid: store.getState()?.ActiveChatReducer?.ChatUser.UserUid,
    //         },
    //       ];

    //       firestore()
    //         .collection('Users')
    //         .doc(store.getState().UserReducer.user.uid)
    //         .set({ChatId}, {merge: true});
    //     });
    //   SetChatStart(false);
    // } else {
    //   firestore()
    //     .collection('chat')
    //     .doc(Key)
    //     .set(chatObj, {merge: true});
    // }

    if (FirstChat) {
      console.log('no chatid ');

      firestore()
        .collection('chat')
        .add(chatObj)
        .then(PushKey => {
          console.log(PushKey._documentPath._parts[1], 'FirstChat');
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
        .add(chatObj)
        .then(PushKey => {
          firestore()
            .collection('Users')
            .doc(UserUid)
            .set(
              {
                ChatId: [
                  {
                    Uid: ActiveUserUid,
                    ChatKey: PushKey._documentPath._parts[1],
                  },
                ],
              },
              {merge: true},
            );
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
          SetNewChat(false);
        });
    } else if (!FirstChat && !NewChat) {
      console.log('else hai');
      firestore()
        .collection('chat')
        .doc(Key)
        .set(chatObj, {merge: true});
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Text>{sendMsg}</Text>
        </View>
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
