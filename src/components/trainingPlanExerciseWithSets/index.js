import React from 'react';
import Animated, {
  FadeInLeft,
} from 'react-native-reanimated';

import styles from './styles';
import {View} from 'react-native';
import Resources from '../../Resources';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Button, Card, Divider, Icon, Text } from '@rneui/themed';
import MuscleIcon from '../muscleIcon';

const TrainingPlanExerciseWithSets = ({navigation, data, exercise, editMode, theme}) => {
  console.log('data: ', data)
  const sets = JSON.parse(editMode ? data.Sets : data.sets)
  const muscleGroups = JSON.parse(exercise.muscleGroups)

  if (editMode === true) {
    return (
      <Animated.View
        entering={FadeInLeft.delay(200)}>
        <Card containerStyle={styles({theme: theme}).card}>
          <Card.Title h4>{exercise?.name}</Card.Title>
          <Card.Divider />
          <View style={styles({theme: theme}).infoView}>
            <View
              style={{
                ...styles({theme: theme}).subView,
              }}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 2,
                }}>
                  {muscleGroups.map((x, i) => {
                    return <MuscleIcon key={i} muscleName={x} size={30} />
                  })}
                </View>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
              <Text style={styles({theme: theme}).text}>
                {exercise.equipment === null ? `${Resources.Texts.NoEquipment}`
                : exercise?.equipment?.name}
              </Text>
            </View>
            <Divider orientation='vertical' />
            <View
              style={{
                ...styles({theme: theme}).subView,
                alignItems: 'flex-end',
              }}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Sets}</Text>
              {sets?.length > 0 ?
                sets.map((x, i) => {
                  return <Text 
                          key={i}
                          style={styles({theme: theme}).text}>
                            {x.Repetitions} x {x.Weights === 0 ? 
                            'No weights' 
                            : x.Weights+'kg'}
                          </Text>
                }) : null}
            </View>
          </View>
        </Card>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      entering={FadeInLeft.delay(200)}>
       <Card containerStyle={styles({theme: theme}).card}>
          <Card.Title h4>{exercise?.name}</Card.Title>
          <Card.Divider />
          <View style={styles({theme: theme}).infoView}>
            <View
              style={{
                ...styles({theme: theme}).subView,
              }}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
              <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 2,
                }}>
                  {muscleGroups.map((x, i) => {
                    return <MuscleIcon key={i} muscleName={x} size={30} />
                  })}
                </View>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
              <Text style={styles({theme: theme}).text}>
                {exercise.equipment === null ? `${Resources.Texts.NoEquipment}`
                : exercise?.equipment?.name}
              </Text>
            </View>
            <Divider orientation='vertical' />
            <View
              style={{
                ...styles({theme: theme}).subView,
                alignItems: 'flex-end',
              }}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Sets}</Text>
              {sets?.length > 0 ?
                sets.map((x, i) => {
                  return <Text 
                          key={i}
                          style={styles({theme: theme}).text}>
                            {x.Repetitions} x {x.Weights === 0 ? 
                            'No weights' 
                            : x.Weights+'kg'}
                          </Text>
                }) : null}
            </View>
          </View>
          {data.hasGuide && 
          <Button
            icon={
              <Icon 
              name='info' 
              color={theme.colors.black} 
              size={verticalScale(20)}
              iconStyle={{marginRight: scale(5)}} />
            }
            title='How To Do'
            buttonStyle={{
              borderRadius: moderateScale(3),
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.black,
              borderWidth: moderateScale(1.25),
              marginTop: verticalScale(5),
            }}
            titleStyle={{
              color: theme.colors.black,
            }}
            onPress={() =>
              navigation.navigate({
                name: 'Exercise',
                params: {exerciseId: data.exerciseId},
              })
            }
          />}
        </Card>
    </Animated.View>
  )
};

export default TrainingPlanExerciseWithSets