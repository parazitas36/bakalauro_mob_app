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
import {Validation} from './validation';
import {ToastAndroid} from 'react-native';
import ExerciseSelectionList from '../../components/exerciseSelectionList';
import AddSetComponent from '../../components/addSetComponent';
import SetComponent from '../../components/setComponent';
import TrainingPlanExercise from '../../components/trainingPlanExercise';
import { useTheme } from '@rneui/themed';

const AddExerciseSets = ({navigation, route}) => {
  const planDay = route?.params?.planDay;
  const planWeek = route?.params?.planWeek;

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const {weeksState, exercisesState, keyState} = useContext(TrainerContext);
  const [weeks, setWeeks] = weeksState;
  const [key, setKey] = keyState;
  const [exercises, setExercises] = exercisesState;

  const [exercise, setExercise] = useState(null);
  const [sets, setSets] = useState([]);
  const [set, setSet] = useState({Repetitions: 0, Weights: 0});

  const SavePress = () => {
    const copyWeeks = [...weeks];

    for (var i = 0; i < copyWeeks.length; i++) {
      if (copyWeeks[i].Week === planWeek) {
        const arr = copyWeeks[i].Days[planDay];
        arr.push({
          Key: key,
          Id: exercise.id,
          Sets: JSON.stringify(sets),
        });

        copyWeeks[i].Days[planDay] = arr;

        setWeeks(copyWeeks);
        setKey(prev => prev + 1);

        navigation.goBack();
        break;
      }
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
          {Resources.Texts.FillExerciseInfoInPlan}
        </Animated.Text>
        {exercise === null ?
          <Animated.Text
            style={styles({theme: theme}).heading}
            entering={FadeInLeft}
            exiting={FadeOutRight.delay(100)}>
            {Resources.Texts.MustSelectExercise}
          </Animated.Text>
        : <TrainingPlanExercise exercise={exercise} />}
        {sets?.length > 0 ? sets.map((x, i) => {
              return <SetComponent key={i} id={i} setsState={[sets, setSets]} theme={theme} />
          })
        : null}
        {exercise !== null ? 
          <AddSetComponent
            setState={[set, setSet]}
            setsState={[sets, setSets]}
          /> : null}
        {sets.length > 0 ? 
          <CustomButton
            btnText={Resources.ButtonTexts.SaveBtnText}
            onPress={() => SavePress()}
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

export default AddExerciseSets;
