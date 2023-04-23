import {Text, ToastAndroid, View} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import {useContext} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useState, useMemo} from 'react';
import Resources from '../../Resources';
import {ScrollView} from 'react-native';
import {useEffect} from 'react';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import TrainingPlanWeeklyExercises from '../../components/trainingPlanWeeklyExercises';
import CustomButton from '../../components/customButton';
import { PostCall } from '../../api/PostCall';


const TrainingPlanScreen = ({navigation, route}) => {
  const trainingPlanId = route?.params?.trainingPlanId;

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {exercisesState} = useContext(TrainerContext);
  const [exercises, setExercises] = exercisesState;

  const [trainingPlanData, setTrainingPlanData] = useState(null)

  const ExercisesCount = useMemo(() => {
    // if(weeks?.length > 0) {
    //   var counter = 0;
    //   for(var i = 0; i < weeks.length; i++){
    //     counter += weeks[i].Days.Monday.length;
    //     counter += weeks[i].Days.Tuesday.length;
    //     counter += weeks[i].Days.Wednesday.length;
    //     counter += weeks[i].Days.Thursday.length;
    //     counter += weeks[i].Days.Friday.length;
    //     counter += weeks[i].Days.Saturday.length;
    //     counter += weeks[i].Days.Sunday.length;
    //   }

    //   return counter;
    // }

    return 0;
  }, [])

  const TargetedMuscleGroups = useMemo(() => {
    // if(weeks?.length > 0) {
    //   const muscleGroups = new Set()
    //   const exerciseIds = new Set()
    //   for(var i = 0; i < weeks.length; i++){
    //     weeks[i].Days.Monday.forEach(x => exerciseIds.add(x?.Id));
    //     weeks[i].Days.Tuesday.forEach(x => exerciseIds.add(x?.Id));
    //     weeks[i].Days.Wednesday.forEach(x => exerciseIds.add(x?.Id));
    //     weeks[i].Days.Thursday.forEach(x => exerciseIds.add(x?.Id));
    //     weeks[i].Days.Friday.forEach(x => exerciseIds.add(x?.Id));
    //     weeks[i].Days.Saturday.forEach(x => exerciseIds.add(x?.Id));
    //     weeks[i].Days.Sunday.forEach(x => exerciseIds.add(x?.Id));
    //   }
    //   exerciseIds.forEach(id => 
    //     muscleGroups.add(exercises
    //       .filter(e => 
    //         e.id === id)[0]
    //         .muscleGroups
    //   ));
      
    //   const arr = []
    //   muscleGroups.forEach(x => arr.push(x))
    //   return arr;
    // }

    return [];
  }, [])

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [trainingPlanId]}).TrainingPlanById,
        token: token,
      });

      console.log(resp)

      if(resp.status === 200) {
        const data = await resp.json();
        console.log(data)
        setTrainingPlanData(data)
      }
      
    })();
  }, []);



  return (
    <Suspense fallback={LoadingScreen()}>
        {trainingPlanData === null ? <LoadingScreen /> : 
          <ScrollView
            style={styles.view}
            contentContainerStyle={styles.viewContent}>
              <Text style={styles.heading}>{trainingPlanData.name}</Text>
            {trainingPlanData?.weeklyPlan?.map((x, i) => {
              return (
                <TrainingPlanWeeklyExercises
                  key={i}
                  planWeek={x.week}
                  navigation={navigation}
                  fetchedWeeklyPlan={trainingPlanData?.weeklyPlan}
                  editMode={false}
                />
              );
            })}
          </ScrollView>
        }
    </Suspense>
  );
};

export default TrainingPlanScreen;
