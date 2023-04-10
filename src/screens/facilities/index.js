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

const Facilities = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState

  const {reloadFacilitiesState} = useContext(SportsClubContext)
  const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;

  const [facilities, setFacilities] = useState(null)
  const [sportsClubName, setSportsClubName] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [roleSpecificData.id]}).SportsClubFacilities,
        token: token,
      });

      if (resp.status === 200) {
        const result = await resp.json();
        setSportsClubName(result.sportsClubName)
        setFacilities(result.facilities)
      } else {
        setSportsClubName('Unknown club')
        setFacilities([])
      }
      setReloadFacilities(false)
    })();
  }, [reloadFacilities === true])

  return (
    <Suspense fallback={LoadingScreen()}>
      {facilities === null ? LoadingScreen() :
      <Animated.ScrollView
        style={styles.view}
        contentContainerStyle={styles.viewContent} 
        entering={FadeInLeft.delay(300)} 
        exiting={FadeOutLeft}>
        <Text style={styles.heading}>{`${sportsClubName} facilities (${facilities?.length ?? 0})`}</Text>
        {(facilities.length === 0 ? <Text style={styles.text}>{Resources.Texts.NoFacilities}</Text>
        : facilities.map((facility) => {
          return <FacilityCard key={facility.id} navigation={navigation} facility={facility} sportsClubName={sportsClubName}/>
        }))}
        {facilities !== null ? (
          <CustomButton
            btnText={Resources.ButtonTexts.AddNewBtnText}
            styles={styles}
            onPress={() => navigation.navigate(Resources.Screens.CreateFacility)}
          />
        ) : null}
      </Animated.ScrollView>}
    </Suspense>
  );
};

export default Facilities;
