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
    if (DidUpdate) {
      // const UsersArray = [];
      console.log('work');
      firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(UsersData => {
            console.log(UsersData.data(), 'userData');
            UsersDetail.push(UsersData.data());
            SetUserDetail([...UsersDetail]);
          });
        });
      setDidUpdate(false);
    }
    // console.log(store.getState().UserReducer.user.uid, 'userreducer');
  }, []);

  const ChatStart = v => {
    console.log(v, 'eee');
    store.dispatch(ActiveChat(v));
    props.navigation.navigate('ChatBox');
  };

  const Item = Item => {
    // console.log(UsersDetail, 'Userdetail');

    return (
      <TouchableOpacity
        style={styles.MainListView}
        onPress={() => {
          props.navigation.navigate('ChatBox');
        }}>
        <View style={styles.ListView}>
          <Image source={{uri: Item.imageUrl}} style={styles.ListImg} />
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.ListTitle}>{Item.Name}</Text>
          <Text>you:kese ho</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View>
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
        data={PhotoUrl}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => item.key}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Chat;
