import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import Navigation from './src/Navigation/stack';
// const Stack = createStackNavigator();
import auth from '@react-native-firebase/auth';

const App = () => {
  const [user, setUser] = useState();
  const checkUser = () => {
    auth().onAuthStateChanged(user => {
      setUser(user);
      store.dispatch({
        type: 'USER',
        user,
      });
    });
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Provider store={store}>
      <Navigation user={user} />
    </Provider>
  );
};

export default App;
