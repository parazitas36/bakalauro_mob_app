import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Resources from '../../Resources';
import { scale } from 'react-native-size-matters';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { useTheme } from '@rneui/themed';
import { useContext } from 'react';
import { UserContext } from '../../../App';

const UserHome = ({navigation}) => {
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

  return (
    <Animated.ScrollView
      entering={FadeInLeft}
      style={styles({theme: theme}).view}
      contentContainerStyle={styles({theme: theme}).viewContainer}>
      <View style={styles({theme: theme}).flexRow}>
        <CustomButtonWithIcon
          icon={() => <MaterialCommunityIcons name="newspaper-variant-outline" color={theme.colors.black} size={scale(20)} />}
          onPress={() => navigation.navigate('UserForms')}
          btnText="My forms"
          styles={styles({theme: theme})}
        />
        <CustomButtonWithIcon
          icon={() => <FontAwesome5 name="weight" color={theme.colors.black} size={scale(20)} />}
          btnText="My body measurements"
          styles={styles({theme: theme})}
        />
      </View>
      <View style={styles({theme: theme}).flexRow}>
      <CustomButtonWithIcon
          icon={() => <Entypo name="sports-club" color={theme.colors.black} size={scale(20)} />}
          btnText="Sports clubs"
          onPress={() => navigation.navigate('SportsClubs')}
          styles={styles({theme: theme})}
        />
        <CustomButtonWithIcon
          icon={() => <Ionicons name="people" color={theme.colors.black} size={scale(20)} />}
          btnText="Trainers"
          onPress={() => navigation.navigate('Trainers')}
          styles={styles({theme: theme})}
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
  );
};

export default UserHome;
