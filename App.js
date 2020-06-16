import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import Navigation from './src/Navigation/stack';
// const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
