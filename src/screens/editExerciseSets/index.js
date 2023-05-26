import React, {useState, useContext, Suspense} from 'react';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutRight,
  FadeOutUp,
} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import {ToastAndroid} from 'react-native';
import ExerciseSelectionList from '../../components/exerciseSelectionList';
import AddSetComponent from '../../components/addSetComponent';
import SetComponent from '../../components/setComponent';
import TrainingPlanExercise from '../../components/trainingPlanExercise';
import { useTheme } from '@rneui/themed';
import { PatchCall } from '../../api/PatchCall';
import { ApiConstants } from '../../api/ApiConstants';
import { PostCall } from '../../api/PostCall';

const EditExerciseSets = ({navigation, route}) => {
  const planDay = route?.params?.planDay;
  const planWeek = route?.params?.planWeek;
  const editMode = route?.params?.editMode
  const exerciseKey = route?.params?.exerciseKey
  const trainingPlanId = route?.params?.trainingPlanId;

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const {weeksState, exercisesState, keyState, refreshTrainingPlanInEditModeState} = useContext(TrainerContext);
  const [weeks, setWeeks] = weeksState;
  const [key, setKey] = keyState;
  const [exercises, setExercises] = exercisesState;
  const [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode] = refreshTrainingPlanInEditModeState;

  const existingExercise = editMode === true ? weeks.filter(x => x.week === planWeek).at(0).days[String(planDay).toLowerCase()].filter(x => x.editKey === exerciseKey).at(0) : null
  const existingSets = editMode === true ? JSON.parse(existingExercise?.sets) : []

  const [exercise, setExercise] = useState(existingExercise !== null ? exercises.filter(x => x.id === existingExercise?.exerciseId).at(0) : null);
  const [sets, setSets] = useState(existingSets);
  const [set, setSet] = useState({Repetitions: 0, Weights: 0});

  const SavePress = async() => {
    if (editMode === true) {
      const resp = await PatchCall({
        endpoint: ApiConstants({ids: [existingExercise.trainingPlanExerciseId]}).UpdateTrainingPlanExercise,
        token: token,
        body: JSON.stringify(sets)
      })

      setRefreshTrainingPlanInEditMode(true)
      navigation.goBack();
    } else {
      const body = {
        Week: planWeek,
        Day: planDay,
        ExerciseId: exercise.id,
        Sets: JSON.stringify(sets)
      }

      const resp = await PostCall({
        endpoint: ApiConstants({ids: [trainingPlanId]}).UpdateTrainingPlanNewExercise,
        token: token,
        body: body
      })

      setRefreshTrainingPlanInEditMode(true)
      navigation.goBack();
    }
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).contentContainerStyle}
        entering={FadeInDown.delay(100)}
        exiting={FadeOutUp}>
        <Animated.Text style={styles({theme: theme}).heading} entering={FadeInUp}>
          Edit exercise information
        </Animated.Text>
        {exercise === null ?
          <Animated.Text
            style={styles({theme: theme}).heading}
            entering={FadeInLeft}
            exiting={FadeOutRight.delay(100)}>
            {Resources.Texts.MustSelectExercise}
          </Animated.Text>
        : <TrainingPlanExercise exercise={exercise} />}
        {exercise !== null ? 
          <AddSetComponent
            setState={[set, setSet]}
            setsState={[sets, setSets]}
          /> : null}
        {sets?.length > 0 ? sets.map((x, i) => {
              return <SetComponent key={i} id={i} setsState={[sets, setSets]} theme={theme} />
          })
        : null}
        {sets.length > 0 ? 
          <CustomButton
            btnText={Resources.ButtonTexts.SaveBtnText}
            onPress={async() => await SavePress()}
            styles={styles({theme: theme})}
          /> :
          <CustomButton
              btnText={Resources.ButtonTexts.Close}
              onPress={() => navigation.goBack()}
              styles={styles({theme: theme})}
          />}
        <ExerciseSelectionList
          exercises={exercises}
          exerciseState={[exercise, setExercise]}
        />
      </Animated.ScrollView>
    </Suspense>
  );
};

export default EditExerciseSets;
