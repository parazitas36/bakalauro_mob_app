import {View, Text} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Resources from '../../Resources';
import {scale} from 'react-native-size-matters';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import { LoadingScreen, UserContext } from '../../../App';
import { useTheme } from '@rneui/themed';
import { useContext } from 'react';
import { LineChart } from 'react-native-chart-kit';

const TrainerHome = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const Logout = () => {
    setToken(null);
    setUserData(null);
    setRoleSpecificData(null);
  };

  // return (
  //   <View>
  //     <LineChart
  //   data={{
  //     labels: [' jan', ' feb', ' mar', ' apr', ' june', ' july'],
  //     datasets: [
                          
  //                 {
  //                             data: [10, -4, 6, -8, 80, 20, 29, null],
  //                             strokeWidth: 2,
  //                             color: () => theme.colors.greyOutline
  //                 },
  //                 {
  //                             data: [5,8,6,9,8,2,-2],
  //                             strokeWidth: 2,
  //                             color: () => theme.colors.warning
  //                 },
  //             ],
  //     legend: ['car', 'bike'],
  //     }}
  //   width={scale(300)} // from react-native
  //   height={scale(200)}
  //   chartConfig={{
  //     backgroundColor: "#e26a00",
  //     backgroundGradientFrom: theme.colors.primary,
  //     backgroundGradientTo: theme.colors.secondary,
  //     color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
  //     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //     style: {
  //       borderRadius: 16
  //     },
  //     propsForDots: {
  //       r: "6",
  //     },
  //   }}
  //   style={{
  //     marginVertical: 8,
  //     borderRadius: 16
  //   }}
  //   fromZero={true}
  // />
  //   </View>
  // )

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        entering={FadeInLeft}
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).viewContainer}>
        <View style={styles({theme: theme}).flexRow}>
          <CustomButtonWithIcon
            icon={() => (
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="My forms"
            styles={styles({theme: theme})}
            onPress={() => navigation.navigate('TrainerMyForms')}
          />
          <CustomButtonWithIcon
            icon={() => (
              <FontAwesome
                name="wpforms"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="Client forms"
            styles={styles({theme: theme})}
            onPress={() => navigation.navigate('UserForms')}
          />
        </View>
        <View style={styles({theme: theme}).flexRow}>
          <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="person"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="My profile"
            styles={styles({theme: theme})}
          />
          <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="people"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="My clients"
            styles={styles({theme: theme})}
            onPress={() => navigation.navigate('Clients')}
          />
        </View>
        <View style={styles({theme: theme}).flexRow}>
          <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="exit"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            onPress={() => Logout()}
            btnText="Logout"
            styles={styles({theme: theme})}
          />
        </View>
      </Animated.ScrollView>
    </Suspense>
  );
};

export default TrainerHome;
