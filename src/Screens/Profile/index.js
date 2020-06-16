import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';

class Profile extends Component {
  state = {
    user: {},
    users: {},
  };

  async componentDidMount() {
    const user = await firestore()
      .collection('Users')
      .doc(store.getState().AuthReducer.user)
      .onSnapshot(data => {
        // console.log(data.data().email, 'data');
        this.setState({user: data.data()});
      });

    const users = await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log(
          //   'User ID: ',
          //   documentSnapshot.id,
          //   documentSnapshot.data(),
          // );
        });
      });
    store.subscribe(() => {
      console.log(store.getState().AuthReducer.user, 'get from reducer');
    });
  }
  render() {
    console.log(this.state.user.email, 'user');
    return (
      <View>
        <Text>Profile screen</Text>
        <Text>for single user:</Text>
        <Text>emial:</Text>
        <Text>{this.state.user.email}</Text>
        <Text>uid:</Text>
        <Text>{this.state.user.uid}</Text>
      </View>
    );
  }
}
export default Profile;
