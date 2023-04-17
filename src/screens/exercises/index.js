import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import ExerciseCard from '../../components/exerciseCard';
import { FAB } from '@rneui/base';

const Exercises = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const {refreshExercisesState} = useContext(TrainerContext)
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [refreshExercises, setRefreshExercises] = refreshExercisesState

  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [userData.id]}).TrainersExercises,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setExercises(data);
      } else {
        setExercises([]);
      }
    })();

    setRefreshExercises(false)
  }, [refreshExercises === false]);

  return (
    <Suspense fallback={LoadingScreen()}>
      {exercises === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles.view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles.heading}>{Resources.Texts.Exercises}</Animated.Text>
          {exercises?.length === 0 ? <Text style={styles.text}>{Resources.Texts.NoExercises}</Text> :
          <FlatList data={exercises} renderItem={({item}) => ExerciseCard({data: item, navigation: navigation})}/>}
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            size='small'
            placement='right'
            onPress={() => navigation.navigate(Resources.Screens.CreateExercise)}/>
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Exercises;
