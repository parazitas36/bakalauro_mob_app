import {Text} from 'react-native';
import React, {useContext, useState, useEffect, Suspense} from 'react';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import { LoadingScreen, SportsClubContext, UserContext } from '../../../App';
import { ApiConstants } from '../../api/ApiConstants';
import { GetCall } from '../../api/GetCall';
import styles from './styles';
import Resources from '../../Resources';
import CustomButton from '../../components/customButton';
import FacilityCard from '../../components/facilityCard';
import { FAB, useTheme } from '@rneui/themed';
import { verticalScale } from 'react-native-size-matters';

const Facilities = ({navigation, sportsClubId = null}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState

  const {theme} = useTheme();

  const [facilities, setFacilities] = useState(null)
  const [sportsClubName, setSportsClubName] = useState(null)

  if (userData.role === 'SportsClubAdmin') {
    const {reloadFacilitiesState} = useContext(SportsClubContext)
    const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;

    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants({ids: [sportsClubId ?? roleSpecificData.id]}).SportsClubFacilities,
          token: token,
        });
  
        if (resp.status === 200) {
          const result = await resp.json();
          setSportsClubName(result.sportsClubName)
          setFacilities(result.facilities)
        } else {
          setSportsClubName(Resources.Texts.UnknownClub)
          setFacilities([])
        }
        setReloadFacilities(false)
      })();
    }, [reloadFacilities === true])
  } else {
    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants({ids: [sportsClubId ?? roleSpecificData.id]}).SportsClubFacilities,
          token: token,
        });
  
        if (resp.status === 200) {
          const result = await resp.json();
          setSportsClubName(result.sportsClubName)
          setFacilities(result.facilities)
        } else {
          setSportsClubName(Resources.Texts.UnknownClub)
          setFacilities([])
        }
      })();
    }, [])
  }
  

  return (
    <Suspense fallback={LoadingScreen()}>
      <>
        {facilities === null ? LoadingScreen() :
        <Animated.ScrollView
          style={styles({theme: theme}).view}
          contentContainerStyle={styles({theme: theme}).viewContent} 
          entering={FadeInLeft.delay(300)} 
          exiting={FadeOutLeft}>
          <Text style={styles({theme: theme}).heading}>{`${sportsClubName} ${Resources.Texts.Facilities.toLowerCase()} (${facilities?.length ?? 0})`}</Text>
          {(facilities.length === 0 ? <Text style={styles({theme: theme}).text}>{Resources.Texts.NoFacilities}</Text>
          : facilities.map((facility) => {
            return <FacilityCard key={facility.id} navigation={navigation} facility={facility} sportsClubName={sportsClubName} theme={theme}/>
          }))}
          
        </Animated.ScrollView>}
        {userData.role === 'SportsClubAdmin' && sportsClubId === null &&
        <FAB
          icon={{name: 'add', color: Resources.Colors.IconsColor}}
          color={theme.colors.primary}
          size="md"
          placement="right"
          onPress={() =>
            navigation.navigate(Resources.Screens.CreateFacility)
          }
        />}
      </>
    </Suspense>
  );
};

export default Facilities;
