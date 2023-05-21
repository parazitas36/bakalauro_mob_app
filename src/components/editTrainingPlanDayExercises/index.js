import {ToastAndroid, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TrainerContext, UserContext } from '../../../App';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { scale } from 'react-native-size-matters';
import CustomButtonWithIcon from '../customButtonWithIcon';
import TrainingPlanExerciseWithSets from '../trainingPlanExerciseWithSets';
import { Button, ListItem, Text } from '@rneui/themed';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { DeleteCall } from '../../api/DeleteCall';
import { ApiConstants } from '../../api/ApiConstants';

const EditTrainingPlanDayExercises = ({navigation, planDay, planWeek, theme, trainingPlanId}) => {
  const {tokenState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const {weeksState, keyState, exercisesState, refreshTrainingPlanInEditModeState} = useContext(TrainerContext);
  const [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode] = refreshTrainingPlanInEditModeState;
  const [weeks, setWeeks] = weeksState;
  const [exercises, setExercises] = exercisesState;
  const [hidden, setHidden] = useState(planDay !== Resources.Days.Monday);

  const ExerciseData = useMemo(() => {
    return weeks?.length > 0 ? weeks.filter(x => x.week === planWeek).at(0).days[planDay.toLowerCase()] : null;
  }, [weeks])

  const DeleteExercise = async(key) => {
    let weeksCopy = [...weeks]
    const foundExercise = weeksCopy.filter(x => x.week === planWeek).at(0).days[planDay.toLowerCase()].filter(x => x.editKey === key).at(0)

    console.log(foundExercise)

    const resp = await DeleteCall({
      endpoint: ApiConstants({ids: [foundExercise.trainingPlanExerciseId]}).DeleteTrainingPlanExercise,
      token: token
    });

    if (resp.status === 200) {
      ToastAndroid.show(
        'Exercise removed successfully!',
        ToastAndroid.SHORT
      );
      setRefreshTrainingPlanInEditMode(true);
    }
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
                      disabled={refreshTrainingPlanInEditMode === true}
                      type="clear"
                      icon={{name: 'edit', color: theme.colors.black}}
                      onPress={() => 
                        navigation.navigate({
                          name: 'EditExerciseSets',
                          params: {
                            planDay: planDay,
                            planWeek: planWeek,
                            editMode: true,
                            exerciseKey: x.editKey
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
                      disabled={refreshTrainingPlanInEditMode === true}
                      type="clear"
                      icon={{name: 'delete-outline', color: theme.colors.error}}
                      onPress={() => DeleteExercise(x.editKey)}
                    />
                  </Animated.View>
                )}
              >
                <TrainingPlanExerciseWithSets 
                  data={x} 
                  navigation={navigation}
                  editMode={false}
                  exercise={exercises.filter(y => y.id === x.exerciseId)[0]}
                  theme={theme}
                />
              </ListItem.Swipeable>
              )
            }) 
          : null}
          <CustomButtonWithIcon
            onPress={() => 
              navigation.navigate({
                name: 'EditExerciseSets',
                params: {
                  planDay: planDay,
                  planWeek: planWeek,
                  trainingPlanId: trainingPlanId,
                }
              })
            }
            styles={styles({theme})}
            icon={() => <Icon name='plus' color={theme.colors.black} size={20} />}
          />
        </View>
      </View>
    );
};

export default EditTrainingPlanDayExercises;
