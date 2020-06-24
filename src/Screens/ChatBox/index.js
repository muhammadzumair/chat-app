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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatBox = () => {
  const [message, setmessage] = useState();
  const [sendMsg, SetSendMsg] = useState();
  const [NewChat, SetNewChat] = useState(false);
  const [Key, SetKey] = useState();
  const [FirstChat, SetFirstChat] = useState(false);
  let [MsgArr, SetMsgArr] = useState([]);
  const [isthisUpdate, SetisthisUpdate] = useState(true);
  const [scrollRef, SetScrollRef] = useState();

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
                  .orderBy('timestamp')
                  .onSnapshot(v => {
                    MsgArr = [];
                    v.docs.forEach(MsgData => {
                      MsgArr.push(MsgData.data());
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
      timestamp: firestore.FieldValue.serverTimestamp(),
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
    scrollRef.scrollToEnd({animated: true});
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref => {
          SetScrollRef(ref);
        }}
        // onContentSizeChange={() => scrollRef.scrollToEnd({animated: true})}
        // style={{backgroundColor: 'yellow', maxHeight: hp('90%')}}
      >
        {MsgArr.map(v => {
          return (
            <View
              style={{
                backgroundColor: v.Uid == UserUid ? 'black' : '#cacaca',
                maxHeight: hp('20%'),
                minHeight: hp('6%'),
                marginTop: hp('5%'),
                width: wp('70%'),
                alignSelf: v.Uid == UserUid ? 'flex-end' : 'flex-start',
                padding: wp('2%'),
                borderRadius: 15,
                borderColor: v.Uid == UserUid ? 'black' : '#d2d2d2',
              }}>
              <Text style={{color: v.Uid == UserUid ? 'white' : 'black'}}>
                {v.Msg}
              </Text>
              <Text style={{color: 'white', textAlign: 'right'}}>
                {String(
                  new Date(v?.timestamp?.seconds * 1000).toLocaleTimeString(),
                )}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={{marginTop: 55}}>
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
    </View>
  );
};

export default ChatBox;
