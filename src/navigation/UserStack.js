import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense, useState} from 'react';
import {LoadingScreen, RegularUserContext} from '../../App';
import Resources from '../Resources';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '@rneui/themed';

const UserTabNavigator = createMaterialBottomTabNavigator();
const UserHomeStackNavigator = createStackNavigator();

const UserHome = React.lazy(() => import('../screens/userHome'));
const SportsClubs = React.lazy(() => import('../screens/sportsClubs'));
const UserForms = React.lazy(() => import('../screens/userForms'));
const CreateTrainingPlanForm = React.lazy(() => import('../screens/createTrainingPlanForm'));
const Trainers = React.lazy(() => import('../screens/trainers'));
const Trainer = React.lazy(() => import('../screens/trainer'));

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
      <UserHomeStackNavigator.Screen
        name={'UserForms'}
        component={UserForms}
      />
      <UserHomeStackNavigator.Screen
        name={'CreateTrainingPlanForm'}
        component={CreateTrainingPlanForm}
      />
      <UserHomeStackNavigator.Screen
        name={'Trainers'}
        component={Trainers}
      />
      <UserHomeStackNavigator.Screen
        name={'Trainer'}
        component={Trainer}
      />
    </UserHomeStackNavigator.Navigator>
  );
};

const UserTab = () => {
  const {theme} = useTheme();

  const context = {
    
  };

  return (
    <RegularUserContext.Provider value={context}>
      <UserTabNavigator.Navigator
        initialRouteName={'HomeStack'}
        activeColor={theme.colors.primary}
        inactiveColor={theme.mode === 'dark' ? theme.colors.greyOutline : theme.colors.secondary}
        barStyle={{backgroundColor: theme.colors.background, borderTopColor: theme.colors.black, borderTopWidth: 0.2}}>
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
