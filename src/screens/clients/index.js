import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeInLeft, FadeOutUp} from 'react-native-reanimated';
import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { FlatList } from 'react-native';
import { Button, ListItem, Text, useTheme } from '@rneui/themed';
import ClientCard from '../../components/clientCard';
import {scale} from 'react-native-size-matters'

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
            return (
              <ListItem.Swipeable
                leftWidth={scale(50)}
                minSlideWidth={scale(10)}
                rightWidth={0}
                leftContent={() => (
                  <Animated.View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    entering={FadeInLeft.delay(600)}>
                    <Button
                      containerStyle={{
                        justifyContent: 'center',
                      }}
                      type="clear"
                      icon={{name: 'weight', type: 'font-awesome-5', color: theme.colors.black}}
                      onPress={() => {
                        navigation.navigate({
                          name: 'ClientBodyMeasurementsProgress',
                          params: {clientId: item.id},
                        });
                      }}
                    />
                  </Animated.View>
                )}>
                <ClientCard data={item} key={index} theme={theme} navigation={navigation} />
              </ListItem.Swipeable>
            )
          }}/>}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Clients;
