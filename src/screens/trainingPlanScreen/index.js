import {Text} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import {LoadingScreen, RegularUserContext, TrainerContext, UserContext} from '../../../App';
import {useContext} from 'react';
import {useState, useMemo} from 'react';
import Resources from '../../Resources';
import {ScrollView} from 'react-native';
import {useEffect} from 'react';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import TrainingPlanWeeklyExercises from '../../components/trainingPlanWeeklyExercises';
import { PostCall } from '../../api/PostCall';
import { FAB, useTheme } from '@rneui/themed';
import Animated from 'react-native-reanimated';


const TrainingPlanScreen = ({navigation, route}) => {
  const trainingPlanId = route?.params?.trainingPlanId;
  const clientId = route?.params?.clientId ?? null

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const trainerContext = useContext(TrainerContext);

  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [trainingPlanData, setTrainingPlanData] = useState(null)

  const {theme} = useTheme();

  const GoToEditMode = () => {
    if (userData.role === 'Trainer') {
      const [weeks, setWeeks] = trainerContext.weeksState;

      setWeeks(null);
      navigation.navigate({
        name: 'EditTrainingPlan',
        params: {trainingPlanData: trainingPlanData}
      })
    }
  }

  if (userData.role === 'User') {
    const {reloadWorkoutState} = useContext(RegularUserContext);
    const [reloadWorkout, setReloadWorkout] = reloadWorkoutState;

    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants({ids: [trainingPlanId]}).TrainingPlanById,
          token: token,
        });
  
        if(resp.status === 200) {
          const data = await resp.json();
          setTrainingPlanData(data)
        }
        
      })();
  
      setReloadWorkout(false);
    }, [reloadWorkout === true]);
  } else if (clientId !== null) {
    const [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode] = trainerContext.refreshTrainingPlanInEditModeState;
    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants({ids: [clientId, trainingPlanId]}).ClientTrainingPlanById,
          token: token,
        });
  
        if(resp.status === 200) {
          const data = await resp.json();
          setTrainingPlanData(data)
        }
      })();

      if(setRefreshTrainingPlanInEditMode){
        setRefreshTrainingPlanInEditMode(false)
      }
    }, [refreshTrainingPlanInEditMode === true]);
  } else {
    const [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode] = trainerContext.refreshTrainingPlanInEditModeState;
    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants({ids: [trainingPlanId]}).TrainingPlanById,
          token: token,
        });
  
        if(resp.status === 200) {
          const data = await resp.json();
          setTrainingPlanData(data)
        }
      })();
      if(setRefreshTrainingPlanInEditMode){
        setRefreshTrainingPlanInEditMode(false)
      }
    }, [refreshTrainingPlanInEditMode === true]);
  }

  return (
    <Suspense fallback={LoadingScreen()}>
        {trainingPlanData === null ? <LoadingScreen /> : 
          <Animated.View style={styles({theme: theme}).view}>
            <ScrollView
              style={styles({theme: theme}).view}
              contentContainerStyle={styles({theme: theme}).viewContent}>
                <Text style={styles({theme: theme}).heading}>{trainingPlanData.name}</Text>
              {trainingPlanData?.weeklyPlan?.map((x, i) => {
                return (
                  <TrainingPlanWeeklyExercises
                    key={i}
                    planWeek={x.week}
                    navigation={navigation}
                    fetchedWeeklyPlan={trainingPlanData?.weeklyPlan}
                    editMode={false}
                    theme={theme}
                    clientId={clientId}
                  />
                );
              })}
              
            </ScrollView>
            {userData.role === 'Trainer' && <FAB
                icon={{name: 'edit', color: Resources.Colors.IconsColor}}
                color={theme.colors.primary}
                size="small"
                placement="right"
                onPress={() => GoToEditMode()}
            />}
          </Animated.View>
        }
    </Suspense>
  );
};

export default TrainingPlanScreen;
