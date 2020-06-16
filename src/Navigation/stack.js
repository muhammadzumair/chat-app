import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from './NavigationService';

// Files
import Login from '../Screens/Login/index';
import ChatDashboard from '../Screens/ChatDashboard/index';

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
            } else if (route.name === 'ChatDashboard') {
              return <Ionicons name="md-contact" size={30} color="black" />;
            }

            // You can return any component that you like here!
          },
        })}>
        <Tab.Screen
          name="ChatDashboard"
          component={ChatDashboardStackNavigator}
        />
      </Tab.Navigator>
    );
  };

  const FINALStack = createStackNavigator();
  const FinalstackNavigator = () => {
    const {user} = props;
    return (
      <NavigationContainer>
        <FINALStack.Navigator>
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
