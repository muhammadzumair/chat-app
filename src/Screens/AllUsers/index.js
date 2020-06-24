import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import {ActiveChat} from '../../Redux/Actions/ActiveChatAction';
import styles from './style';

const AllUsers = props => {
  const [ThisUpdate, SetThisUpdate] = useState(true);
  const [UsersDetail, SetUserDetail] = useState([]);

  useEffect(() => {
    if (ThisUpdate) {
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
      SetThisUpdate(false);
    }
  }, []);

  // const UsersDetail = [
  //   {
  //     imageUrl:
  //       'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
  //     Name: 'faraz',
  //     key: 1,
  //   },
  //   {
  //     imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
  //     Name: 'khan',
  //     key: 2,
  //   },
  //   {
  //     imageUrl:
  //       'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
  //     Name: 'faraz',
  //     key: 3,
  //   },
  //   {
  //     imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
  //     Name: 'khan',
  //     key: 4,
  //   },
  //   {
  //     imageUrl:
  //       'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
  //     Name: 'faraz',
  //     key: 5,
  //   },
  //   {
  //     imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
  //     Name: 'khan',
  //     key: 6,
  //   },
  //   {
  //     imageUrl:
  //       'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
  //     Name: 'faraz',
  //     key: 7,
  //   },
  //   {
  //     imageUrl: 'https://img.icons8.com/plasticine/2x/user.png',
  //     Name: 'khan',
  //     key: 8,
  //   },
  // ];
  const ChatStart = Item => {
    store.dispatch(ActiveChat(Item));
    console.log(Item, 'vvvvv');

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
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.SearchView}>
        <Icon size={25} color="grey" name="search" style={styles.SearchIcon} />
        <TextInput placeholder="Find Friends" style={styles.SearchInput} />
      </View>
      <FlatList
        data={UsersDetail}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => item.key}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllUsers;
