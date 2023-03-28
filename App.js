import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useRef, useState} from 'react';
import {MD3DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Resources from './src/Resources';
import Facilities from './src/screens/facilities';
import Home from './src/screens/home';

import Login from './src/screens/login';
import Register from './src/screens/register';
import SportsClubCreation from './src/screens/sportsClubCreation';
import Welcome from './src/screens/welcome';
import CreateFacility from './src/screens/createFacility';
import Subscriptions from './src/screens/subscriptions';

export const UserContext = createContext();
export const SportsClubContext = createContext();

const noRoleSpecificData = (data) => {
  return data === null || data === '';
}

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

const SCAdminTabNavigator = createMaterialBottomTabNavigator();
const SCAdminTab = () => {
  return (
    <SCAdminTabNavigator.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: 'black'}}>
      <SCAdminTabNavigator.Screen name="Home" component={Home} />
      <SCAdminTabNavigator.Screen name="Facilities" component={Facilities} />
      <SCAdminTabNavigator.Screen name="CreateFacility" component={CreateFacility} />
      <SCAdminTabNavigator.Screen name="Subscriptions" component={Subscriptions} />
    </SCAdminTabNavigator.Navigator>
  );
};

const SCAdminNavigator = createStackNavigator();
const SCAdminStack = ({roleSpecificData}) => {
  const [reloadFacilities, setReloadFacilities] = useState(false)

  const contextValues = {
    reloadFacilitiesState: [reloadFacilities, setReloadFacilities]
  }

  return (
    <SportsClubContext.Provider value={contextValues}>
      <SCAdminNavigator.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animationEnabled: true,
          detachPreviousScreen: true,
        }}>
        {noRoleSpecificData(roleSpecificData) ? (
          <SCAdminNavigator.Screen
            name="SportsClubCreation"
            component={SportsClubCreation}
          />
        ) : (
          <SCAdminNavigator.Screen
            name="SportsClubAdminTab"
            component={SCAdminTab}
          />
        )}
      </SCAdminNavigator.Navigator>
    </SportsClubContext.Provider>
  );
};

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [roleSpecificData, setRoleSpecificData] = useState(null);

  const userContextData = {
    tokenState: [token, setToken],
    userDataState: [userData, setUserData],
    roleSpecificDataState: [roleSpecificData, setRoleSpecificData],
  };

  return (
    <UserContext.Provider value={userContextData}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: Resources.Colors.BackgroundColorBlack,
            }}>
            <StatusBar backgroundColor="black" />
            <PaperProvider theme={{...MD3DarkTheme, DarkTheme}}>
              <NavigationContainer theme={DarkTheme}>
                {userData === null && <AuthStack />}
                {userData !== null && userData?.role === 'SportsClubAdmin' && (
                  <SCAdminStack roleSpecificData={roleSpecificData} />
                )}
              </NavigationContainer>
            </PaperProvider>
          </SafeAreaView>
        </SafeAreaProvider>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
