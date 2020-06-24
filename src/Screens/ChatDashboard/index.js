import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import styles from './style';
import {ActiveChat} from '../../Redux/Actions/ActiveChatAction';

const Chat = props => {
  const [UsersDetail, SetUserDetail] = useState([]);
  const [DidUpdate, setDidUpdate] = useState(true);
  const [ChatUser, SetChatUser] = useState([]);
  const PhotoUrl = [
    {
      imageUrl:
        'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
      Name: 'faraz',
      key: 1,
    },
    {
      imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
      Name: 'khan',
      key: 2,
    },
    {
      imageUrl:
        'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
      Name: 'faraz',
      key: 3,
    },
    {
      imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
      Name: 'khan',
      key: 4,
    },
    {
      imageUrl:
        'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
      Name: 'faraz',
      key: 5,
    },
    {
      imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
      Name: 'khan',
      key: 6,
    },
    {
      imageUrl:
        'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
      Name: 'faraz',
      key: 7,
    },
    {
      imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
      Name: 'khan',
      key: 8,
    },
  ];

  useEffect(() => {
    const UserUid = store?.getState()?.UserReducer?.user?.uid;

    if (DidUpdate) {
      // const UsersArray = [];
      console.log('work');
      firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(UsersData => {
            // console.log(UsersData.data(), 'userData');
            UsersDetail.push(UsersData.data());
            SetUserDetail([...UsersDetail]);
          });
        });
      firestore()
        .collection('Users')
        .doc(UserUid)
        .onSnapshot(UserData => {
          console.log(UserData?.data()?.ChatId);
          UserData?.data()?.ChatId?.map(value => {
            console.log(value.Uid, 'value');
            firestore()
              .collection('Users')
              .doc(value.Uid)
              .onSnapshot(Detail => {
                console.log(Detail.data(), 'detail');
                ChatUser.push(Detail.data());
                SetChatUser([...ChatUser]);
              });
          });
        });
      setDidUpdate(false);
    }
    // console.log(store.getState().UserReducer.user.uid, 'userreducer');
  }, []);

  const ChatStart = v => {
    store.dispatch(ActiveChat(v));
    console.log(v, 'vvvvv');

    props.navigation.navigate('ChatBox');
  };

  const Item = Item => {
    return (
      <TouchableOpacity
        style={styles.MainListView}
        onPress={() => {
          ChatStart(Item);
        }}>
        <View style={styles.ListView}>
          <Image source={{uri: Item.PhotoUrl}} style={styles.ListImg} />
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.ListTitle}>{Item.displayName}</Text>
          <Text>you:kese ho</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View
        style={{
          borderBottomColor: '#cfcfcf',
          borderBottomWidth: 1,
          elevation: 1,
        }}>
        <Text style={styles.UserScrollText}>Friends Active</Text>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.UsersScroll}>
            {UsersDetail.map(v => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    ChatStart(v);
                  }}>
                  <View style={styles.UsersMainView}>
                    <Image
                      source={{uri: v?.PhotoUrl}}
                      style={styles.UsersImg}
                    />
                  </View>
                  <View>
                    <Text style={styles.UsersName}>{v?.displayName}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={ChatUser}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => item.key}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Chat;
