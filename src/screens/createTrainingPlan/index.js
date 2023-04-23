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

export const TrainingPlanContext = createContext();

const CreateTrainingPlan = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const {keyState, weeksState, exercisesState,refreshTrainingPlansState} = useContext(TrainerContext);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = refreshTrainingPlansState;
  const [exercises, setExercises] = exercisesState;

  const [trainingPlanName, setTrainingPlanName] = useState(null);
  const [trainingPlanType, setTrainingPlanType] = useState(null);
  const [week, setWeek] = useState(1);
  const [key, setKey] = keyState;
  const [weeks, setWeeks] = weeksState;

  const ResetPlan = () => {
    setWeek(1);
    setKey(0);
    setWeeks([{
      Week: 1,
      Days: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      }
    }]);
  };

  const AddNextWeek = () => {
    setWeeks(prev => [...prev, {
      Week: week+1,
      Days: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      }
    }]);
    setWeek(prev => prev+1)
  }

  const SaveTrainingPlan = async() => {
    if (ExercisesCount === 0) {
      ToastAndroid.show(
        'You must add at least 1 exercise!',
        ToastAndroid.SHORT
      )
      return;
    }

    if(trainingPlanName === null || trainingPlanName === ''){
      ToastAndroid.show(
        'Training plan name cannot be empty!',
        ToastAndroid.SHORT
      )
      return;
    }

    const trainingPlanBody = {
      "Name": trainingPlanName,
      "WeeklyPlan": weeks
    }

    const resp = await PostCall({endpoint: ApiConstants().TrainingPlan_Endpoint, token: token, body: trainingPlanBody})

    if (resp.status === 201){
      ToastAndroid.show(
        'Training was created successfuly!',
        ToastAndroid.SHORT
      );
      setRefreshTrainingPlans(true)
      navigation.goBack();
    }
  }

  const ExercisesCount = useMemo(() => {
    if(weeks?.length > 0) {
      var counter = 0;
      for(var i = 0; i < weeks.length; i++){
        counter += weeks[i].Days.Monday.length;
        counter += weeks[i].Days.Tuesday.length;
        counter += weeks[i].Days.Wednesday.length;
        counter += weeks[i].Days.Thursday.length;
        counter += weeks[i].Days.Friday.length;
        counter += weeks[i].Days.Saturday.length;
        counter += weeks[i].Days.Sunday.length;
      }

      return counter;
    }

    return 0;
  }, [weeks])

  const TargetedMuscleGroups = useMemo(() => {
    if(weeks?.length > 0) {
      const muscleGroups = new Set()
      const exerciseIds = new Set()
      for(var i = 0; i < weeks.length; i++){
        weeks[i].Days.Monday.forEach(x => exerciseIds.add(x?.Id));
        weeks[i].Days.Tuesday.forEach(x => exerciseIds.add(x?.Id));
        weeks[i].Days.Wednesday.forEach(x => exerciseIds.add(x?.Id));
        weeks[i].Days.Thursday.forEach(x => exerciseIds.add(x?.Id));
        weeks[i].Days.Friday.forEach(x => exerciseIds.add(x?.Id));
        weeks[i].Days.Saturday.forEach(x => exerciseIds.add(x?.Id));
        weeks[i].Days.Sunday.forEach(x => exerciseIds.add(x?.Id));
      }

      exerciseIds.forEach(id => 
        muscleGroups.add(exercises
          .filter(e => 
            e.id === id)[0]
            .muscleGroups
      ));
      
      const arr = []
      muscleGroups.forEach(x => arr.push(x))
      return arr;
    }

    return [];
  }, [weeks])

  useEffect(() => {
    ResetPlan();
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
  }, []);

  const contextData = {
    weekState: [week, setWeek],
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <TrainingPlanContext.Provider value={contextData}>
        {exercises === null ? <LoadingScreen /> : 
          <ScrollView
            style={styles.view}
            contentContainerStyle={styles.viewContent}>
            <TextInput
              value={trainingPlanName}
              onChangeText={setTrainingPlanName}
              placeholder={Resources.Placeholders.TrainingPlanName}
              placeholderTextColor={Resources.Colors.PlaceholdersColor}
              style={styles.textInput}
            />
            {TargetedMuscleGroups.length > 0 && <TrainingPlanExercisesInfo muscleGroups={TargetedMuscleGroups}/>}
            {weeks?.map((x, i) => {
              return (
                <TrainingPlanWeeklyExercises
                  key={i}
                  planWeek={x.Week}
                  navigation={navigation}
                  editMode={true}
                />
              );
            })}
            <View style={styles.flexRow}>
              {ExercisesCount > 0 && <CustomButton
                btnText={Resources.ButtonTexts.Confirm}
                onPress={async() => await SaveTrainingPlan()}
                styles={styles}
              />}
              <CustomButton
                btnText={'Next week'}
                onPress={AddNextWeek}
                styles={styles}
              />
            </View>
          </ScrollView>
        }
      </TrainingPlanContext.Provider>
    </Suspense>
  );
};

export default CreateTrainingPlan;
