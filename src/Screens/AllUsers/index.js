import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

const UsersDetail = [
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
      </View>
    </TouchableOpacity>
  );
};

const AllUsers = props => {
  return (
    <View>
      <View style={styles.SearchView}>
        <Icon size={25} color="grey" name="search" style={styles.SearchIcon} />
        <TextInput placeholder="Find Friends" style={styles.SearchInput} />
      </View>
      <FlatList
        data={UsersDetail}
        renderItem={({item}) => <Item Item={item} props={props} />}
        keyExtractor={item => item.key}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllUsers;
