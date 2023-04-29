import {Suspense, useContext} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {LoadingScreen, UserContext} from '../../../App';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import Resources from '../../Resources';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {Image} from 'react-native';
import { useTheme } from '@rneui/themed';

const SCAdminHome = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  console.log(roleSpecificData);
  
  const {theme} = useTheme();

  const ValueIsNotEmpty = (value) => {
    return value !== undefined && value !== null && value !== '' && value !== 'null'
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        entering={FadeInLeft}
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).viewContainer}>
        <View style={styles({theme: theme}).sportsClubView}>
          <Text style={styles({theme: theme}).heading}>{roleSpecificData.name}</Text>
          <View style={styles({theme: theme}).flexRow}>
            <View style={styles({theme: theme}).imageView}>
              <Image
                source={{
                  uri: `${ApiConstants().Exercise_Endpoint}file/${String(
                    roleSpecificData.logoUri,
                  )}`,
                  headers: {Authorization: `Bearer ${token}`},
                }}
                style={styles({theme: theme}).image}
              />
            </View>
            <View style={styles({theme: theme}).infoView}>
              <Text style={styles({theme: theme}).text}>
                Facilities: {roleSpecificData.facilitiesCount}
              </Text>
              <Text style={styles({theme: theme}).text}>
                Trainers: {roleSpecificData.trainersCount}
              </Text>
              {ValueIsNotEmpty(roleSpecificData.email) ? <Text style={styles({theme: theme}).text}>
                Email: {roleSpecificData.email}
              </Text> : null}
              {ValueIsNotEmpty(roleSpecificData.phoneNumber)  ? <Text style={styles({theme: theme}).text}>
                Phone: {roleSpecificData.phoneNumber}
              </Text> : null}
            </View>
          </View>
        </View>
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
          />
          <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="people"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            onPress={() => navigation.navigate('Trainers')}
            btnText="Trainers"
            styles={styles({theme: theme})}
          />
        </View>
        <View style={styles({theme: theme}).flexRow}>
          
        </View>
      </Animated.ScrollView>
    </Suspense>
  );
};

export default SCAdminHome;
