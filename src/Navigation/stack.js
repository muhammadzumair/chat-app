import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from './NavigationService';
import store from '../Redux/store';
import {Image} from 'react-native';

// Files
import Login from '../Screens/Login/index';
import ChatDashboard from '../Screens/ChatDashboard/index';
import AllUsers from '../Screens/AllUsers/index';
import Settings from '../Screens/Settings/index';
import ChatBox from '../Screens/ChatBox/index';
import styles from './style';

const Navigation = props => {
  const LoginStack = createStackNavigator();
  const LoginstackNavigator = () => {
    return (
      <LoginStack.Navigator
        screenOptions={{
          animationEnabled: false,
        }}>
        <LoginStack.Screen name="Login" component={Login} />
      </LoginStack.Navigator>
    );
  };

  const Userstack = createStackNavigator();
  const AllUserStack = () => {
    return (
      <Userstack.Navigator>
        <Userstack.Screen
          name="Allusers"
          component={AllUsers}
          options={() => ({
            headerShown: false,
          })}
        />
        <Userstack.Screen
          name="ChatBox"
          component={ChatBox}
          option={() => ({})}
        />
      </Userstack.Navigator>
    );
  };

  const Stack = createStackNavigator();
  const ChatDashboardStackNavigator = () => {
    const {user} = props;
    // console.log(user.photoURL, 'photo');
    const arr = user.displayName.split(' ');
    var name = arr
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');

    console.log(
      store?.getState()?.ActiveChatReducer?.ChatUser?.displayName,
      'chatname',
    );
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={name}
          component={ChatDashboard}
          options={() => ({
            headerLeft: () => (
              <Image source={{uri: user.photoURL}} style={styles.stackImage} />
            ),
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="ChatBox"
          component={ChatBox}
          options={() => ({
            title: 'chatting',
          })}
        />
      </Stack.Navigator>
    );
  };

  const NotShowTab = ['ChatBox'];

  const showTab = (route, array) => {
    console.log(route, 'route');

    const RouteName = route?.state?.routes[route.state.index]?.name;
    return !array.includes(RouteName);
  };

  const Tab = createBottomTabNavigator();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Login') {
              return <Ionicons name="md-Login" size={30} color="black" />;
            } else if (route.name === 'Chat') {
              return <Ionicons name="md-chatboxes" size={30} color="black" />;
            } else if (route.name === 'Find Friends') {
              return <Icons name="users" size={30} color="black" />;
            } else if (route.name === 'Settings') {
              return <Ionicons name="md-settings" size={30} color="black" />;
            }

            // You can return any component that you like here!
          },
        })}
        initialRouteName="Chat">
        <Tab.Screen
          name="Chat"
          component={ChatDashboardStackNavigator}
          options={({route}) => ({
            tabBarVisible: showTab(route, NotShowTab),
          })}
        />

        <Tab.Screen
          name="Find Friends"
          component={AllUserStack}
          options={({route}) => ({
            tabBarVisible: showTab(route, NotShowTab),
          })}
        />

        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  };

  const FINALStack = createStackNavigator();
  const FinalstackNavigator = () => {
    const {user} = props;
    return (
      <NavigationContainer>
        <FINALStack.Navigator headerMode="none">
          <FINALStack.Screen
            name="Final"
            component={user ? TabNavigator : LoginstackNavigator}
          />
        </FINALStack.Navigator>
      </NavigationContainer>
    );
  };

  return FinalstackNavigator();
};

export default Navigation;
