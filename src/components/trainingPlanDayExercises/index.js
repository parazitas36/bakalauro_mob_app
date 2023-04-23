import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TrainerContext } from '../../../App';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { scale } from 'react-native-size-matters';
import CustomButtonWithIcon from '../customButtonWithIcon';
import TrainingPlanExerciseWithSets from '../trainingPlanExerciseWithSets';

const TrainingPlanDayExercises = ({navigation, planDay, planWeek, editMode, fetchedWeeklyPlan}) => {
  const {weeksState, keyState, exercisesState} = useContext(TrainerContext);

  const [weeks, setWeeks] = weeksState;
  const [exercises, setExercises] = exercisesState;
  const [hidden, setHidden] = useState(editMode === true && planDay === Resources.Days.Monday ? false : true);

  const ExerciseData = useMemo(() => {
    if(editMode === true) {
      return weeks?.length > 0 ? weeks.filter(x => x.Week === planWeek).at(0).Days[planDay] : null;
    }

    return fetchedWeeklyPlan.filter(x => x.week === planWeek).at(0).days[String(planDay).toLowerCase()]
  }, [weeks])

  if (editMode === true) {
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
            ExerciseData.map((x, i) => {
              return <TrainingPlanExerciseWithSets 
                        data={x} 
                        key={i}
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
  }

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
            ExerciseData.length > 0 ? ExerciseData.map((x, i) => {
              console.log(x)
              return <TrainingPlanExerciseWithSets 
                        key={i}
                        data={x} 
                        exercise={exercises.filter(y => y.id === x.exerciseId)[0]}
                        editMode={editMode}
                     />
            }) : <Text style={styles.text}>Rest day</Text>
          : null}
        </View>
      </View>
  )
  
};

export default TrainingPlanDayExercises;
