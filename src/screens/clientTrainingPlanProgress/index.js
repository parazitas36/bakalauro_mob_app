import React, {useEffect, useState} from 'react';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import { useContext } from 'react';
import { LoadingScreen, UserContext } from '../../../App';
import { Suspense } from 'react';
import Animated from 'react-native-reanimated';
import { FlatList } from 'react-native';
import ExerciseProgress from '../../components/exerciseProgress';
import { useTheme } from '@rneui/themed';

const ClientTrainingPlanProgress = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const trainingPlanId = route?.params?.trainingPlanId;
  const [exercisesProgress, setExercisesProgress] = useState(null);

  const {theme} = useTheme()

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [trainingPlanId]}).TrainingPlanProgressById,
        token: token
      });

      if (resp.status === 200) {
        const data  = await resp.json();
        setExercisesProgress(data);
      } else {
        setExercisesProgress([])
      }

    })();
  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
        <Animated.View style={{flex: 1}}>
            {exercisesProgress === null ? <LoadingScreen/>
            : <FlatList data={exercisesProgress} renderItem={({item}) => {
                return <ExerciseProgress data={item} theme={theme}/>
            }} />}
        </Animated.View>
    </Suspense>
  );
};

export default ClientTrainingPlanProgress;
