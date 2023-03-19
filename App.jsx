import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from './src/screens/login';
import Register from './src/screens/register';
import Welcome from './src/screens/welcome';

const AuthStackNav = createStackNavigator();
const AuthStack = () => {
  return (
    <AuthStackNav.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <AuthStackNav.Screen name="Welcome" component={Welcome} />
      <AuthStackNav.Screen name="Login" component={Login} />
      <AuthStackNav.Screen name="Register" component={Register} />
    </AuthStackNav.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar backgroundColor="black" />
        <NavigationContainer theme={DarkTheme}>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
