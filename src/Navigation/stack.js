import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from './NavigationService';

// Files
import Home from '../Screens/Home/index';
import Profile from '../Screens/Profile/index';
import Signin from '../Screens/SignIn/index';
import SignUp from '../Screens/SignUp/index';
import Account from '../Screens/Account/index';

const HomeStack = createStackNavigator();
const Navigation = () => {
  const HomestackNavigator = () => {
    return (
      <HomeStack.Navigator
        screenOptions={{
          animationEnabled: false,
        }}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Signin" component={Signin} />
        <HomeStack.Screen name="SignUp" component={SignUp} />
        <HomeStack.Screen name="Account" component={Account} />
      </HomeStack.Navigator>
    );
  };
  const Stack = createStackNavigator();
  const ProfilestackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  };
  const NotShowTab = ['Signin', 'SignUp', 'Account'];

  const showTab = (route, array) => {
    console.log(route?.state?.routes[route.state.index]?.name, 'route');
    console.log(array, 'array');
    const RouteName = route?.state?.routes[route.state.index]?.name;
    return !array.includes(RouteName);
  };
  const Tab = createBottomTabNavigator();
  const TabNavigator = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              // console.log(route,"route")
              if (route.name === 'Home') {
                return <Ionicons name="md-home" size={30} color="black" />;
              } else if (route.name === 'profile') {
                return <Ionicons name="md-contact" size={30} color="black" />;
              }

              // You can return any component that you like here!
            },
          })}>
          <Tab.Screen
            name="Home"
            component={HomestackNavigator}
            options={({route}) => ({
              tabBarVisible: showTab(route, NotShowTab),
            })}
          />
          <Tab.Screen name="profile" component={ProfilestackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  // const FINALStack = createStackNavigator();
  // const stackNavigator = () => {
  //   return (
  //     <NavigationContainer>
  //       {/* <FINALStack.Navigator>
  //         <FINALStack.Screen name="Home" component={TabNavigator} />
  //       </FINALStack.Navigator> */}

  //       <TabNavigator />
  //     </NavigationContainer>
  //   );
  // };

  return TabNavigator();
};

export default Navigation;
