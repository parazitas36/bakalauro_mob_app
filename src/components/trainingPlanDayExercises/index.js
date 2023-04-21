import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { useContext } from 'react';
import { TrainingPlanContext } from '../../screens/createTrainingPlan';
import { useMemo } from 'react';
import CustomButton from '../customButton';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRef } from 'react';
import { TrainerContext } from '../../../App';

const TrainingPlanDayExercises = ({navigation, planDay, planWeek}) => {
  const {weekState} = useContext(TrainingPlanContext);
  const {weeksState, keyState} = useContext(TrainerContext);

  const [week, setWeek] = weekState;
  const [weeks, setWeeks] = weeksState;

  const [hidden, setHidden] = useState(planDay === Resources.Days.Monday ? false : true);

  const data = useMemo(() => {
    return 'Empty'
  }, [weeks])

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => setHidden(prev => !prev)}>
        <Text style={styles.dayText}>{planDay}</Text>
      </TouchableOpacity>
      <View style={hidden ? styles.hidden : null}>
        <CustomButton 
          btnText={Resources.Texts.AddExercise} 
          onPress={() => navigation.navigate({
            name: Resources.Screens.AddExerciseSets,
            params: {
              planDay: planDay,
              planWeek: planWeek,
            }
          })}
          styles={styles}/>
      </View>
    </View>
  );
};

export default TrainingPlanDayExercises;
