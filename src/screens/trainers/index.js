import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeInLeft, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import TrainerCard from '../../components/trainerCard';
import { Button, ListItem, useTheme } from '@rneui/themed';
import { PostCall } from '../../api/PostCall';
import { scale } from 'react-native-size-matters';
import { ToastAndroid } from 'react-native';

const Trainers = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const [trainers, setTrainers] = useState(null)

  const sportsClubId = route?.params?.sportsClubId ?? null;
  const facilityId = route?.params?.facilityId ?? null;
  const assignable = route?.params?.assignable ?? false;

  const GetApiCall = () => {
    if (sportsClubId !== null || assignable === true) {
      return ApiConstants({ids: [sportsClubId]}).GetSportsClubTrainers
    } else if (facilityId !== null) {
      return ApiConstants({ids: [facilityId]}).GetFacilityTrainers
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
        setTrainers(data)
      } else {
        setTrainers([])
      }
    })();

  }, []);

  const AssignToFacility = async(id) => {
    const resp = await PostCall({
      endpoint: ApiConstants({ids: [Number(facilityId), Number(id)]}).AssignTrainerToFacility,
      token: token,
      body: null
    })

    if (resp.status === 201) {
      ToastAndroid.show(
        'Trainer was successfully assigned!',
        ToastAndroid.SHORT
      )
    } else {
      ToastAndroid.show(
        'Trainer is already assigned!',
        ToastAndroid.SHORT
      )
    }

    navigation.goBack();
  }

  const Trainer = ({key, data, navigation, theme}) => {
    if (assignable === true) {
      return (
      <ListItem.Swipeable
          key={key}
          leftWidth={scale(50)}
          rightWidth={0}
          minSlideWidth={scale(10)}
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
                icon={{name: 'check', type: 'font-awesome-5', color: theme.colors.black}}
                onPress={async() => await AssignToFacility(data.id)}
              />
            </Animated.View>
          )}>
            <TrainerCard data={data} navigation={navigation} theme={theme}/>
      </ListItem.Swipeable>
      )
    }
    return <TrainerCard key={key} data={data} navigation={navigation} theme={theme} isClubTrainer={sportsClubId !== null}/>
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
          {trainers?.length === 0 ? <Text style={styles({theme: theme}).text}>No trainers found</Text> :
          <FlatList data={trainers} renderItem={({item, index}) => <Trainer key={index} data={item} navigation={navigation} theme={theme}/>}/>}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Trainers;
