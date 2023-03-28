import {Text} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import { SportsClubContext, UserContext } from '../../../App';
import { ApiConstants } from '../../api/ApiConstants';
import { GetCall } from '../../api/GetCall';
import styles from './styles';

const Facilities = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState

  const {reloadFacilitiesState} = useContext(SportsClubContext)
  const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;

  const [facilities, setFacilities] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [roleSpecificData.id]}).SportsClubFacilities,
        token: token,
      });

      if (resp.status === 200) {
        const result = await resp.json();
        setFacilities(result)
      } else {
        setFacilities([])
      }
      setReloadFacilities(false)
    })();
  }, [reloadFacilities === true])

  return (
    <Animated.View style={styles.view} entering={FadeInLeft} exiting={FadeOutLeft}>
      <Text style={styles.text}>Facilities</Text>
      {facilities === null ? <Text style={styles.text}>Loading</Text>
      : (facilities.length === 0 ? <Text style={styles.text}>No facilities</Text>
      : facilities.map((facility) => {
        return (
        <Text key={facility.id} style={styles.text}>
          {facility.id} 
        </Text>)
      }))}
      
    </Animated.View>
  );
};

export default Facilities;
