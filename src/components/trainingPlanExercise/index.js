import React from 'react';
import Animated, {
  FadeInLeft,
} from 'react-native-reanimated';

import styles from './styles';
import {View} from 'react-native';
import Resources from '../../Resources';
import { scale } from 'react-native-size-matters';
import { Card, Divider, Text, useTheme } from '@rneui/themed';
import MuscleIcon from '../muscleIcon';

const TrainingPlanExercise = ({exercise}) => {
  const {theme} = useTheme();

  const muscleGroups = JSON.parse(exercise?.muscleGroups)

  return (
    <Animated.View  entering={FadeInLeft.delay(200)}>
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
              gap: 2
            }}>
              {muscleGroups.map((x, i) => {
                return <MuscleIcon key={i} muscleName={x} size={35} />
              })}
            </View>
          </View>
          <Divider orientation='vertical' />
          <View
            style={{
              ...styles({theme: theme}).subView,
              alignItems: 'flex-end',
            }}>
            <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
            <Text style={styles({theme: theme}).text}>
              {exercise.equipment === null ? `${Resources.Texts.NoEquipment}`
              : exercise?.equipment.name}
            </Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  )
};

export default TrainingPlanExercise