import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import TrainerCard from '../../components/trainerCard';
import { useTheme } from '@rneui/themed';

const Trainers = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const [trainers, setTrainers] = useState(null)

  const sportsClubId = route?.params?.sportsClubId ?? null;
  const facilityId = route?.params?.facilityId ?? null;

  const GetApiCall = () => {
    if (sportsClubId !== null) {
      return ApiConstants({ids: [sportsClubId]}).GetSportsClubTrainers
    } else if (facilityId !== null) {
      return ApiConstants({ids: [sportsClubId]}).GetFacilityTrainers
    }
    return ApiConstants({ids: [userData.id]}).Trainers;
  }

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: GetApiCall(),
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data)
        setTrainers(data)
      } else {
        setTrainers([])
      }
    })();

  }, []);

  const Trainer = ({key, data, navigation, theme}) => {
    return <TrainerCard key={key} data={data} navigation={navigation} theme={theme}/>
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      {trainers === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles({theme: theme}).heading}>Trainers</Animated.Text>
          {trainers?.length === 0 ? <Text style={styles({theme: theme}).text}>No trainers</Text> :
          <FlatList data={trainers} renderItem={({item, index}) => <Trainer key={index} data={item} navigation={navigation} theme={theme}/>}/>}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Trainers;
