import {View, Text} from 'react-native';
import React from 'react';
import {useContext} from 'react';
import {TrainingPlanContext} from '../../screens/createTrainingPlan';
import TrainingPlanDayExercises from '../trainingPlanDayExercises';
import Resources from '../../Resources';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { TrainerContext } from '../../../App';

const TrainingPlanWeeklyExercises = ({navigation, planWeek}) => {
  const {weekState} = useContext(TrainingPlanContext);
  const {weeksState, keyState} = useContext(TrainerContext);

  const [week, setWeek] = weekState;
  const [weeks, setWeeks] = weeksState;
  const [hidden, setHidden] = useState(false)

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => setHidden(prev => !prev)}>
        <Text style={styles.heading}>Week {planWeek}</Text>
      </TouchableOpacity>
      <View style={hidden ? styles.hiddenView : null}>
        <TrainingPlanDayExercises
          key={Resources.Days.Monday}
          planWeek={planWeek}
          planDay={Resources.Days.Monday}
          navigation={navigation} 
        />
        <TrainingPlanDayExercises
          key={Resources.Days.Tuesday}
          planWeek={planWeek}
          planDay={Resources.Days.Tuesday}
          navigation={navigation} 
        />
        <TrainingPlanDayExercises
          key={Resources.Days.Wednesday}
          planWeek={planWeek}
          planDay={Resources.Days.Wednesday}
          navigation={navigation} 
        />
        <TrainingPlanDayExercises
          key={Resources.Days.Thursday}
          planWeek={planWeek}
          planDay={Resources.Days.Thursday}
          navigation={navigation} 
        />
        <TrainingPlanDayExercises
          key={Resources.Days.Friday}
          planWeek={planWeek}
          planDay={Resources.Days.Friday}
          navigation={navigation} 
        />
        <TrainingPlanDayExercises
          key={Resources.Days.Saturday}
          planWeek={planWeek}
          planDay={Resources.Days.Saturday}
          navigation={navigation} 
        />
        <TrainingPlanDayExercises
          key={Resources.Days.Sunday}
          planWeek={planWeek}
          planDay={Resources.Days.Sunday}
          navigation={navigation} 
        />
      </View>
    </View>
  );
};

export default TrainingPlanWeeklyExercises;
