import {View} from 'react-native';
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
import { Button, ListItem, Text } from '@rneui/themed';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const TrainingPlanDayExercises = ({navigation, planDay, planWeek, editMode, fetchedWeeklyPlan, theme}) => {
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

  const DeleteExercise = (key) => {
    let weeksCopy = [...weeks]
    const newExercisesArr = weeksCopy.filter(x => x.Week === planWeek).at(0).Days[planDay].filter(x => x.Key !== key)

    for(var i = 0; i < weeksCopy.length; i++) {
      if(weeksCopy[i].Week === planWeek) {
        weeksCopy[i].Days[planDay] = newExercisesArr;
        break;
      }
    }
    setWeeks(weeksCopy)
  }

  if (editMode === true) {
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
            ExerciseData.map((x, i) => {
              return (
              <ListItem.Swipeable
                style={{alignSelf: 'center'}}
                key={i}
                leftWidth={scale(50)}
                rightWidth={scale(50)}
                minSlideWidth={scale(10)}
                leftContent={() => (
                  <Animated.View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}
                    entering={FadeInLeft.delay(600)}>
                    <Button
                      containerStyle={{
                        justifyContent: 'center',
                      }}
                      type="clear"
                      icon={{name: 'edit', color: theme.colors.black}}
                      onPress={() => 
                        navigation.navigate({
                          name: Resources.Screens.AddExerciseSets,
                          params: {
                            planDay: planDay,
                            planWeek: planWeek,
                            editMode: true,
                            exerciseKey: x.Key
                          }
                      })}
                    />
                  </Animated.View>
                )}
                rightContent={() => (
                  <Animated.View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}
                    entering={FadeInLeft.delay(600)}>
                    <Button
                      containerStyle={{
                        justifyContent: 'center',
                      }}
                      type="clear"
                      icon={{name: 'delete-outline', color: theme.colors.error}}
                      onPress={() => DeleteExercise(x.Key)}
                    />
                  </Animated.View>
                )}
              >
                <TrainingPlanExerciseWithSets 
                  navigation={navigation}
                  data={x} 
                  editMode={editMode}
                  exercise={exercises.filter(y => y.id === x.Id)[0]}
                  theme={theme}
                />
              </ListItem.Swipeable>
              )
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
            styles={styles({theme})}
            icon={() => <Icon name='plus' color={theme.colors.black} size={20} />}
          />
        </View>
      </View>
    );
  }

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
              return <TrainingPlanExerciseWithSets 
                        key={i}
                        navigation={navigation}
                        data={x} 
                        exercise={exercises.filter(y => y.id === x.exerciseId)[0]}
                        editMode={editMode}
                        theme={theme}
                     />
            }) : <Text style={styles({theme}).text}>Rest day</Text>
          : null}
        </View>
      </View>
  )
  
};

export default TrainingPlanDayExercises;
