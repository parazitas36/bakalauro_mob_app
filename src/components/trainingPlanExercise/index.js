import React from 'react';
import Animated, {
  FadeInLeft,
} from 'react-native-reanimated';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import { scale } from 'react-native-size-matters';

const TrainingPlanExercise = ({exercise}) => {
  return (
    <Animated.View
      entering={FadeInLeft.delay(200)}
      style={styles.card}>
      <Text style={styles.exerciseHeader}>{exercise?.name}</Text>
      <View style={styles.infoView}>
        <View
          style={{
            ...styles.subView,
            paddingLeft: scale(10),
          }}>
          <Text style={{color: 'white'}}>{Resources.Texts.MuscleGroups}</Text>
        </View>
        <View
          style={{
            ...styles.subView,
            paddingRight: scale(10),
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white'}}>{Resources.Texts.Equipment}</Text>
          <Text style={{color: 'white'}}>
            {exercise.equipment === null ? `${Resources.Texts.NoEquipment}`
            : exercise?.equipment.name}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default TrainingPlanExercise