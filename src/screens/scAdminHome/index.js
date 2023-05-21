import {Suspense, useContext} from 'react';
import {View} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {LoadingScreen, UserContext} from '../../../App';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import Resources from '../../Resources';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale} from 'react-native-size-matters';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {Image} from 'react-native';
import { Card, Icon, Text, useTheme } from '@rneui/themed';

const SCAdminHome = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  console.log(roleSpecificData);
  
  const {theme} = useTheme();

  const Logout = () => {
    setToken(null);
    setUserData(null);
    setRoleSpecificData(null);
  };

  const ValueIsNotEmpty = (value) => {
    return value !== undefined && value !== null && value !== '' && value !== 'null'
  }
  
  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        entering={FadeInLeft}
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).viewContainer}>
        <Card containerStyle={styles({theme: theme}).sportsClubView}>
          <Card.Title>{roleSpecificData.name}</Card.Title>
          <Card.Divider/>
          <View style={{flexDirection: 'row'}}>
              <View style={styles({theme: theme}).imageView}>
                <Image
                  source={{
                    uri: `${ApiConstants().GetFile}${String(
                      roleSpecificData.logoUri,
                    )}`,
                    headers: {Authorization: `Bearer ${token}`},
                  }}
                  style={styles({theme: theme}).image}
                />
              </View>
              <View style={styles({theme: theme}).infoView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles({theme: theme}).text}>
                    Facilities: {roleSpecificData.facilitiesCount}
                  </Text>
                  <Icon name="city" type="font-awesome-5" color={theme.colors.black} size={verticalScale(16)} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles({theme: theme}).text}>Trainers: {roleSpecificData.trainersCount}</Text>
                  <Icon name="people-circle-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {ValueIsNotEmpty(roleSpecificData.email) ? 
                  <>
                    <Text style={styles({theme: theme}).text}>{roleSpecificData.email}</Text>
                    <Icon name="mail-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
                  </> : null}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {ValueIsNotEmpty(roleSpecificData.phoneNumber)  ? 
                  <>
                    <Text style={styles({theme: theme}).text}>{roleSpecificData.phoneNumber}</Text> 
                    <Icon name="call-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
                  </> : null}
                </View>
              </View>
          </View>
        </Card>
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
        <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="people"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            onPress={() => navigation.navigate({name: 'Trainers', params: {sportsClubId: roleSpecificData.id}})}
            btnText="Trainers"
            styles={styles({theme: theme})}
          />
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
  )
};

export default SCAdminHome;
