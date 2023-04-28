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

const SCAdminHome = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  console.log(roleSpecificData);

  const ValueIsNotEmpty = (value) => {
    return value !== undefined && value !== null && value !== '' && value !== 'null'
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        entering={FadeInLeft}
        style={styles.view}
        contentContainerStyle={styles.viewContainer}>
        <View style={styles.sportsClubView}>
          <Text style={styles.heading}>{roleSpecificData.name}</Text>
          <View style={styles.flexRow}>
            <View style={styles.imageView}>
              <Image
                source={{
                  uri: `${ApiConstants().Exercise_Endpoint}file/${String(
                    roleSpecificData.logoUri,
                  )}`,
                  headers: {Authorization: `Bearer ${token}`},
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoView}>
              <Text style={styles.btnText}>
                Facilities: {roleSpecificData.facilitiesCount}
              </Text>
              <Text style={styles.btnText}>
                Trainers: {roleSpecificData.trainersCount}
              </Text>
              {ValueIsNotEmpty(roleSpecificData.email) ? <Text style={styles.btnText}>
                Email: {roleSpecificData.email}
              </Text> : null}
              {ValueIsNotEmpty(roleSpecificData.phoneNumber)  ? <Text style={styles.btnText}>
                Phone: {roleSpecificData.phoneNumber}
              </Text> : null}
            </View>
          </View>
        </View>
        <View style={styles.flexRow}>
          <CustomButtonWithIcon
            icon={() => (
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                color={Resources.Colors.IconsColor}
                size={scale(20)}
              />
            )}
            btnText="My forms"
            styles={styles}
          />
          <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="people"
                color={Resources.Colors.IconsColor}
                size={scale(20)}
              />
            )}
            onPress={() => navigation.navigate('Trainers')}
            btnText="Trainers"
            styles={styles}
          />
        </View>
        <View style={styles.flexRow}>
          
        </View>
      </Animated.ScrollView>
    </Suspense>
  );
};

export default SCAdminHome;
