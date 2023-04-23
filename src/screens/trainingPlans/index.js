import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {Text} from 'react-native';
import {FlatList} from 'react-native';
import {FAB} from '@rneui/base';
import TrainingPlan from '../../components/trainingPlan';

const TrainingPlans = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const {refreshTrainingPlansState, exercisesState} = useContext(TrainerContext);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = refreshTrainingPlansState;
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [trainingPlans, setTrainingPlans] = useState(null);
  const [exercises, setExercises] = exercisesState;

  useEffect(() => {
    if(exercises === null) {
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
    }

    (async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants({ids: [userData.id]}).TrainingPlansShort}`,
        token: token,
      });

      console.log(resp);

      if (resp.status === 200) {
        const data = await resp.json();
        setTrainingPlans(data);
      } else {
        setTrainingPlans([]);
      }
    })();

    setRefreshTrainingPlans(false);
  }, [refreshTrainingPlans === true]);

  return (
    <Suspense fallback={LoadingScreen()}>
      {trainingPlans === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles.view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles.heading}>
            {Resources.Texts.TrainingPlans}
          </Animated.Text>
          {trainingPlans.length === 0 ? 
            <Text style={styles.text}>{Resources.Texts.NoTrainingPlans}</Text>
          : <FlatList
              data={trainingPlans}
              renderItem={({item, index}) => {
                console.log(index);
                return (
                  <TrainingPlan
                    key={index}
                    trainingPlan={item}
                    navigation={navigation}
                  />
                );
              }}
            />
          }
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            size="small"
            placement="right"
            onPress={() =>
              navigation.navigate(Resources.Screens.CreateTrainingPlan)
            }
          />
        </Animated.View>
      )}
    </Suspense>
  );
};

export default TrainingPlans;
