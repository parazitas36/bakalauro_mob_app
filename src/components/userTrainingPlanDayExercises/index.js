import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { scale } from 'react-native-size-matters';
import UserTrainingPlanExerciseWithSets from '../userTrainingPlanExerciseWithSets';
import { Button } from '@rneui/themed';

const UserTrainingPlanExercises = ({navigation, planDay, planWeek, fetchedWeeklyPlan, theme}) => {
  const [hidden, setHidden] = useState(planDay === Resources.Days.Monday ? false : true);

  const ExerciseData = useMemo(() => {
    if (fetchedWeeklyPlan.length > 0) {
      const data = fetchedWeeklyPlan.filter(x => x.week === planWeek).at(0).days[String(planDay).toLowerCase()]
      return data;
    }
    return []
  }, [fetchedWeeklyPlan])

  return (
    <View style={styles({theme}).view}>
        <TouchableOpacity style={styles({theme}).dayTextView} onPress={() => setHidden(prev => !prev)}>
          <View style={{width: '50%', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={styles({theme}).dayText}>
              {planDay}
            </Text>
            {ExerciseData.length === 0 &&
              <Icon 
                name={'bed'} 
                color={theme.colors.black} 
                size={scale(15)}/>}
          </View>
          <View style={styles({theme}).icon}>
            <Icon 
              name={`${hidden ? 'chevron-down' : 'chevron-up'}`} 
              color={theme.colors.black} 
              size={scale(18)} />
          </View>
        </TouchableOpacity>
        <View style={hidden ? styles({theme}).hidden : null}>
          {ExerciseData !== null ? 
            ExerciseData.length > 0 ? ExerciseData.map((x, i) => {
              return <UserTrainingPlanExerciseWithSets
                        key={i}
                        data={x} 
                        exercise={null}
                        theme={theme}
                     />
            }) : <Text style={styles({theme}).text}>Rest day</Text>
          : null}
          {ExerciseData !== null && ExerciseData.length ?
          <Button
            title={`Start ${planDay.toLowerCase()} workout`}
            icon={{name: 'play', type: 'font-awesome', color: 'white'}}
            onPress={() => {
              navigation.navigate({
                name: 'WorkoutScreen',
                params: {
                  dayTrainingPlan: ExerciseData
                }
              })
            }}
          /> : null}
        </View>
      </View>
  )
  
};

export default UserTrainingPlanExercises;
