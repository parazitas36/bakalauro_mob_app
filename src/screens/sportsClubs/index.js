import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, RegularUserContext, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import SportsClubCard from '../../components/sportsClubCard';
import { useTheme } from '@rneui/themed';

const SportsClubs = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;

  const {theme} = useTheme();

  const [sportsClubs, setSportsClubs] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [userData.id]}).SportsClub_Endpoint+`all/${1}`,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data)
        setSportsClubs(data);
      } else {
        setSportsClubs([]);
      }
    })();

  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
      {sportsClubs === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles({theme: theme}).heading}>{'Sports Clubs'}</Animated.Text>
          {sportsClubs?.length === 0 ? <Text style={styles({theme: theme}).text}>{'No sports clubs'}</Text> :
          <FlatList data={sportsClubs} renderItem={({item}) => <SportsClubCard data={item} navigation={navigation} token={token} theme={theme}/>}/>}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default SportsClubs;
