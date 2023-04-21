import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutRight,
  FadeOutUp,
} from 'react-native-reanimated';
import {TextInput} from 'react-native';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import {Validation} from './validation';
import {ToastAndroid} from 'react-native';
import ExerciseSelectionList from '../../components/exerciseSelectionList';
import { scale } from 'react-native-size-matters';
import AddSetComponent from '../../components/addSetComponent';
import SetComponent from '../../components/setComponent';

const ExerciseView = ({exercise}) => {
  return (
    <Animated.View
      entering={FadeInLeft.delay(200)}
      style={styles.card}>
      <Text style={styles.exerciseHeader}>{exercise?.name}</Text>
      <View style={styles.infoView}>
        <View
          style={{
            ...styles.subView,
            paddingLeft: scale(10),
          }}>
          <Text style={{color: 'white'}}>{Resources.Texts.MuscleGroups}</Text>
        </View>
        <View
          style={{
            ...styles.subView,
            paddingRight: scale(10),
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white'}}>{Resources.Texts.Equipment}</Text>
          <Text style={{color: 'white'}}>
            {exercise.equipment === null ? 'No equipment' : exercise?.equipment.name}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const AddExerciseSets = ({navigation, route}) => {
  const planDay = route?.params?.planDay;
  const planWeek = route?.params?.planWeek;

  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {weeksState, exercisesState, keyState} = useContext(TrainerContext);
  const [weeks, setWeeks] = weeksState;
  const [key, setKey] = keyState;
  const [exercises, setExercises] = exercisesState;

  const [exercise, setExercise] = useState(null);
  const [sets, setSets] = useState([]);
  const [set, setSet] = useState(null);

  const exerciseMemo = useMemo(() => {
    return exercise
  }, [exercise])

  const SavePress = () => {
    let copyWeeks = weeks;

    for (var i = 0; i < weeks.length; i++) {
      if (weeks[i]['Week'] === planWeek) {
        weeks[i]['Days'][planDay] = {
          Key: key,
          Id: exercise.id,
          Sets: JSON.stringify(sets),
        };
        setKey(prev => prev + 1);
        break;
      }
    }
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        style={styles.view}
        contentContainerStyle={styles.contentContainerStyle}
        entering={FadeInDown.delay(100)}
        exiting={FadeOutUp}>
        <Animated.Text style={styles.heading} entering={FadeInUp}>
          {Resources.Texts.FillExerciseInfoInPlan}
        </Animated.Text>
        {exercise === null ? (
          <Animated.Text
            style={styles.heading}
            entering={FadeInLeft}
            exiting={FadeOutRight.delay(100)}>
            You must select an exercise first
          </Animated.Text>
        ) : <ExerciseView exercise={exercise}/>}
        {sets?.length > 0 ? 
        sets.map((x, i) => {
          return <SetComponent key={i} id={i} setsState={[sets, setSets]} />
        }) : null}
        {exercise !== null ? 
        <AddSetComponent setState={[set, setSet]} setsState={[sets, setSets]}/> : null}
        {sets.length > 0 ? <CustomButton
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={() => SavePress()}
          styles={styles}
        />
        : <CustomButton
          btnText={Resources.ButtonTexts.Close}
          onPress={() => navigation.goBack()}
          styles={styles}
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
