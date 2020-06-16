import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from './NavigationService';

// Files
import Home from '../Screens/Home/index';
import ChatDashboard from '../Screens/ChatDashboard/index';
// import Signin from '../Screens/SignIn/index';
// import SignUp from '../Screens/SignUp/index';
// import Account from '../Screens/Account/index';

const HomeStack = createStackNavigator();
const Navigation = props => {
  const HomestackNavigator = () => {
    return (
      <HomeStack.Navigator
        screenOptions={{
          animationEnabled: false,
        }}>
        <HomeStack.Screen name="Home" component={Home} />
      </HomeStack.Navigator>
    );
  };
  const Stack = createStackNavigator();
  const ChatDashboardStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ChatDashboard" component={ChatDashboard} />
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
              } else if (route.name === 'ChatDashboard') {
                return <Ionicons name="md-contact" size={30} color="black" />;
              }

              // You can return any component that you like here!
            },
          })}>
          {/* <Tab.Screen
            name="Home"
            component={HomestackNavigator}
            options={({route}) => ({
              tabBarVisible: showTab(route, NotShowTab),
            })}
          /> */}
          <Tab.Screen
            name="ChatDashboard"
            component={ChatDashboardStackNavigator}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  const FINALStack = createStackNavigator();
  const FinalstackNavigator = () => {
    const {user} = props;
    return (
      <NavigationContainer>
        <FINALStack.Navigator>
          <FINALStack.Screen
            name="Home"
            component={user ? TabNavigator : HomestackNavigator}
          />
        </FINALStack.Navigator>
      </NavigationContainer>
    );
  };

  return TabNavigator();
};

export default Navigation;
