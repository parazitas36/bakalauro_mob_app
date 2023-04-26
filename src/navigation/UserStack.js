import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense, useState} from 'react';
import {LoadingScreen, RegularUserContext} from '../../App';
import Resources from '../Resources';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { verticalScale } from 'react-native-size-matters';
import SportsClubs from '../screens/sportsClubs';

const UserTabNavigator = createMaterialBottomTabNavigator();
const UserHomeStackNavigator = createStackNavigator();

const UserHome = React.lazy(() => import('../screens/userHome'));

const UserHomeStack = () => {
  return (
    <UserHomeStackNavigator.Navigator
      initialRouteName={Resources.Screens.SCAdminHome}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <UserHomeStackNavigator.Screen
        name={'UserHome'}
        component={UserHome}
      />
      <UserHomeStackNavigator.Screen
        name={'SportsClubs'}
        component={SportsClubs}
      />
    </UserHomeStackNavigator.Navigator>
  );
};

const UserTab = () => {

  const context = {
    
  };

  return (
    <RegularUserContext.Provider value={context}>
      <UserTabNavigator.Navigator
        initialRouteName={'HomeStack'}
        activeColor="#f0edf6"
        inactiveColor="#2089DC"
        barStyle={{backgroundColor: 'black'}}>
        <UserTabNavigator.Screen
          name={'HomeStack'}
          component={UserHomeStack}
          options={{
            tabBarLabel: Resources.Screens.Home,
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={verticalScale(18)} />
            ),
          }}
        />
      </UserTabNavigator.Navigator>
    </RegularUserContext.Provider>
  );
};

const UserNavigator = createStackNavigator();
const UserStack = ({roleSpecificData}) => {
  return (
    <Suspense fallback={LoadingScreen()}>
      <UserNavigator.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animationEnabled: true,
          detachPreviousScreen: true,
        }}>
        <UserNavigator.Screen name="UserTab" component={UserTab} />
      </UserNavigator.Navigator>
    </Suspense>
  );
};

export default UserStack;
