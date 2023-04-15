import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import ExerciseCard from '../../components/exerciseCard';
import { FAB } from '@rneui/base';

const Exercises = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [userData.id]}).TrainersExercises,
        token: token,
      });
      console.log(resp);
      if (resp.status === 200) {
        const data = await resp.json();
        setExercises(data);
      } else {
        setExercises([]);
      }
    })();
  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
      {exercises === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles.view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles.heading}>Exercises</Animated.Text>
          {exercises?.length === 0 ? <Text style={styles.text}>No exercises</Text> :
          <FlatList data={exercises} renderItem={ExerciseCard}/>}
          <FAB
            icon={{name: 'add', color: 'white'}}
            size='small'
            placement='right'
            onPress={() => navigation.navigate('CreateExercise')}/>
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Exercises;
