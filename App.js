import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, Suspense, useState} from 'react';
import {MD3DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Resources from './src/Resources';

import Register from './src/screens/register';
import Welcome from './src/screens/welcome';
import Loading from './src/screens/loading';
import TrainerStack from './src/navigation/TrainerStack';

export const LoadingScreen = () => <Loading />
export const UserContext = createContext();
export const SportsClubContext = createContext();
export const TrainerContext = createContext();

const SCAdminStack = React.lazy(() => import('./src/navigation/SCAdminStack'));

const noRoleSpecificData = (data) => {
  return data === null || data === '';
}

const AuthStackNav = createStackNavigator();
const AuthStack = () => {
  return (
    <AuthStackNav.Navigator
      initialRouteName={Resources.Screens.Welcome}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <AuthStackNav.Screen name={Resources.Screens.Welcome} component={Welcome} />
      <AuthStackNav.Screen name={Resources.Screens.Register} component={Register} />
    </AuthStackNav.Navigator>
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
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar backgroundColor={Resources.Colors.BackgroundColorBlack} />
            <PaperProvider theme={{...MD3DarkTheme, DarkTheme}}>
              <NavigationContainer theme={DarkTheme}>
                {userData === null && <AuthStack />}
                {userData !== null && userData?.role === 'SportsClubAdmin' && (
                  <Suspense fallback={LoadingScreen()}>
                    <SCAdminStack roleSpecificData={roleSpecificData} />
                  </Suspense>
                )}
                {userData !== null && userData?.role === 'Trainer' && (
                  <Suspense fallback={LoadingScreen()}>
                    <TrainerStack roleSpecificData={roleSpecificData} />
                  </Suspense>
                )}
              </NavigationContainer>
            </PaperProvider>
          </SafeAreaView>
        </SafeAreaProvider>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Resources.Colors.BackgroundColorBlack,
  },
});

export default App;
