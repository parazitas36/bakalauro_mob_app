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
import { TrainerContext } from '../../../App';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { scale } from 'react-native-size-matters';
import CustomButtonWithIcon from '../customButtonWithIcon';
import TrainingPlanExerciseWithSets from '../trainingPlanExerciseWithSets';

const TrainingPlanDayExercises = ({navigation, planDay, planWeek}) => {
  const {weekState} = useContext(TrainingPlanContext);
  const {weeksState, keyState, exercisesState} = useContext(TrainerContext);

  const [week, setWeek] = weekState;
  const [weeks, setWeeks] = weeksState;
  const [exercises, setExercises] = exercisesState;

  const [hidden, setHidden] = useState(planDay === Resources.Days.Monday ? false : true);

  const ExerciseData = useMemo(() => {
    return weeks?.length > 0 ? weeks.filter(x => x.Week === planWeek).at(0).Days[planDay] : null;
  }, [weeks])

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.dayTextView} onPress={() => setHidden(prev => !prev)}>
        <Text style={styles.dayText}>{planDay}</Text>
        <View style={styles.icon}>
          <Icon 
            name={`${hidden ? 'chevron-down' : 'chevron-up'}`} 
            color={Resources.Colors.IconsColor} 
            size={scale(18)} />
        </View>
      </TouchableOpacity>
      <View style={hidden ? styles.hidden : null}>
        {ExerciseData !== null ? 
          ExerciseData.map((x) => {
            return <TrainingPlanExerciseWithSets 
                      data={x} 
                      exercise={exercises.filter(y => y.id === x.Id)[0]}
                    />
          }) 
        : null}
        <CustomButtonWithIcon
          onPress={() => 
            navigation.navigate({
              name: Resources.Screens.AddExerciseSets,
              params: {
                planDay: planDay,
                planWeek: planWeek,
              }
            })
          }
          styles={styles}
          icon={() => <Icon name='plus' color={Resources.Colors.IconsColor} size={20} />}
        />
      </View>
    </View>
  );
};

export default TrainingPlanDayExercises;
