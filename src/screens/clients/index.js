import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { FlatList } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import ClientCard from '../../components/clientCard';

const Clients = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [clients, setClients] = useState(null);

  const {theme} = useTheme()

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants().Clients,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data)
        setClients(data);
      } else {
        setClients([]);
      }
    })();

  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
      {clients === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles({theme: theme}).heading}>Clients</Animated.Text>
          {clients?.length === 0 ? <Text style={styles({theme: theme}).text}>You have no clients</Text> :
          <FlatList data={clients} renderItem={({item, index}) => { 
            return <ClientCard data={item} key={index} theme={theme} navigation={navigation} />
          }}/>}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Clients;
