import {ToastAndroid, View} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import {useContext} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useState, useMemo} from 'react';
import Resources from '../../Resources';
import TrainingPlanExercisesInfo from '../../components/trainingPlanExercisesInfo';
import {ScrollView} from 'react-native';
import {createContext} from 'react';
import {useEffect} from 'react';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import TrainingPlanWeeklyExercises from '../../components/trainingPlanWeeklyExercises';
import CustomButton from '../../components/customButton';
import { PostCall } from '../../api/PostCall';
import { Text, useTheme } from '@rneui/themed';
import EditTrainingPlanWeeklyExercises from '../../components/editTrainingPlanWeeklyExercises';

export const EditTrainingPlanContext = createContext();

const EditTrainingPlan = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const {keyState, weeksState, exercisesState, refreshTrainingPlansState, refreshTrainingPlanInEditModeState} = useContext(TrainerContext);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = refreshTrainingPlansState;
  const [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode] = refreshTrainingPlanInEditModeState;
  const [exercises, setExercises] = exercisesState;
  const {theme} = useTheme()
  const [trainingPlanName, setTrainingPlanName] = useState(null);
  const [week, setWeek] = useState(1);
  const [key, setKey] = keyState;
  const [weeks, setWeeks] = weeksState;

  const weekDays = [
    Resources.Days.Monday,
    Resources.Days.Tuesday,
    Resources.Days.Wednesday,
    Resources.Days.Thursday,
    Resources.Days.Friday,
    Resources.Days.Saturday,
    Resources.Days.Sunday
  ]

  const FillData = (data) => {
    // Fill training plan name
    setTrainingPlanName(data.name)

    // Find max week
    var maxWeek = 1;

    data.weeklyPlan.forEach(x => maxWeek = x.week > maxWeek ? x.week : maxWeek);
    setWeek(maxWeek);

    // Fill training plan data
    const weeksData = []

    for(var i = 1; i <= maxWeek; i++) {
      var result = data.weeklyPlan.filter(x => x.week === i).at(0)

      if (result && result !== null) {
        weeksData.push(result)
      } else{
        weeksData.push({
          Week: i,
          Days: {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
          }
        })
      }
    }
    setWeeks(weeksData);
    
    // Find max key
    var maxKey = 0;

    for(var i = 0; i < weeksData.length; i++) {
      const weekData = weeksData[i];
      for(var weekDay of weekDays) {
        const dayData = weekData.days[weekDay.toLowerCase()]
        dayData?.forEach(x => {
          if (x.editKey > maxKey) {
            maxKey = x.editKey
          }
        })
      }
    }
    setKey(maxKey+1)
  }


  const trainingPlanData = route?.params?.trainingPlanData;

  const AddNextWeek = () => {
    setWeeks(prev => [...prev, {
      week: week+1,
      days: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      }
    }]);
    setWeek(prev => prev+1)
  }

  const TargetedMuscleGroups = useMemo(() => {
    if(weeks?.length > 0) {
      const muscleGroups = new Set()
      const exerciseIds = new Set()
      for(var i = 0; i < weeks.length; i++){
        for(var weekDay of weekDays) {
          weeks[i].days[weekDay.toLowerCase()].forEach(x => exerciseIds.add(x?.exerciseId));
        }
      }

      exerciseIds.forEach(id => {
        const parsedMuscleGroups = JSON.parse(exercises.filter(e => e.id === id)[0].muscleGroups)
        parsedMuscleGroups.forEach(x => muscleGroups.add(x))
      });

      const arr = []
      muscleGroups.forEach(x => arr.push(x))
      return arr;
    }

    return [];
  }, [weeks])

  useEffect(() => {
    if (exercises === null) {
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
        endpoint: ApiConstants({ids: [trainingPlanData.trainingPlanId]}).TrainingPlanById,
        token: token,
      });
      if (resp.status === 200) {
        const data = await resp.json();
        FillData(data)
      } else {
        ToastAndroid.show(
          'This training plan doesn\'t exist anymore!',
          ToastAndroid.show
        )
        setRefreshTrainingPlans(true)
        navigation.goBack()
      }
    })()

    setRefreshTrainingPlanInEditMode(false)
  }, [refreshTrainingPlanInEditMode === true]);

  const contextData = {
    weekState: [week, setWeek],
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <EditTrainingPlanContext.Provider value={contextData}>
        {exercises === null || weeks === null ? <LoadingScreen /> : 
          <ScrollView
            style={styles({theme: theme}).view}
            contentContainerStyle={styles({theme: theme}).viewContent}>
            <Text h4>{trainingPlanName}</Text>
            {TargetedMuscleGroups.length > 0 && <TrainingPlanExercisesInfo muscleGroups={TargetedMuscleGroups}/>}
            {weeks?.map((x, i) => {
              return (
                <EditTrainingPlanWeeklyExercises
                  key={i}
                  planWeek={x.week}
                  navigation={navigation}
                  trainingPlanId={trainingPlanData.trainingPlanId}
                  theme={theme}
                />
              );
            })}
            <View style={styles({theme: theme}).flexRow}>
              <CustomButton
                btnText={'Next week'}
                onPress={AddNextWeek}
                styles={styles({theme: theme})}
              />
            </View>
          </ScrollView>
        }
      </EditTrainingPlanContext.Provider>
    </Suspense>
  );
};

export default EditTrainingPlan;
