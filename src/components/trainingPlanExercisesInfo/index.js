import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';

const TrainingPlanExercisesInfo = ({muscleGroups}) => {
  return (
    <View style={styles.view}>
      <View style={styles.subView}>
        <Text style={styles.text}>
          {Resources.Texts.TargetMuscleGroupsLabel}
        </Text>
      </View>
      <View style={styles.subView}>
        {muscleGroups?.length > 0 ? muscleGroups.map((x, i) => {
          return (
            <Text key={i} style={styles.text}>
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
