import {Text} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import {LoadingScreen, RegularUserContext, UserContext} from '../../../App';
import {useContext} from 'react';
import {useState, useMemo} from 'react';
import Resources from '../../Resources';
import {ScrollView} from 'react-native';
import {useEffect} from 'react';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import TrainingPlanWeeklyExercises from '../../components/trainingPlanWeeklyExercises';
import { PostCall } from '../../api/PostCall';
import { useTheme } from '@rneui/themed';


const TrainingPlanScreen = ({navigation, route}) => {
  const trainingPlanId = route?.params?.trainingPlanId;
  const clientId = route?.params?.clientId ?? null

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [trainingPlanData, setTrainingPlanData] = useState(null)

  const {theme} = useTheme();

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
    }, []);
  } else {
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
    }, []);
  }

  return (
    <Suspense fallback={LoadingScreen()}>
        {trainingPlanData === null ? <LoadingScreen /> : 
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
        }
    </Suspense>
  );
};

export default TrainingPlanScreen;
