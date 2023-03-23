import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import React, {createContext, useRef, useState} from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Resources from './src/Resources';
import Home from './src/screens/home';

import Login from './src/screens/login';
import Register from './src/screens/register';
import SportsClubCreation from './src/screens/sportsClubCreation';
import Welcome from './src/screens/welcome';

export const UserContext = createContext();

const AuthStackNav = createStackNavigator();
const AuthStack = () => {
  return (
    <AuthStackNav.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <AuthStackNav.Screen name="Welcome" component={Welcome} />
      <AuthStackNav.Screen name="Login" component={Login} />
      <AuthStackNav.Screen name="Register" component={Register} />
    </AuthStackNav.Navigator>
  );
};

const SportsClubAdminStackNav = createStackNavigator();
const SportsClubAdminStackNavWithoutClub = createStackNavigator();
const SportsClubAdminStackWithoutClub = () => {
  return (
    <SportsClubAdminStackNavWithoutClub.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SportsClubAdminStackNavWithoutClub.Screen
        name="SportsClubCreation"
        component={SportsClubCreation}
      />
    </SportsClubAdminStackNavWithoutClub.Navigator>
  );
};
const SportsClubAdminStack = () => {
  return (
    <SportsClubAdminStackNav.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SportsClubAdminStackNav.Screen name="Home" component={Home} />
    </SportsClubAdminStackNav.Navigator>
  );
};

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [roleSpecificData, setRoleSpecificData] = useState(null);
  const roleSpecificDataRef = useRef(roleSpecificData);

  const userContextData = {
    tokenState: [token, setToken],
    userDataState: [userData, setUserData],
    roleSpecificDataState: [roleSpecificData, setRoleSpecificData],
  };

  return (
    <UserContext.Provider value={userContextData}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: Resources.Colors.BackgroundColorBlack,
            }}>
            <StatusBar backgroundColor="black" />
            <NavigationContainer theme={DarkTheme}>
              {userData === null && <AuthStack />}
              {userData !== null && userData?.role === 'SportsClubAdmin' 
                && (roleSpecificData === null || roleSpecificData === '') 
                && <SportsClubAdminStackWithoutClub />}
              {userData !== null &&
                userData?.role === 'SportsClubAdmin' && roleSpecificData !== null 
                && roleSpecificData !== '' && <SportsClubAdminStack />}
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
