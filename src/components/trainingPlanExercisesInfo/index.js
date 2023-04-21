import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';

const TrainingPlanExercisesInfo = () => {
  return (
    <>
      <Text style={styles.heading}>{`${Resources.Texts.Exercises} (X)`}</Text>
      <View style={styles.view}>
        <View style={styles.subView}>
          <Text style={styles.text}>
            {Resources.Texts.TargetMuscleGroupsLabel}
          </Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.text}>
            {Resources.Texts.TargetMuscleGroupsLabel}
          </Text>
        </View>
      </View>
    </>
  );
};

export default TrainingPlanExercisesInfo;
