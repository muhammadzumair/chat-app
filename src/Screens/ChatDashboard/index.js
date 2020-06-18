import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import store from '../../Redux/store';
import {black} from 'color-name';
import styles from './style';

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

const Item = ({Item, props}) => {
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

const Chat = props => {
  return (
    <View>
      <View>
        <Text style={styles.UserScrollText}>Friends Active</Text>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.UsersScroll}>
            {PhotoUrl.map(v => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ChatBox');
                  }}>
                  <View style={styles.UsersMainView}>
                    <Image source={{uri: v.imageUrl}} style={styles.UsersImg} />
                  </View>
                  <View>
                    <Text style={styles.UsersName}>{v.Name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={PhotoUrl}
        renderItem={({item}) => <Item Item={item} props={props} />}
        keyExtractor={item => item.key}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Chat;
