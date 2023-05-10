import {View, ToastAndroid} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Button, Card, Icon, Slider, Text, useTheme } from '@rneui/themed';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { PostCall } from '../../api/PostCall';
import { ApiConstants } from '../../api/ApiConstants';
import { useContext } from 'react';
import { RegularUserContext } from '../../../App';

const LogSetComponent = ({sets, loggedSets, setLoggedSets, trainingPlanExerciseId, token}) => {
  const {reloadWorkoutState} = useContext(RegularUserContext);
  const [reloadWorkout, setReloadWorkout] = reloadWorkoutState;
  const parsedSets = JSON.parse(sets);
  const numberRegex = new RegExp('^[0-9]+$');
  const {theme} = useTheme();

  const exerciseSets = useMemo(() => {
    const result = loggedSets?.filter(x => x.trainingPlanExerciseId === trainingPlanExerciseId)
    
    if(result?.length > 0) {
      return result?.at(0)?.loggedSets
    }
    
    return []
  }, [loggedSets, sets])

  const [set, setSet] = useState(parsedSets.at(exerciseSets.length))

  const AddSet = async() => {
    if (set?.Repetitions > 0) {
      const insert = {Weights: String(set.Weights ? set.Weights : '').trim() === '' ? '0' : set.Weights, Repetitions: set?.Repetitions};

      var tempLoggedSets = [...loggedSets];
      var existingLoggedSets = exerciseSets

      const existing = loggedSets?.filter(x => x.trainingPlanExerciseId === trainingPlanExerciseId)?.at(0)?.loggedSets;
      console.log(existing)
      if (existingLoggedSets.length === 0 && (existing === undefined || existing === null)) {
        console.log('1')
        tempLoggedSets.push({trainingPlanExerciseId: trainingPlanExerciseId, loggedSets: [insert]})
      } else {
        console.log('2')
        existingLoggedSets.push(insert)
        tempLoggedSets.forEach(x => {
          if (x.trainingPlanExerciseId === trainingPlanExerciseId) {
            x.loggedSets = existingLoggedSets
          }
        })
      }

      console.log('temp: ', tempLoggedSets)
      setLoggedSets(tempLoggedSets);

      const resp = await PostCall({
        endpoint: `${ApiConstants().LogExerciseProgress}${Number(trainingPlanExerciseId)}`,
        token: token,
        body: JSON.stringify(tempLoggedSets?.filter(x => x.trainingPlanExerciseId === trainingPlanExerciseId)?.at(0)?.loggedSets)
      });

      if (resp.status === 201) {
        setReloadWorkout(true)
      }
    } else {
      ToastAndroid.show(
        'Repetitions cannot be zero or empty!',
        ToastAndroid.SHORT
      )
    }
  };

  useEffect(() => {
    setSet(parsedSets.at(exerciseSets.length))
  }, [sets])

  const OnChangeRepetitions = value => {
    if (numberRegex.test(String(value)) === false && String(value).length > (set?.Weights?.length ?? 0)) {
      return;
    }

    if (set === null) {
      setSet({Repetitions: value.toString(), Weights: '0'});
      return;
    }

    setSet({...set, Repetitions: value.toString()});
  };

  const OnChangeWeights = value => {
    if (numberRegex.test(String(value)) === false && String(value).length > (set?.Weights?.length ?? 0)) {
      return;
    }

    if (set === null) {
      setSet({Weights: value.toString(), Repetitions: '0'});
      return;
    }

    setSet({...set, Weights: value.toString()});
  };

  if(parsedSets.length <= exerciseSets.length) {return <Text h4 h4Style={{color: theme.colors.success}}>All sets are completed</Text>}

  return (
    <Animated.View entering={FadeInUp.delay(500)}>
      <Card containerStyle={styles({theme: theme}).view}>
        <Card.Title h4>{`${Resources.Texts.Set} #${(exerciseSets.length) + 1}`}</Card.Title>
        <Card.Divider />
        <Text style={{marginVertical: scale(5)}}>Repetitions</Text>
        <Slider
          value={Number(set?.Repetitions ?? 0)}
          onValueChange={OnChangeRepetitions}
          maximumValue={parsedSets?.at(exerciseSets.length)?.Repetitions ?? 10}
          minimumValue={1}
          step={1}
          allowTouchTrack
          trackStyle={{ height: scale(5), backgroundColor: 'transparent' }}
          thumbStyle={{ height: scale(15), width: scale(15), backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="repeat"
                type="fontAwesome"
                size={scale(15)}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={theme.colors.primary}
              />
            ),
          }}
        />
       <TextInput
            value={set?.Repetitions ?? '0'}
            keyboardType='number-pad'
            selectTextOnFocus={true}
            onChangeText={val => OnChangeRepetitions(val)}
            style={styles({theme: theme}).textInput}
        />
      <Text style={{marginVertical: scale(5)}}>Weight</Text>
      <Slider
          value={Number(set?.Weights ?? 0)}
          onValueChange={OnChangeWeights}
          maximumValue={(parsedSets?.at(exerciseSets?.length)?.Weights === 0 ? 10 : parsedSets?.at(exerciseSets?.length)?.Weights) ?? 10}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: scale(5), backgroundColor: 'transparent' }}
          thumbStyle={{ height: scale(15), width: scale(15), backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="weight-hanging"
                type="font-awesome-5"
                size={scale(15)}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={theme.colors.primary}
              />
            ),
          }}
      />
      <TextInput
            keyboardType='number-pad'
            selectTextOnFocus={true}
            value={String(set?.Weights ?? '0')}
            onChangeText={val => OnChangeWeights(val)}
            style={styles({theme: theme}).textInput}
          />
      <Button
        icon={
          <Icon
            name='add' 
            color={theme.colors.black} 
            size={verticalScale(24)} />
        }
        buttonStyle={{
          borderRadius: moderateScale(5),
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.black,
          borderWidth: moderateScale(1.25),
          marginTop: verticalScale(10),
          width: scale(90),
          height: scale(30),
          padding: 0,
          alignSelf: 'center'
        }}
        titleStyle={{
          color: theme.colors.white,
          display: 'none'
        }}
        onPress={async() => await AddSet()}
      />
      </Card>
    </Animated.View>
  )
};

export default LogSetComponent;
