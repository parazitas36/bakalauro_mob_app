import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, Suspense, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Resources from './src/Resources';

import Register from './src/screens/register';
import Welcome from './src/screens/welcome';
import Loading from './src/screens/loading';
import { createTheme, ThemeProvider, useTheme, useThemeMode } from '@rneui/themed';
import { View } from 'react-native';

export const LoadingScreen = () => <Loading />
export const UserContext = createContext();
export const SportsClubContext = createContext();
export const TrainerContext = createContext();
export const RegularUserContext = createContext();

const SCAdminStack = React.lazy(() => import('./src/navigation/SCAdminStack'));
const UserStack = React.lazy(() => import('./src/navigation/UserStack'));
const TrainerStack = React.lazy(() => import('./src/navigation/TrainerStack'));

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

const theme = createTheme({
  mode: 'dark'
})

const ColorScheme = ({ children }) => {
  const { theme } = useTheme();
  const { setMode } = useThemeMode();

  console.log('theme: ', theme)

  React.useEffect(() => {
    setMode(theme.mode);
  }, [theme.mode]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar backgroundColor={theme.colors.white} barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>{children}</View>
    </SafeAreaView>
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

  const colors = theme.mode === 'dark' ? theme.darkColors : theme.lightColors

  const MyTheme = {
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.black,
      border: colors.black,
      notification: colors.error,
    },
  };

  return (
    <UserContext.Provider value={userContextData}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
            <ColorScheme>
              <NavigationContainer theme={MyTheme}>
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
                 {userData !== null && userData?.role === 'User' && (
                  <Suspense fallback={LoadingScreen()}>
                    <UserStack roleSpecificData={roleSpecificData} />
                  </Suspense>
                )}
              </NavigationContainer>
            </ColorScheme>
        </SafeAreaProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
