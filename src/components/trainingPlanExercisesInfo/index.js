import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { useTheme } from '@rneui/themed';

const TrainingPlanExercisesInfo = ({muscleGroups}) => {

  const {theme} = useTheme();

  return (
    <View style={styles({theme: theme}).view}>
      <View style={styles({theme: theme}).subView}>
        <Text style={styles({theme: theme}).text}>
          {Resources.Texts.TargetMuscleGroupsLabel}
        </Text>
      </View>
      <View style={styles({theme: theme}).subView}>
        {muscleGroups?.length > 0 ? muscleGroups.map((x, i) => {
          return (
            <Text key={i} style={styles({theme: theme}).text}>
              {x}
            </Text>
          );
        })
        : null}
      </View>
    </View>
  );
};

export default TrainingPlanExercisesInfo;
