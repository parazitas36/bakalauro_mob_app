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
import { useTheme } from '@rneui/themed';

const TrainingPlans = ({navigation, selectView = false, setSelectedTrainingPlan}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const {refreshTrainingPlansState, exercisesState} = useContext(TrainerContext);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = refreshTrainingPlansState;
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

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


      if (resp.status === 200) {
        const data = await resp.json();

        if (selectView === true) {
          const filteredData = data.filter(x => x.assignedTo === null);
          setTrainingPlans(filteredData)
        } else {
          setTrainingPlans(data);
        }
      } else {
        setTrainingPlans([]);
      }
    })();

    setRefreshTrainingPlans(false);
  }, [refreshTrainingPlans === true]);

  if (selectView === true) {
    return (
      <Suspense fallback={LoadingScreen()}>
        {trainingPlans === null ? (
          <LoadingScreen />
        ) : (
          <Animated.View
            style={styles({theme}).view}
            entering={FadeInDown.delay(100)}
            exiting={FadeOutUp}>
            <Animated.Text style={styles({theme}).heading}>
              {Resources.Texts.TrainingPlans}
            </Animated.Text>
            {trainingPlans.length === 0 ? 
              <Text style={styles({theme}).text}>{Resources.Texts.NoTrainingPlans}</Text>
            : <FlatList
                data={trainingPlans}
                renderItem={({item, index}) => {
                  return (
                    <TrainingPlan
                      key={index}
                      trainingPlan={item}
                      navigation={navigation}
                      theme={theme}
                      setSelectedTrainingPlan={setSelectedTrainingPlan}
                      selectView={true}
                    />
                  );
                }}
              />
            }
          </Animated.View>
        )}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      {trainingPlans === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles({theme}).view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles({theme}).heading}>
            {Resources.Texts.TrainingPlans}
          </Animated.Text>
          {trainingPlans.length === 0 ? 
            <Text style={styles({theme}).text}>{Resources.Texts.NoTrainingPlans}</Text>
          : <FlatList
              data={trainingPlans}
              renderItem={({item, index}) => {
                return (
                  <TrainingPlan
                    key={index}
                    trainingPlan={item}
                    navigation={navigation}
                    theme={theme}
                  />
                );
              }}
            />
          }
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            color={theme.colors.primary}
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
