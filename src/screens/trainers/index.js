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

const Trainers = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const [trainers, setTrainers] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [userData.id]}).Trainers,
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
          <FlatList data={trainers} renderItem={({item, index}) => <TrainerCard key={index} data={item} navigation={navigation} theme={theme}/>}/>}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Trainers;
