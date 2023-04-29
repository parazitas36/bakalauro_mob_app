import React from 'react';
import Animated, {
  FadeInLeft,
} from 'react-native-reanimated';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import { scale } from 'react-native-size-matters';
import { useTheme } from '@rneui/themed';

const TrainingPlanExercise = ({exercise}) => {
  const {theme} = useTheme();

  return (
    <Animated.View
      entering={FadeInLeft.delay(200)}
      style={styles({theme: theme}).card}>
      <Text style={styles({theme: theme}).exerciseHeader}>{exercise?.name}</Text>
      <View style={styles({theme: theme}).infoView}>
        <View
          style={{
            ...styles({theme: theme}).subView,
            paddingLeft: scale(10),
          }}>
          <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
          <Text style={styles({theme: theme}).text}>{exercise?.muscleGroups}</Text>
        </View>
        <View
          style={{
            ...styles({theme: theme}).subView,
            paddingRight: scale(10),
            alignItems: 'flex-end',
          }}>
          <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
          <Text style={styles({theme: theme}).text}>
            {exercise.equipment === null ? `${Resources.Texts.NoEquipment}`
            : exercise?.equipment.name}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default TrainingPlanExercise